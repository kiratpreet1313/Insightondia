/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { Building2, CheckCircle2 } from "lucide-react";
import SketchUnderline from "./SketchUnderline";

export interface MacroCountryIndicator {
  country: string;
  flag: string;
  inflation: number;
  interestRate: number;
  gdpGrowth: number;
  unemployment: number;
  source: string;
}

const DEFAULT_MACRO_INDICATORS: Record<string, MacroCountryIndicator> = {
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
};

export default function MacroTerminal() {
  const [macroIndicators, setMacroIndicators] = useState<Record<string, MacroCountryIndicator>>(DEFAULT_MACRO_INDICATORS);
  const [activeMacroTab, setActiveMacroTab] = useState<"inflation" | "interest" | "gdp" | "employment">("inflation");

  const fetchMarketData = async () => {
    try {
      const response = await fetch("/api/macro-matrix");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      
      if (data.macroIndicators) {
        setMacroIndicators(data.macroIndicators);
      }
    } catch (err) {
      console.warn("Using baseline macro data:", err);
    }
  };

  useEffect(() => {
    fetchMarketData();

    // Auto-refresh every 20 seconds
    const interval = setInterval(() => {
      fetchMarketData();
    }, 20000);

    // Refresh immediately when user returns to tab/window
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchMarketData();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const countryList = useMemo<MacroCountryIndicator[]>(() => {
    return Object.values(macroIndicators) as MacroCountryIndicator[];
  }, [macroIndicators]);

  return (
    <div className="w-full my-1 sm:my-2" id="central-bank-macro-matrix">
      {/* SECTION EDITORIAL HEADER */}
      <div className="pb-2.5 border-b border-[#0A1F44]/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] bg-[#0A1F44] text-white px-2 py-0.5 rounded uppercase font-bold tracking-widest flex items-center gap-1.5">
              <Building2 className="w-3 h-3 text-sky-300" />
              Macro Terminal
            </span>
            <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
              G4 Sovereign Matrix
            </span>
          </div>

          <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#0A1F44] leading-tight">
            <SketchUnderline variant="wave" color="sky">
              Central Bank & Macro Matrix
            </SketchUnderline>
          </h2>

          <p className="font-sans text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed">
            Official Benchmark Repo Rates & Empirical CPI Indicators across primary central bank jurisdictions.
          </p>
        </div>
      </div>

      {/* 3. BROADSHEET INDICATOR LEDGER TABS */}
      <div className="border-y border-[#0A1F44]/20 py-1.5 my-2.5 bg-slate-50/70 -mx-1 px-1 flex items-center justify-between gap-1.5">
        <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-[#0A1F44]/70 px-1 hidden md:inline shrink-0">
          Indicator Category:
        </span>
        <div className="grid grid-cols-4 gap-1 sm:gap-1.5 flex-1 w-full">
          {[
            { id: "inflation", label: "Inflation", sub: "(CPI)" },
            { id: "interest", label: "Policy Rate", sub: "(Repo)" },
            { id: "gdp", label: "GDP", sub: "(YoY)" },
            { id: "employment", label: "Unemployment", sub: "Rate" }
          ].map((tab) => {
            const isActive = activeMacroTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveMacroTab(tab.id as any)}
                className={`py-1 sm:py-1.5 px-1 sm:px-2 font-mono text-[8px] xs:text-[9px] sm:text-xs font-bold uppercase tracking-wider rounded transition-all text-center flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 cursor-pointer ${
                  isActive
                    ? "bg-[#0A1F44] text-white border-2 border-[#0A1F44] shadow-[1px_1px_0px_#0A1F44] sm:shadow-[2px_2px_0px_#0A1F44]"
                    : "bg-white text-[#0A1F44] border border-[#0A1F44]/30 hover:border-[#0A1F44] hover:bg-sky-50/40"
                }`}
              >
                <span className="truncate">{tab.label}</span>
                <span className={`text-[7px] xs:text-[8px] sm:text-[9px] font-normal ${isActive ? "text-sky-300 font-semibold" : "text-gray-500"}`}>
                  {tab.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. SOVEREIGN COUNTRY CARDS (2x2 on Mobile, 4-Column on Desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 my-2.5">
        {countryList.map((country) => {
          let value = 0;
          let unit = "% YoY";
          let badgeLabel = "CPI";
          let barHighlight = "bg-sky-600";

          if (activeMacroTab === "inflation") {
            value = country.inflation;
            badgeLabel = "Inflation";
            unit = "% YoY";
            barHighlight = value > 4.0 ? "bg-rose-500" : "bg-sky-600";
          } else if (activeMacroTab === "interest") {
            value = country.interestRate;
            badgeLabel = "Benchmark";
            unit = "% Policy";
            barHighlight = "bg-sky-700";
          } else if (activeMacroTab === "gdp") {
            value = country.gdpGrowth;
            badgeLabel = "Real GDP";
            unit = "% Annual";
            barHighlight = "bg-emerald-600";
          } else if (activeMacroTab === "employment") {
            value = country.unemployment;
            badgeLabel = "Jobless";
            unit = "% Labor";
            barHighlight = "bg-indigo-600";
          }

          const maxScale = activeMacroTab === "gdp" ? 8.0 : (activeMacroTab === "interest" ? 7.5 : 8.0);
          const barWidth = Math.min(100, Math.max(12, (value / maxScale) * 100));

          return (
            <div 
              key={country.country} 
              className="bg-white border-2 border-[#0A1F44] rounded-lg p-2.5 sm:p-4 shadow-[2px_2px_0px_#0A1F44] sm:shadow-[3px_3px_0px_#0A1F44] hover:shadow-[4px_4px_0px_#0A1F44] transition-all space-y-2 sm:space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-1.5 sm:space-y-2">
                {/* Card Header: Flag, Country & Badge */}
                <div className="flex justify-between items-center border-b border-[#0A1F44]/15 pb-1.5 sm:pb-2 gap-1">
                  <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                    <span className="text-sm sm:text-lg leading-none shrink-0" role="img" aria-label={country.country}>
                      {country.flag}
                    </span>
                    <span className="font-serif font-bold text-xs sm:text-base text-[#0A1F44] truncate">
                      {country.country}
                    </span>
                  </div>
                  <span className="font-mono text-[8px] sm:text-[9px] font-bold px-1 sm:px-1.5 py-0.5 rounded border border-[#0A1F44]/20 bg-sky-50 text-sky-900 shrink-0 uppercase">
                    {badgeLabel}
                  </span>
                </div>

                {/* Prominent Broadsheet Metric */}
                <div className="pt-0.5">
                  <div className="flex items-baseline justify-between gap-1">
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-gray-500 font-bold truncate">
                      Metric
                    </span>
                    <span className="font-mono text-[8px] sm:text-[9px] text-gray-500 shrink-0">
                      {unit}
                    </span>
                  </div>
                  <div className="font-mono text-xl sm:text-2xl lg:text-3xl font-black text-[#0A1F44] tracking-tight mt-0.5 flex items-baseline">
                    {value.toFixed(2)}
                    <span className="text-sm sm:text-base lg:text-lg font-bold text-sky-700 ml-0.5 sm:ml-1">%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2 pt-1 border-t border-[#0A1F44]/10">
                {/* Visual Relative Scale Gauge */}
                <div className="space-y-0.5 sm:space-y-1">
                  <div className="flex justify-between text-[7px] sm:text-[8px] font-mono text-gray-400 uppercase">
                    <span>Range</span>
                    <span className="font-bold text-[#0A1F44]">{value.toFixed(2)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full border border-[#0A1F44]/15 overflow-hidden">
                    <div 
                      className={`h-full ${barHighlight} rounded-full transition-all duration-500`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>

                {/* Primary Official Source Bureau */}
                <div className="flex items-center justify-between text-[7px] sm:text-[8px] md:text-[9px] font-mono text-gray-500 pt-0.5">
                  <span className="truncate max-w-[85%] font-medium" title={country.source}>
                    {country.source}
                  </span>
                  <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-sky-700 shrink-0 ml-1" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
