/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs";

const app = express();
// Detect AI Studio dev sandbox environment where nginx proxies port 3000
const isDevSandbox = Boolean(process.env.CONTROL_PLANE_PORT || process.env.DEFAULT_APP_PORT);
const PORT = isDevSandbox 
  ? 3000 
  : (process.env.PORT ? parseInt(process.env.PORT, 10) : 3000);

app.use(express.json());

// In-memory cache for live financial market data
let cachedMarketData: any = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 25000; // 25 seconds cache

// Commodity definition map
interface CommodityConfig {
  id: string;
  name: string;
  symbol: string;
  yahooTicker: string;
  unit: string;
  source: string;
  themeColor: string;
  strokeColor: string;
  isCentsPerUnit?: boolean;
  fallbackPrice: number;
  fallbackChange: number;
}

const COMMODITY_CONFIGS: CommodityConfig[] = [
  {
    id: "gold",
    name: "Gold Spot",
    symbol: "XAU",
    yahooTicker: "GC=F",
    unit: "oz",
    source: "COMEX / CME Group (Yahoo Finance Live)",
    themeColor: "amber",
    strokeColor: "#D97706",
    fallbackPrice: 2895.40,
    fallbackChange: 0.85
  },
  {
    id: "crude",
    name: "Brent Crude",
    symbol: "CO",
    yahooTicker: "BZ=F",
    unit: "bbl",
    source: "ICE Futures Europe (Yahoo Finance Live)",
    themeColor: "sky",
    strokeColor: "#0284C7",
    fallbackPrice: 78.45,
    fallbackChange: -0.42
  },
  {
    id: "wti",
    name: "WTI Crude Oil",
    symbol: "CL",
    yahooTicker: "CL=F",
    unit: "bbl",
    source: "NYMEX / CME (Yahoo Finance Live)",
    themeColor: "emerald",
    strokeColor: "#059669",
    fallbackPrice: 74.30,
    fallbackChange: -0.38
  },
  {
    id: "natgas",
    name: "Natural Gas",
    symbol: "NG",
    yahooTicker: "NG=F",
    unit: "MMBtu",
    source: "NYMEX (Yahoo Finance Live)",
    themeColor: "indigo",
    strokeColor: "#4F46E5",
    fallbackPrice: 2.85,
    fallbackChange: 1.25
  },
  {
    id: "copper",
    name: "Copper Grade A",
    symbol: "HG",
    yahooTicker: "HG=F",
    unit: "lb",
    source: "COMEX / LME (Yahoo Finance Live)",
    themeColor: "orange",
    strokeColor: "#EA580C",
    fallbackPrice: 4.62,
    fallbackChange: 0.35
  },
  {
    id: "silver",
    name: "Silver Spot",
    symbol: "XAG",
    yahooTicker: "SI=F",
    unit: "oz",
    source: "COMEX (Yahoo Finance Live)",
    themeColor: "slate",
    strokeColor: "#64748B",
    fallbackPrice: 33.20,
    fallbackChange: 1.10
  },
  {
    id: "wheat",
    name: "Chicago Wheat",
    symbol: "ZW",
    yahooTicker: "ZW=F",
    unit: "bu",
    source: "CBOT (Yahoo Finance Live)",
    themeColor: "yellow",
    strokeColor: "#CA8A04",
    isCentsPerUnit: true, // CBOT quotes in cents/bushel (e.g. 580.50 cents = $5.805/bu)
    fallbackPrice: 5.82,
    fallbackChange: -0.65
  }
];

const MACRO_TICKERS = [
  { id: "btc", name: "Bitcoin (BTC)", symbol: "BTC-USD", unit: "$", fallbackPrice: 87420, fallbackChange: 2.14 },
  { id: "gold", name: "Gold Spot", symbol: "GC=F", unit: "$/oz", fallbackPrice: 2895.40, fallbackChange: 0.85 },
  { id: "crude", name: "Brent Crude", symbol: "BZ=F", unit: "$/bbl", fallbackPrice: 78.45, fallbackChange: -0.42 },
  { id: "nifty", name: "NIFTY 50", symbol: "^NSEI", unit: "Pts", fallbackPrice: 24860.2, fallbackChange: 0.45 },
  { id: "sensex", name: "BSE SENSEX", symbol: "^BSESN", unit: "Pts", fallbackPrice: 81450.6, fallbackChange: 0.38 },
  { id: "sp500", name: "S&P 500", symbol: "^GSPC", unit: "Pts", fallbackPrice: 5980.4, fallbackChange: 0.28 },
  { id: "nasdaq", name: "NASDAQ 100", symbol: "^IXIC", unit: "Pts", fallbackPrice: 19320.5, fallbackChange: 0.52 },
  { id: "nikkei", name: "Nikkei 225", symbol: "^N225", unit: "¥ Pts", fallbackPrice: 38780.0, fallbackChange: -0.15 },
  { id: "ftse", name: "FTSE 100", symbol: "^FTSE", unit: "Pts", fallbackPrice: 8412.3, fallbackChange: 0.18 },
  { id: "us10y", name: "US 10-Yr Yield", symbol: "^TNX", unit: "%", isPercentage: true, fallbackPrice: 4.42, fallbackChange: -0.80 },
  { id: "dxy", name: "US Dollar Index", symbol: "DX-Y.NYB", unit: "Idx", fallbackPrice: 104.25, fallbackChange: -0.12 },
  { id: "usdinr", name: "USD / INR", symbol: "INR=X", unit: "₹", fallbackPrice: 86.85, fallbackChange: 0.05 },
  { id: "eurusd", name: "EUR / USD", symbol: "EURUSD=X", unit: "$", fallbackPrice: 1.082, fallbackChange: 0.14 }
];

async function fetchTickerChart(ticker: string, range: "7d" | "1mo" | "1y" = "1mo") {
  const hosts = ["query1.finance.yahoo.com", "query2.finance.yahoo.com"];
  
  for (const host of hosts) {
    try {
      const url = `https://${host}/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=${range}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept": "application/json"
        }
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        continue;
      }

      const data = await response.json();
      const result = data?.chart?.result?.[0];
      if (!result) continue;

      const meta = result.meta;
      const closes: number[] = (result.indicators?.quote?.[0]?.close || []).map((c: any) => 
        typeof c === "number" ? Number(c.toFixed(2)) : null
      ).filter((c: any) => c !== null);

      const regularMarketPrice = meta.regularMarketPrice ?? closes[closes.length - 1] ?? 0;
      const prevClose = meta.chartPreviousClose ?? meta.previousClose ?? closes[0] ?? regularMarketPrice;
      
      let changePct = 0;
      if (typeof meta.regularMarketChangePercent === "number") {
        changePct = Number(meta.regularMarketChangePercent.toFixed(2));
      } else if (prevClose && prevClose > 0) {
        changePct = Number((((regularMarketPrice - prevClose) / prevClose) * 100).toFixed(2));
      }

      return {
        price: regularMarketPrice,
        prevClose,
        changePct,
        currency: meta.currency || "USD",
        closes,
        lastUpdated: meta.regularMarketTime ? new Date(meta.regularMarketTime * 1000).toISOString() : new Date().toISOString()
      };
    } catch (error) {
      // Continue to next host if available
    }
  }
  return null;
}

async function getLiveMarketData() {
  const now = Date.now();
  if (cachedMarketData && (now - lastFetchTime < CACHE_TTL_MS)) {
    return cachedMarketData;
  }

  try {
    // 1. Fetch commodities data in parallel
    const commodityPromises = COMMODITY_CONFIGS.map(async (cfg) => {
      // Fetch 1mo for standard and 1y for long-term
      const [data1mo, data1y] = await Promise.all([
        fetchTickerChart(cfg.yahooTicker, "1mo"),
        fetchTickerChart(cfg.yahooTicker, "1y")
      ]);

      let price = cfg.fallbackPrice;
      let change = cfg.fallbackChange;
      let history1M: number[] = [];
      let history1Y: number[] = [];
      let history7D: number[] = [];

      if (data1mo && data1mo.price > 0) {
        let rawPrice = data1mo.price;
        // If quoted in US cents (like CBOT wheat), convert to USD dollars per bushel
        if (cfg.isCentsPerUnit && rawPrice > 100) {
          rawPrice = Number((rawPrice / 100).toFixed(2));
        }
        price = Number(rawPrice.toFixed(2));
        change = data1mo.changePct;
        
        let processedCloses = data1mo.closes;
        if (cfg.isCentsPerUnit) {
          processedCloses = processedCloses.map(c => Number((c / 100).toFixed(2)));
        }
        history1M = processedCloses;
        history7D = processedCloses.slice(-7);
      } else {
        // Fallback realistic curve
        history7D = [price * 0.98, price * 0.99, price * 0.985, price * 1.01, price * 0.995, price * 1.005, price];
        history1M = [price * 0.96, price * 0.97, price * 0.98, price * 0.99, price * 1.01, price * 1.005, price];
      }

      if (data1y && data1y.closes.length > 0) {
        let processed1Y = data1y.closes;
        if (cfg.isCentsPerUnit) {
          processed1Y = processed1Y.map(c => Number((c / 100).toFixed(2)));
        }
        history1Y = processed1Y;
      } else {
        history1Y = history1M;
      }

      return {
        id: cfg.id,
        name: cfg.name,
        symbol: cfg.symbol,
        yahooTicker: cfg.yahooTicker,
        unit: cfg.unit,
        basePrice: price,
        dailyChange: change,
        source: cfg.source,
        themeColor: cfg.themeColor,
        strokeColor: cfg.strokeColor,
        historical: {
          "7D": history7D.length > 0 ? history7D : [price],
          "1M": history1M.length > 0 ? history1M : [price],
          "1Y": history1Y.length > 0 ? history1Y : [price]
        }
      };
    });

    // 2. Fetch Macro Barometers
    const macroPromises = MACRO_TICKERS.map(async (item) => {
      const data = await fetchTickerChart(item.symbol, "1mo");
      const hasLivePrice = data && data.price > 0;
      return {
        id: item.id,
        name: item.name,
        symbol: item.symbol,
        unit: item.unit,
        price: hasLivePrice 
          ? Number(data.price.toFixed(item.isPercentage ? 2 : (data.price > 100 ? 1 : 2))) 
          : item.fallbackPrice,
        change: hasLivePrice ? data.changePct : item.fallbackChange,
        currency: data?.currency || "USD"
      };
    });

    const [commoditiesList, macroBarometers] = await Promise.all([
      Promise.all(commodityPromises),
      Promise.all(macroPromises)
    ]);

    const commoditiesMap: Record<string, any> = {};
    for (const c of commoditiesList) {
      commoditiesMap[c.id] = c;
    }

    const payload = {
      status: "success",
      source: "Yahoo Finance Real-Time API Sink",
      lastUpdated: new Date().toISOString(),
      commodities: commoditiesMap,
      macroBarometers,
      macroIndicators: {
        India: {
          country: "India",
          flag: "🇮🇳",
          inflation: 4.45,
          interestRate: 5.25,
          gdpGrowth: 7.80,
          unemployment: 5.10,
          source: "Reserve Bank of India / MoSPI"
        },
        USA: {
          country: "United States",
          flag: "🇺🇸",
          inflation: 3.40,
          interestRate: 3.75,
          gdpGrowth: 2.80,
          unemployment: 4.30,
          source: "Federal Reserve / BLS"
        },
        Eurozone: {
          country: "Eurozone",
          flag: "🇪🇺",
          inflation: 3.00,
          interestRate: 2.50,
          gdpGrowth: 0.90,
          unemployment: 6.40,
          source: "European Central Bank / Eurostat"
        },
        China: {
          country: "China",
          flag: "🇨🇳",
          inflation: 0.80,
          interestRate: 3.00,
          gdpGrowth: 4.30,
          unemployment: 5.20,
          source: "People's Bank of China / NBS"
        }
      }
    };

    cachedMarketData = payload;
    lastFetchTime = now;
    return payload;
  } catch (error: any) {
    console.error("Failed to build live market payload:", error);
    if (cachedMarketData) return cachedMarketData;
    throw error;
  }
}

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/macro-matrix", async (_req, res) => {
  try {
    const data = await getLiveMarketData();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/api/commodities", async (_req, res) => {
  try {
    const data = await getLiveMarketData();
    res.json({ status: "success", commodities: data.commodities, lastUpdated: data.lastUpdated });
  } catch (error: any) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

const GOOGLE_SHEETS_WEBHOOK_URL =
  process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbyv8riBzrPbzHS1-qY1aa6naNDIPRd0Vc3ZAC_rgeFCWaxtmJSySWg8RMTAB1Iw1i7I/exec";

app.post("/api/subscribe", async (req, res) => {
  try {
    const { email, source } = req.body || {};
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ status: "error", message: "A valid email address is required." });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanSource = source || "Website Footer - Weekly Intelligence Briefings";
    const timestamp = new Date().toISOString();

    console.log(`[Newsletter Subscription] Enrolling ${cleanEmail} from ${cleanSource} at ${timestamp}`);

    // Forward to Google Apps Script Webhook
    try {
      // Send both JSON and standard payload structure
      const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify({
          email: cleanEmail,
          source: cleanSource,
          timestamp: timestamp
        }),
        redirect: "follow"
      });

      console.log(`[Newsletter Subscription] Google Script response status: ${response.status}`);
    } catch (scriptErr: any) {
      console.warn(`[Newsletter Subscription] Warning forwarding to Google Script:`, scriptErr?.message || scriptErr);
    }

    return res.json({
      status: "success",
      message: "Successfully subscribed to the Sovereign Intelligence Briefing."
    });
  } catch (error: any) {
    console.error("[Newsletter Subscription] Server error:", error);
    return res.status(500).json({ status: "error", message: error?.message || "Failed to process subscription" });
  }
});

const BUSINESS_INQUIRY_WEBHOOK_URL = process.env.BUSINESS_INQUIRY_WEBHOOK_URL || "";

app.post("/api/business-inquiry", async (req, res) => {
  try {
    const { company, email, vertical, solutionTypes, timeline, needs } = req.body || {};
    const timestamp = new Date().toISOString();
    const id = `ISO-BIZ-${Math.floor(1000 + Math.random() * 9000)}`;

    console.log(`[Business Inquiry] Received from ${company} (${email}) for vertical "${vertical}" at ${timestamp}`);

    if (BUSINESS_INQUIRY_WEBHOOK_URL) {
      try {
        await fetch(BUSINESS_INQUIRY_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            company,
            email,
            vertical,
            solutionTypes,
            timeline,
            needs,
            timestamp
          }),
          redirect: "follow"
        });
      } catch (err: any) {
        console.warn("[Business Inquiry] Warning forwarding inquiry to webhook:", err?.message || err);
      }
    }

    return res.json({
      status: "success",
      id,
      message: "We have received your scoping inquiry. Our Strategy Desk will review your parameters and get back to you within 24 hours."
    });
  } catch (error: any) {
    console.error("[Business Inquiry] Error:", error);
    return res.status(500).json({ status: "error", message: error?.message || "Failed to process business inquiry" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    // Robustly locate dist directory in production containers (whether running from repo root or inside dist/)
    const distPath = fs.existsSync(path.join(__dirname, "index.html"))
      ? __dirname
      : (fs.existsSync(path.join(process.cwd(), "dist", "index.html"))
          ? path.join(process.cwd(), "dist")
          : process.cwd());

    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"), (err) => {
        if (err && !res.headersSent) {
          res.status(200).send("<!doctype html><html><body><div id='root'></div></body></html>");
        }
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Insightondia server running on port ${PORT}`);
  });
}

startServer();
