/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  ArrowRight, 
  ArrowUpRight, 
  ChevronRight
} from "lucide-react";
import { Publication } from "../types";
import { PUBLICATIONS, STATISTICS } from "../data";
import SketchUnderline from "./SketchUnderline";
import articleImage from "../assets/images/Article image.21.37 AM.png";
import geminiHeroImage from "../assets/images/Gemini_Generated_Image_nu79fnu79fnu79fn.png";

interface LiveTickerItem {
  id: string;
  name: string;
  symbol: string;
  unit?: string;
  price: number;
  change: number;
  region?: string;
}

const DEFAULT_TICKERS: LiveTickerItem[] = [
  { id: "btc", name: "Bitcoin (BTC)", symbol: "BTC-USD", unit: "$", price: 87420.0, change: 2.14, region: "Crypto" },
  { id: "gold", name: "Gold Spot", symbol: "GC=F", unit: "$/oz", price: 2895.4, change: 0.85, region: "Commodity" },
  { id: "crude", name: "Brent Crude", symbol: "BZ=F", unit: "$/bbl", price: 78.45, change: -0.42, region: "Commodity" },
  { id: "wti", name: "WTI Crude", symbol: "CL=F", unit: "$/bbl", price: 74.30, change: -0.38, region: "Commodity" },
  { id: "silver", name: "Silver Spot", symbol: "SI=F", unit: "$/oz", price: 33.20, change: 1.10, region: "Commodity" },
  { id: "natgas", name: "Natural Gas", symbol: "NG=F", unit: "$/MMBtu", price: 2.85, change: 1.25, region: "Commodity" },
  { id: "nifty", name: "India NIFTY 50", symbol: "^NSEI", unit: "Pts", price: 24860.2, change: 0.45, region: "India" },
  { id: "sensex", name: "India SENSEX", symbol: "^BSESN", unit: "Pts", price: 81450.6, change: 0.38, region: "India" },
  { id: "sp500", name: "US S&P 500", symbol: "^GSPC", unit: "Pts", price: 5980.4, change: 0.28, region: "US" },
  { id: "nasdaq", name: "US NASDAQ", symbol: "^IXIC", unit: "Pts", price: 19320.5, change: 0.52, region: "US" },
  { id: "nikkei", name: "Japan Nikkei 225", symbol: "^N225", unit: "¥", price: 38780.0, change: -0.15, region: "Japan" },
  { id: "ftse", name: "UK FTSE 100", symbol: "^FTSE", unit: "Pts", price: 8412.3, change: 0.18, region: "Europe" },
  { id: "us10y", name: "US 10-Yr Yield", symbol: "^TNX", unit: "%", price: 4.42, change: -0.80, region: "Bonds" },
  { id: "dxy", name: "US Dollar Index", symbol: "DX-Y", unit: "Idx", price: 104.25, change: -0.12, region: "FX" },
  { id: "usdinr", name: "USD / INR", symbol: "INR=X", unit: "₹", price: 86.85, change: 0.05, region: "FX" },
  { id: "eurusd", name: "EUR / USD", symbol: "EURUSD=X", unit: "$", price: 1.082, change: 0.14, region: "FX" }
];

interface NewspaperHeroProps {
  onPageChange: (page: string) => void;
  onReadPublication: (pub: Publication) => void;
}

export const NewspaperHero: React.FC<NewspaperHeroProps> = ({
  onPageChange,
  onReadPublication
}) => {
  const [tickers, setTickers] = useState<LiveTickerItem[]>(DEFAULT_TICKERS);
  const [lastSync, setLastSync] = useState<string>("LIVE");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // Fetch real-time market data from backend
  useEffect(() => {
    let isMounted = true;
    const fetchMarketData = async () => {
      try {
        setIsUpdating(true);
        const res = await fetch("/api/macro-matrix");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        
        if (data && data.macroBarometers && Array.isArray(data.macroBarometers)) {
          if (isMounted) {
            const mapped: LiveTickerItem[] = data.macroBarometers.map((m: any) => ({
              id: m.id,
              name: m.name,
              symbol: m.symbol,
              unit: m.unit,
              price: typeof m.price === "number" ? m.price : 0,
              change: typeof m.change === "number" ? m.change : 0
            }));
            
            // If commodities exist, also include key commodities
            if (data.commodities) {
              const gold = data.commodities.gold;
              const crude = data.commodities.crude;
              const wti = data.commodities.wti;
              const silver = data.commodities.silver;
              const natgas = data.commodities.natgas;
              
              const comms: LiveTickerItem[] = [];
              if (gold) comms.push({ id: "gold", name: "Gold Spot", symbol: "GC=F", unit: "$/oz", price: gold.basePrice, change: gold.dailyChange });
              if (crude) comms.push({ id: "crude", name: "Brent Crude", symbol: "BZ=F", unit: "$/bbl", price: crude.basePrice, change: crude.dailyChange });
              if (wti) comms.push({ id: "wti", name: "WTI Crude", symbol: "CL=F", unit: "$/bbl", price: wti.basePrice, change: wti.dailyChange });
              if (silver) comms.push({ id: "silver", name: "Silver Spot", symbol: "SI=F", unit: "$/oz", price: silver.basePrice, change: silver.dailyChange });
              if (natgas) comms.push({ id: "natgas", name: "Natural Gas", symbol: "NG=F", unit: "$/MMBtu", price: natgas.basePrice, change: natgas.dailyChange });
              
              // Merge without duplicates
              const combined = [...mapped];
              for (const c of comms) {
                if (!combined.some(item => item.id === c.id)) {
                  combined.push(c);
                }
              }
              setTickers(combined.length > 0 ? combined : DEFAULT_TICKERS);
            } else {
              setTickers(mapped.length > 0 ? mapped : DEFAULT_TICKERS);
            }
            
            setLastSync(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
          }
        }
      } catch (err) {
        // Fallback to default
      } finally {
        if (isMounted) setIsUpdating(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 25000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Format today's dateline string
  const todayFormatted = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date());

  return (
    <section className="relative pt-0.5 pb-2 sm:pb-3 border-b-2 border-[#0A1F44] text-[#0A1F44] z-30" id="90s-newspaper-hero">
      
      {/* 1. GRAND 90s BROADSHEET MASTHEAD */}
      <div className="py-1 sm:py-3 text-center border-b border-[#0A1F44]/20">
        <div className="flex items-center justify-between mb-0.5 text-[8px] sm:text-[10px] font-mono tracking-widest uppercase text-[#0A1F44]/60 px-1">
          <span className="hidden sm:inline-block font-semibold">ESTABLISHED 2026</span>
          <span className="mx-auto sm:mx-0 font-bold tracking-[0.15em] sm:tracking-[0.25em] text-[#0A1F44] text-[8px] sm:text-[10px]">
            INDEPENDENT YOUTH-LED ECONOMICS THINK TANK
          </span>
          <span className="hidden sm:inline-block w-24"></span>
        </div>
        
        {/* Massive Bold Newspaper Name - Perfectly scaled across mobile, tablet, and desktop */}
        <h1 
          className="font-serif text-[11vw] sm:text-7xl md:text-8xl lg:text-[100px] xl:text-[116px] font-black uppercase tracking-tight text-[#0A1F44] leading-none transition-transform hover:scale-[1.005] duration-300 select-none py-0.5 drop-shadow-sm whitespace-nowrap"
          style={{ letterSpacing: "-0.03em" }}
        >
          INSIGHTONDIA
        </h1>

        <div className="text-[7.5px] sm:text-[11px] font-mono tracking-wider sm:tracking-widest uppercase text-[#0A1F44]/70 mt-0.5 flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
          <span>MONETARY POLICY</span>
          <span>&bull;</span>
          <span>SOVEREIGN DEBT</span>
          <span className="hidden xs:inline">&bull;</span>
          <span className="hidden xs:inline">INDUSTRIAL NETWORKS</span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="hidden sm:inline">GLOBAL COMMODITIES</span>
        </div>
      </div>

      {/* 2. EDITORIAL NAVIGATION BAR (Sticky below masthead on scroll - No horizontal scrolling, no clipping) */}
      <nav 
        aria-label="Newspaper Department Index"
        className="sticky top-0 z-50 border-y-2 border-[#0A1F44] my-1.5 py-1 bg-white/95 backdrop-blur-sm shadow-sm"
      >
        <div className="flex items-center justify-between gap-1 sm:gap-2 px-0.5 sm:px-2 text-[10px] sm:text-xs font-mono uppercase font-bold tracking-wider relative w-full">
          
          <div className="flex items-center gap-0.5 sm:gap-2 md:gap-3">
            {/* Home */}
            <button
              onClick={() => onPageChange("home")}
              className="px-1.5 sm:px-3 py-0.5 sm:py-1 text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white transition-colors flex items-center border border-transparent hover:border-[#0A1F44]"
            >
              <span>HOME</span>
            </button>
            
            {/* About */}
            <button
              onClick={() => onPageChange("about")}
              className="px-1.5 sm:px-3 py-0.5 sm:py-1 text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white transition-colors flex items-center border border-transparent hover:border-[#0A1F44]"
            >
              <span>ABOUT</span>
            </button>

            {/* Research with Dropdown Chevron Arrow (Floats properly above all lines) */}
            <div className="relative group">
              <button
                onClick={() => onPageChange("research")}
                className="px-1.5 sm:px-3 py-0.5 sm:py-1 text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white transition-colors flex items-center gap-0.5 sm:gap-1 border border-transparent hover:border-[#0A1F44]"
              >
                <span>RESEARCH</span>
                <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:rotate-90 transition-transform" />
              </button>
              <div className="hidden group-hover:block absolute left-0 top-full pt-1 z-[100] min-w-[210px] sm:min-w-[230px]">
                <div className="bg-white border-2 border-[#0A1F44] p-1.5 sm:p-2 shadow-[4px_4px_0px_#0A1F44] space-y-1">
                  <button
                    onClick={() => onPageChange("research")}
                    className="w-full text-left px-2.5 py-1.5 hover:bg-[#0A1F44] hover:text-white text-[10px] sm:text-[11px] text-[#0A1F44] flex items-center justify-between font-bold"
                  >
                    <span>Explore Research</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onPageChange("current-affairs")}
                    className="w-full text-left px-2.5 py-1.5 hover:bg-[#0A1F44] hover:text-white text-[10px] sm:text-[11px] text-[#0A1F44] flex items-center justify-between font-bold"
                  >
                    <span>Current Affairs</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onPageChange("data-lab")}
                    className="w-full text-left px-2.5 py-1.5 hover:bg-[#0A1F44] hover:text-white text-[10px] sm:text-[11px] text-[#0A1F44] flex items-center justify-between font-bold"
                  >
                    <span>Data Lab</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Publications with Dropdown Chevron Arrow */}
            <div className="relative group">
              <button
                onClick={() => onPageChange("publications")}
                className="px-1.5 sm:px-3 py-0.5 sm:py-1 text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white transition-colors flex items-center gap-0.5 sm:gap-1 border border-transparent hover:border-[#0A1F44]"
              >
                <span>PUBLICATIONS</span>
                <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:rotate-90 transition-transform" />
              </button>
              <div className="hidden group-hover:block absolute left-0 top-full pt-1 z-[100] min-w-[210px] sm:min-w-[230px]">
                <div className="bg-white border-2 border-[#0A1F44] p-1.5 sm:p-2 shadow-[4px_4px_0px_#0A1F44] space-y-1">
                  <button
                    onClick={() => onPageChange("publications")}
                    className="w-full text-left px-2.5 py-1.5 hover:bg-[#0A1F44] hover:text-white text-[10px] sm:text-[11px] text-[#0A1F44] flex items-center justify-between font-bold"
                  >
                    <span>Publications Archive</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onPageChange("projects")}
                    className="w-full text-left px-2.5 py-1.5 hover:bg-[#0A1F44] hover:text-white text-[10px] sm:text-[11px] text-[#0A1F44] flex items-center justify-between font-bold"
                  >
                    <span>Featured Projects</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onPageChange("business")}
                    className="w-full text-left px-2.5 py-1.5 hover:bg-[#0A1F44] hover:text-white text-[10px] sm:text-[11px] text-[#0A1F44] flex items-center justify-between font-bold"
                  >
                    <span>Business Solutions</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Join Us CTA */}
          <button
            onClick={() => onPageChange("join")}
            className="px-2 sm:px-4 py-0.5 sm:py-1 bg-[#0A1F44] text-white hover:bg-navy-900 transition-all font-black flex items-center gap-1 shadow-sm whitespace-nowrap text-[10px] sm:text-xs"
          >
            <span>JOIN US &rarr;</span>
          </button>
        </div>
      </nav>

      {/* 3. REAL-TIME FINANCIAL TICKER BAR (Styled in rich #0A1F44 Navy with continuous horizontal motion) */}
      <div 
        className="my-3 py-2 bg-[#0A1F44] text-white overflow-hidden rounded shadow-sm border border-[#0A1F44]"
        id="newspaper-realtime-ticker"
      >
        <div className="relative w-full overflow-hidden flex items-center">
          {/* Animated Marquee Strip with cloned items for seamless infinite horizontal motion */}
          <div className="animate-ticker flex items-center">
            {[...tickers, ...tickers].map((item, idx) => {
              const isPositive = item.change >= 0;
              return (
                <div 
                  key={`${item.id}-${idx}`}
                  className="inline-flex items-center gap-2 px-4 py-0.5 font-mono text-[11px] tracking-wide whitespace-nowrap border-r border-white/20 shrink-0 select-none"
                >
                  <span className="font-bold text-white uppercase">{item.name}</span>
                  <span className="font-semibold text-sky-100">
                    {item.price > 1000 ? item.price.toLocaleString() : item.price} {item.unit || ""}
                  </span>
                  <span className={`inline-flex items-center text-[10px] font-bold px-1 py-0.2 rounded ${isPositive ? "text-emerald-300 bg-emerald-950/40" : "text-rose-300 bg-rose-950/40"}`}>
                    {isPositive ? "+" : ""}{item.change.toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. BROADSHEET EDITORIAL GRID (High-Contrast 2-Column Balanced Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-stretch mt-6">
        
        {/* LEFT COLUMN: Lead Story Headline, Mandate, Pillars & CTAs */}
        <div className="lg:col-span-8 lg:pr-8 xl:pr-10 space-y-6 lg:border-r lg:border-[#0A1F44]/20">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-bold leading-[1.12] text-[#0A1F44] tracking-tight">
              Understanding the{" "}
              <SketchUnderline variant="wave" color="sky">
                <span className="italic font-normal">Economics</span>
              </SketchUnderline>{" "}
              Behind Everything.
            </h2>
          </div>

          <div className="font-sans text-sm sm:text-base text-[#0A1F44]/80 leading-relaxed border-l-2 border-[#0A1F44]/30 pl-3 sm:pl-0 sm:border-l-0">
            <p>
              <span className="font-bold text-[#0A1F44]">Insightondia</span> is a youth-run economics research initiative studying how global events — wars, trade shifts, monetary policy, great-power rivalry — work their way into India's economy.
            </p>
          </div>

          {/* Editorial CTAs - Single Horizontal Line on Mobile & Desktop */}
          <div className="pt-1 flex flex-row items-stretch sm:items-center gap-2 sm:gap-3.5 w-full">
            <button
              onClick={() => onPageChange("join")}
              className="flex-1 sm:flex-initial bg-[#0A1F44] text-white hover:bg-navy-900 px-3 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-[2px_2px_0px_#0A1F44] sm:shadow-[3px_3px_0px_#0A1F44] hover:shadow-[4px_4px_0px_#0A1F44] border-2 border-[#0A1F44] whitespace-nowrap"
            >
              <span>Join the Think Tank</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 hidden xs:inline-block sm:inline-block" />
            </button>
            <button
              onClick={() => onPageChange("research")}
              className="flex-1 sm:flex-initial bg-white border-2 border-[#0A1F44] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white px-3 sm:px-5 py-2.5 sm:py-3 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-xs text-center justify-center whitespace-nowrap"
            >
              Explore Research
            </button>
          </div>

          {/* Broadsheet Press Feature Image */}
          <div className="pt-2">
            <div className="border-2 border-[#0A1F44] bg-white p-2 sm:p-2.5 shadow-[3px_3px_0px_#0A1F44] rounded">
              <div className="pb-1.5 px-0.5 flex items-center justify-between">
                <h3 className="font-mono text-xs sm:text-sm font-bold text-[#0A1F44] uppercase tracking-wider">
                  GLOBAL TRADE GATEWAYS
                </h3>
              </div>
              <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full overflow-hidden bg-slate-900 rounded-xs">
                <img
                  src={geminiHeroImage}
                  alt="GLOBAL TRADE GATEWAYS"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* MAGAZINE BORDERLINE FOR MOBILE VIEW */}
        <div className="block lg:hidden my-4 sm:my-6">
          <div className="border-t-2 border-[#0A1F44] border-b border-[#0A1F44]/40 py-0.5" />
        </div>

        {/* RIGHT COLUMN: Landmark Special Investigation (Expanded by 35-40%) */}
        <div className="lg:col-span-4 lg:pl-8 xl:pl-10 space-y-4 pt-0 lg:pt-0">
          <div className="border-b border-[#0A1F44]/20 pb-2">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest font-black text-[#0A1F44]/70 block">
              SPECIAL DISPATCH &bull; MONETARY POLICY
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#0A1F44] mt-1 leading-snug">
              Landmark Research Paper
            </h3>
          </div>

          <div className="border-2 border-[#0A1F44] p-4 sm:p-5 bg-white space-y-3.5 relative shadow-[3px_3px_0px_#0A1F44] rounded-md">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#0A1F44]/70 border-b border-[#0A1F44]/20 pb-2">
              <span className="font-bold">WORKING PAPER 2026.04</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                14 MIN READ
              </span>
            </div>

            {/* Landmark Paper Editorial Thumbnail */}
            <div 
              onClick={() => onReadPublication(PUBLICATIONS[0])}
              className="relative aspect-[16/9] w-full bg-slate-900 rounded overflow-hidden cursor-pointer group border border-[#0A1F44]/20"
            >
              <img
                src={articleImage}
                alt="Monetary Dilemmas and Central Banking"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-white/90">
                <span className="bg-[#0A1F44]/90 px-2 py-0.5 rounded text-[8px] sm:text-[9px] uppercase font-bold tracking-wider border border-white/20">
                  MACRO BAROMETER
                </span>
                <span className="text-sky-200 text-[9px] sm:text-[10px]">Yields & Liquidity</span>
              </div>
            </div>

            <h4 
              onClick={() => onReadPublication(PUBLICATIONS[0])}
              className="font-serif text-base sm:text-lg lg:text-xl font-bold text-[#0A1F44] hover:underline cursor-pointer leading-snug"
            >
              Monetary Dilemmas in the Post-Inflation Era
            </h4>

            <p className="font-sans text-xs sm:text-[13px] text-[#0A1F44]/80 line-clamp-3 leading-relaxed">
              An exhaustive econometric audit analyzing sovereign debt sustainability, central bank reserves, and quantitative tightening parameters.
            </p>

            <div className="pt-2.5 border-t border-[#0A1F44]/20 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-[9px] text-gray-500 block uppercase">Lead Author</span>
                <span className="text-[#0A1F44] font-bold text-xs">Aditya Vardhan</span>
              </div>
              <button
                onClick={() => onReadPublication(PUBLICATIONS[0])}
                className="bg-[#0A1F44] text-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider hover:bg-navy-900 flex items-center gap-1.5 rounded shadow-xs cursor-pointer shrink-0"
              >
                <span>Read Paper</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
