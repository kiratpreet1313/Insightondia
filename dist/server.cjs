var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var app = (0, import_express.default)();
var isDevSandbox = Boolean(process.env.CONTROL_PLANE_PORT || process.env.DEFAULT_APP_PORT);
var PORT = isDevSandbox ? 3e3 : process.env.PORT ? parseInt(process.env.PORT, 10) : 3e3;
app.use(import_express.default.json());
var cachedMarketData = null;
var lastFetchTime = 0;
var CACHE_TTL_MS = 25e3;
var COMMODITY_CONFIGS = [
  {
    id: "gold",
    name: "Gold Spot",
    symbol: "XAU",
    yahooTicker: "GC=F",
    unit: "oz",
    source: "COMEX / CME Group (Yahoo Finance Live)",
    themeColor: "amber",
    strokeColor: "#D97706",
    fallbackPrice: 2895.4,
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
    fallbackPrice: 74.3,
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
    fallbackPrice: 33.2,
    fallbackChange: 1.1
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
    isCentsPerUnit: true,
    // CBOT quotes in cents/bushel (e.g. 580.50 cents = $5.805/bu)
    fallbackPrice: 5.82,
    fallbackChange: -0.65
  }
];
var MACRO_TICKERS = [
  { id: "btc", name: "Bitcoin (BTC)", symbol: "BTC-USD", unit: "$", fallbackPrice: 87420, fallbackChange: 2.14 },
  { id: "gold", name: "Gold Spot", symbol: "GC=F", unit: "$/oz", fallbackPrice: 2895.4, fallbackChange: 0.85 },
  { id: "crude", name: "Brent Crude", symbol: "BZ=F", unit: "$/bbl", fallbackPrice: 78.45, fallbackChange: -0.42 },
  { id: "nifty", name: "NIFTY 50", symbol: "^NSEI", unit: "Pts", fallbackPrice: 24860.2, fallbackChange: 0.45 },
  { id: "sensex", name: "BSE SENSEX", symbol: "^BSESN", unit: "Pts", fallbackPrice: 81450.6, fallbackChange: 0.38 },
  { id: "sp500", name: "S&P 500", symbol: "^GSPC", unit: "Pts", fallbackPrice: 5980.4, fallbackChange: 0.28 },
  { id: "nasdaq", name: "NASDAQ 100", symbol: "^IXIC", unit: "Pts", fallbackPrice: 19320.5, fallbackChange: 0.52 },
  { id: "nikkei", name: "Nikkei 225", symbol: "^N225", unit: "\xA5 Pts", fallbackPrice: 38780, fallbackChange: -0.15 },
  { id: "ftse", name: "FTSE 100", symbol: "^FTSE", unit: "Pts", fallbackPrice: 8412.3, fallbackChange: 0.18 },
  { id: "us10y", name: "US 10-Yr Yield", symbol: "^TNX", unit: "%", isPercentage: true, fallbackPrice: 4.42, fallbackChange: -0.8 },
  { id: "dxy", name: "US Dollar Index", symbol: "DX-Y.NYB", unit: "Idx", fallbackPrice: 104.25, fallbackChange: -0.12 },
  { id: "usdinr", name: "USD / INR", symbol: "INR=X", unit: "\u20B9", fallbackPrice: 86.85, fallbackChange: 0.05 },
  { id: "eurusd", name: "EUR / USD", symbol: "EURUSD=X", unit: "$", fallbackPrice: 1.082, fallbackChange: 0.14 }
];
async function fetchTickerChart(ticker, range = "1mo") {
  const hosts = ["query1.finance.yahoo.com", "query2.finance.yahoo.com"];
  for (const host of hosts) {
    try {
      const url = `https://${host}/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=${range}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4e3);
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
      const closes = (result.indicators?.quote?.[0]?.close || []).map(
        (c) => typeof c === "number" ? Number(c.toFixed(2)) : null
      ).filter((c) => c !== null);
      const regularMarketPrice = meta.regularMarketPrice ?? closes[closes.length - 1] ?? 0;
      const prevClose = meta.chartPreviousClose ?? meta.previousClose ?? closes[0] ?? regularMarketPrice;
      let changePct = 0;
      if (typeof meta.regularMarketChangePercent === "number") {
        changePct = Number(meta.regularMarketChangePercent.toFixed(2));
      } else if (prevClose && prevClose > 0) {
        changePct = Number(((regularMarketPrice - prevClose) / prevClose * 100).toFixed(2));
      }
      return {
        price: regularMarketPrice,
        prevClose,
        changePct,
        currency: meta.currency || "USD",
        closes,
        lastUpdated: meta.regularMarketTime ? new Date(meta.regularMarketTime * 1e3).toISOString() : (/* @__PURE__ */ new Date()).toISOString()
      };
    } catch (error) {
    }
  }
  return null;
}
async function getLiveMarketData() {
  const now = Date.now();
  if (cachedMarketData && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedMarketData;
  }
  try {
    const commodityPromises = COMMODITY_CONFIGS.map(async (cfg) => {
      const [data1mo, data1y] = await Promise.all([
        fetchTickerChart(cfg.yahooTicker, "1mo"),
        fetchTickerChart(cfg.yahooTicker, "1y")
      ]);
      let price = cfg.fallbackPrice;
      let change = cfg.fallbackChange;
      let history1M = [];
      let history1Y = [];
      let history7D = [];
      if (data1mo && data1mo.price > 0) {
        let rawPrice = data1mo.price;
        if (cfg.isCentsPerUnit && rawPrice > 100) {
          rawPrice = Number((rawPrice / 100).toFixed(2));
        }
        price = Number(rawPrice.toFixed(2));
        change = data1mo.changePct;
        let processedCloses = data1mo.closes;
        if (cfg.isCentsPerUnit) {
          processedCloses = processedCloses.map((c) => Number((c / 100).toFixed(2)));
        }
        history1M = processedCloses;
        history7D = processedCloses.slice(-7);
      } else {
        history7D = [price * 0.98, price * 0.99, price * 0.985, price * 1.01, price * 0.995, price * 1.005, price];
        history1M = [price * 0.96, price * 0.97, price * 0.98, price * 0.99, price * 1.01, price * 1.005, price];
      }
      if (data1y && data1y.closes.length > 0) {
        let processed1Y = data1y.closes;
        if (cfg.isCentsPerUnit) {
          processed1Y = processed1Y.map((c) => Number((c / 100).toFixed(2)));
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
    const macroPromises = MACRO_TICKERS.map(async (item) => {
      const data = await fetchTickerChart(item.symbol, "1mo");
      const hasLivePrice = data && data.price > 0;
      return {
        id: item.id,
        name: item.name,
        symbol: item.symbol,
        unit: item.unit,
        price: hasLivePrice ? Number(data.price.toFixed(item.isPercentage ? 2 : data.price > 100 ? 1 : 2)) : item.fallbackPrice,
        change: hasLivePrice ? data.changePct : item.fallbackChange,
        currency: data?.currency || "USD"
      };
    });
    const [commoditiesList, macroBarometers] = await Promise.all([
      Promise.all(commodityPromises),
      Promise.all(macroPromises)
    ]);
    const commoditiesMap = {};
    for (const c of commoditiesList) {
      commoditiesMap[c.id] = c;
    }
    const payload = {
      status: "success",
      source: "Yahoo Finance Real-Time API Sink",
      lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
      commodities: commoditiesMap,
      macroBarometers,
      macroIndicators: {
        India: {
          country: "India",
          flag: "\u{1F1EE}\u{1F1F3}",
          inflation: 4.45,
          interestRate: 5.25,
          gdpGrowth: 7.8,
          unemployment: 5.1,
          source: "Reserve Bank of India / MoSPI"
        },
        USA: {
          country: "United States",
          flag: "\u{1F1FA}\u{1F1F8}",
          inflation: 3.4,
          interestRate: 3.75,
          gdpGrowth: 2.8,
          unemployment: 4.3,
          source: "Federal Reserve / BLS"
        },
        Eurozone: {
          country: "Eurozone",
          flag: "\u{1F1EA}\u{1F1FA}",
          inflation: 3,
          interestRate: 2.5,
          gdpGrowth: 0.9,
          unemployment: 6.4,
          source: "European Central Bank / Eurostat"
        },
        China: {
          country: "China",
          flag: "\u{1F1E8}\u{1F1F3}",
          inflation: 0.8,
          interestRate: 3,
          gdpGrowth: 4.3,
          unemployment: 5.2,
          source: "People's Bank of China / NBS"
        }
      }
    };
    cachedMarketData = payload;
    lastFetchTime = now;
    return payload;
  } catch (error) {
    console.error("Failed to build live market payload:", error);
    if (cachedMarketData) return cachedMarketData;
    throw error;
  }
}
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
app.get("/api/macro-matrix", async (_req, res) => {
  try {
    const data = await getLiveMarketData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
app.get("/api/commodities", async (_req, res) => {
  try {
    const data = await getLiveMarketData();
    res.json({ status: "success", commodities: data.commodities, lastUpdated: data.lastUpdated });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
var GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbyv8riBzrPbzHS1-qY1aa6naNDIPRd0Vc3ZAC_rgeFCWaxtmJSySWg8RMTAB1Iw1i7I/exec";
app.post("/api/subscribe", async (req, res) => {
  try {
    const { email, source } = req.body || {};
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ status: "error", message: "A valid email address is required." });
    }
    const cleanEmail = email.trim().toLowerCase();
    const cleanSource = source || "Website Footer - Weekly Intelligence Briefings";
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    console.log(`[Newsletter Subscription] Enrolling ${cleanEmail} from ${cleanSource} at ${timestamp}`);
    try {
      const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify({
          email: cleanEmail,
          source: cleanSource,
          timestamp
        }),
        redirect: "follow"
      });
      console.log(`[Newsletter Subscription] Google Script response status: ${response.status}`);
    } catch (scriptErr) {
      console.warn(`[Newsletter Subscription] Warning forwarding to Google Script:`, scriptErr?.message || scriptErr);
    }
    return res.json({
      status: "success",
      message: "Successfully subscribed to the Sovereign Intelligence Briefing."
    });
  } catch (error) {
    console.error("[Newsletter Subscription] Server error:", error);
    return res.status(500).json({ status: "error", message: error?.message || "Failed to process subscription" });
  }
});
var BUSINESS_INQUIRY_WEBHOOK_URL = process.env.BUSINESS_INQUIRY_WEBHOOK_URL || "";
app.post("/api/business-inquiry", async (req, res) => {
  try {
    const { company, email, vertical, solutionTypes, timeline, needs } = req.body || {};
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const id = `ISO-BIZ-${Math.floor(1e3 + Math.random() * 9e3)}`;
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
      } catch (err) {
        console.warn("[Business Inquiry] Warning forwarding inquiry to webhook:", err?.message || err);
      }
    }
    return res.json({
      status: "success",
      id,
      message: "We have received your scoping inquiry. Our Strategy Desk will review your parameters and get back to you within 24 hours."
    });
  } catch (error) {
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
    const distPath = import_fs.default.existsSync(import_path.default.join(__dirname, "index.html")) ? __dirname : import_fs.default.existsSync(import_path.default.join(process.cwd(), "dist", "index.html")) ? import_path.default.join(process.cwd(), "dist") : process.cwd();
    app.use(import_express.default.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"), (err) => {
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
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
//# sourceMappingURL=server.cjs.map
