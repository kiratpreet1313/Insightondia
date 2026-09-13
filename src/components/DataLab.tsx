/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { 
  TrendingUp, 
  BarChart2, 
  Search, 
  Database, 
  Info, 
  Sliders, 
  RefreshCw, 
  ChevronRight, 
  ArrowUpRight, 
  Zap, 
  Lock, 
  Globe 
} from "lucide-react";

// Macroeconomic mock dataset for the visualizer
const MACRO_DATA = {
  India: {
    GDP: [6.1, 6.5, 6.8, 7.2, 7.0],
    Inflation: [5.4, 4.8, 4.2, 4.0, 4.1],
    InterestRate: [6.5, 6.25, 5.75, 5.5, 5.5],
    TradeBalance: [-20.5, -18.2, -15.4, -14.1, -15.0] // as % of exports
  },
  USA: {
    GDP: [2.1, 1.8, 2.0, 2.2, 1.9],
    Inflation: [3.4, 2.8, 2.3, 2.0, 2.1],
    InterestRate: [5.25, 4.75, 4.25, 3.75, 3.5],
    TradeBalance: [-32.1, -30.5, -28.9, -27.5, -28.0]
  },
  China: {
    GDP: [4.9, 4.6, 4.3, 4.5, 4.2],
    Inflation: [0.3, 0.9, 1.4, 1.6, 1.5],
    InterestRate: [3.45, 3.2, 3.1, 3.0, 3.0],
    TradeBalance: [12.4, 13.8, 14.5, 15.0, 14.8]
  },
  EU: {
    GDP: [0.8, 1.1, 1.4, 1.6, 1.5],
    Inflation: [2.9, 2.2, 2.0, 1.9, 2.0],
    InterestRate: [4.0, 3.5, 3.0, 2.75, 2.5],
    TradeBalance: [2.1, 3.4, 4.0, 4.2, 3.9]
  }
};

const SECTOR_DATABASE = [
  {
    name: "Technology",
    subsectors: ["SaaS", "Foundational AI", "Cloud Storage", "Cybersecurity"],
    marketCapGlobally: "$14.2T",
    competitiveMoat: "High (Platform lock-in, proprietary data layers, high capital cost of compute infrastructure)",
    riskFactor: "Sovereign regulatory scrutiny, anti-trust interventions, compute-hardware shortages",
    subsidyLevel: "High (Sovereign semiconductor grants, local innovation taxation incentives)",
    capitalFlowTrend: "+18.4% YoY"
  },
  {
    name: "Healthcare & Life Sciences",
    subsectors: ["Biotech", "Pharma", "Medical Devices", "Telemedicine"],
    marketCapGlobally: "$8.9T",
    competitiveMoat: "Very High (Patent exclusivity, regulatory pathways, specialized biochemical capital)",
    riskFactor: "Sovereign pricing restrictions, clinical trial failures, insurance policy shifts",
    subsidyLevel: "Medium (Sovereign research grants, public procurement frameworks)",
    capitalFlowTrend: "+9.2% YoY"
  },
  {
    name: "Energy Transition",
    subsectors: ["Solar PV", "Wind Systems", "Grid Storage", "Hydrogen Reduction"],
    marketCapGlobally: "$3.4T",
    competitiveMoat: "Medium (Highly commoditized manufacturing, reliance on grid-level sovereign integration)",
    riskFactor: "Grid bottlenecking, interest-rate cycles affecting highly leveraged capital projects",
    subsidyLevel: "Extremely High (Tax credits e.g. IRA, sovereign carbon tariff exemptions)",
    capitalFlowTrend: "+24.1% YoY"
  },
  {
    name: "Advanced Manufacturing",
    subsectors: ["Precision Tools", "Industrial Robotics", "Additives", "Aerospace"],
    marketCapGlobally: "$5.8T",
    competitiveMoat: "High (Specialized proprietary engineering, complex long-term supply relationships)",
    riskFactor: "Global trade friction, cyclical industrial capital expenditure drops",
    subsidyLevel: "Medium-High (National champions capital allowances, defense offset programs)",
    capitalFlowTrend: "+6.5% YoY"
  },
  {
    name: "Luxury & Premium Goods",
    subsectors: ["Absolute Luxury Haute Couture", "Horology", "Premium Automobiles", "Fine Art"],
    marketCapGlobally: "$1.8T",
    competitiveMoat: "Extremely High (Veblen brand pricing power, multi-generational heritage narratives)",
    riskFactor: "Aspirational demographic contraction, currency fluctuations, cultural alignment changes",
    subsidyLevel: "Low (Zero regulatory insulation, high consumption luxury tariffs)",
    capitalFlowTrend: "+4.1% YoY"
  },
  {
    name: "Financial Services & Fintech",
    subsectors: ["Digital Wallets", "Alternative Credit", "Investment Banking", "Insurtech"],
    marketCapGlobally: "$11.5T",
    competitiveMoat: "High (Regulatory license restrictions, deposit trust layers, payment network scale)",
    riskFactor: "Interest-rate volatility, sovereign ledger transitions, cyber risk exposure",
    subsidyLevel: "Low-Medium (Sandbox licensing allowances, digital infrastructure frameworks)",
    capitalFlowTrend: "+11.3% YoY"
  }
];

export default function DataLab() {
  const [activeCountry, setActiveCountry] = useState<keyof typeof MACRO_DATA>("India");
  const [activeMetric, setActiveMetric] = useState<"GDP" | "Inflation" | "InterestRate" | "TradeBalance">("GDP");
  const [dbSearch, setDbSearch] = useState("");
  const [selectedDbSector, setSelectedDbSector] = useState(SECTOR_DATABASE[0]);

  // Financial Growth Simulator State Variables
  const [capitalInput, setCapitalInput] = useState(6.5); // % of GDP allocated to capital works
  const [laborProductivity, setLaborProductivity] = useState(3.2); // annual % increase
  const [logisticsEfficiency, setLogisticsEfficiency] = useState(12.0); // logistics overhead as % of GDP (lower is better)
  const [regulationFriction, setRegulationFriction] = useState(4); // score 1-10 (lower is better)

  // Calculations derived from simulator parameters (dynamic forecasting)
  const simulatedForecast = useMemo(() => {
    // Standard growth model: Output growth is driven by Solow-Swan style parameters
    // Base potential growth is around 3.5%
    // Capital contribution: capitalInput * 0.3
    // Labor contribution: laborProductivity * 0.5
    // Logistics boost: (15 - logisticsEfficiency) * 0.25
    // Regulation headwind: (5 - regulationFriction) * 0.2
    const baseOutputGrowth = 3.2;
    const years = [2026, 2027, 2028, 2029, 2030];
    
    return years.map((year, idx) => {
      // Add slight compounding / structural transition over the years
      const yearFactor = 1 + idx * 0.04;
      const capitalContribution = (capitalInput - 4) * 0.28;
      const laborContribution = (laborProductivity - 1.5) * 0.45;
      const logisticsContribution = (15 - logisticsEfficiency) * 0.3;
      const regulationContribution = (5 - regulationFriction) * 0.15;
      
      const calculatedGrowth = Math.max(
        1.5, 
        baseOutputGrowth + (capitalContribution + laborContribution + logisticsContribution + regulationContribution) * yearFactor
      );

      // Sovereign Competitiveness Index score (1 to 100)
      const efficiencyScore = Math.max(
        10,
        Math.min(
          99,
          Math.round(
            50 + 
            (capitalInput * 3) + 
            (laborProductivity * 4) + 
            ((16 - logisticsEfficiency) * 3) - 
            (regulationFriction * 3.5)
          )
        )
      );

      // Estimated Capital Efficiency multiplier
      const incrementalCapitalOutputRatio = Math.max(1.5, (9 - (laborProductivity * 0.8 + (15 - logisticsEfficiency) * 0.4))).toFixed(2);

      return {
        year,
        growthRate: parseFloat(calculatedGrowth.toFixed(2)),
        competitivenessIndex: efficiencyScore,
        icor: incrementalCapitalOutputRatio
      };
    });
  }, [capitalInput, laborProductivity, logisticsEfficiency, regulationFriction]);

  // Handle resetting simulator parameters
  const resetSimulator = () => {
    setCapitalInput(6.5);
    setLaborProductivity(3.2);
    setLogisticsEfficiency(12.0);
    setRegulationFriction(4);
  };

  const filteredSectors = SECTOR_DATABASE.filter(sector =>
    sector.name.toLowerCase().includes(dbSearch.toLowerCase()) ||
    sector.subsectors.some(sub => sub.toLowerCase().includes(dbSearch.toLowerCase()))
  );

  // SVG Chart parameters for Macroeconomic Visualizer
  const macroPoints = MACRO_DATA[activeCountry][activeMetric];
  const chartYears = ["2022", "2023", "2024", "2025", "2026 (Est)"];
  
  // Custom SVG path calculation
  const svgWidth = 600;
  const svgHeight = 220;
  const padding = 40;
  const chartInnerWidth = svgWidth - padding * 2;
  const chartInnerHeight = svgHeight - padding * 2;

  // Find min/max values to scale Y axis cleanly
  const allValuesForMetric = Object.values(MACRO_DATA).flatMap(c => c[activeMetric]);
  const maxVal = Math.max(...allValuesForMetric, 8) * 1.15;
  const minVal = Math.min(...allValuesForMetric, -35) < 0 ? Math.min(...allValuesForMetric, -35) * 1.2 : 0;
  
  const yRange = maxVal - minVal;

  const pointsString = macroPoints.map((val, idx) => {
    const x = padding + (idx / (macroPoints.length - 1)) * chartInnerWidth;
    // scale y
    const y = padding + chartInnerHeight - ((val - minVal) / yRange) * chartInnerHeight;
    return `${x},${y}`;
  }).join(" ");

  const metricLabel = {
    GDP: "Annual Real GDP Growth (%)",
    Inflation: "Consumer Price Index (CPI) Inflation YoY (%)",
    InterestRate: "Benchmark Central Bank Policy Rate (%)",
    TradeBalance: "Net Non-Oil Trade Deficit/Surplus (% of Exports)"
  }[activeMetric];

  return (
    <div className="w-full bg-white text-navy-900 selection:bg-navy-900 selection:text-white" id="data-lab-terminal">
      {/* Editorial Header */}
      <div className="border-b border-navy-100 py-12">
        <span className="font-mono text-xs tracking-widest text-gray-500 uppercase block mb-3">
          Insightondia Advanced Quantitative Node
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-navy-950 mb-4">
          The Data Lab
        </h1>
        <p className="font-sans text-gray-600 max-w-3xl leading-relaxed text-lg">
          Our data-driven economic playground. Interact with live sovereign macroeconomic tracking models, explore structural sector matrices, and execute sensitivity simulations utilizing capital, labor, and logistics variables.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12">
        
        {/* SECTION 1: MACROECONOMIC VISUALIZER (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between" id="macroeconomic-dashboard">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="p-1.5 bg-navy-50 text-navy-900 border border-navy-100 rounded">
                <Globe className="w-4 h-4" />
              </span>
              <h2 className="font-serif text-2xl font-medium text-navy-950">
                Sovereign Macroeconomic Visualizer
              </h2>
            </div>
            
            <p className="font-sans text-sm text-gray-600 mb-8 max-w-xl">
              Select a sovereign system and structural variable to evaluate historical performance trends and estimated baseline movements.
            </p>

            {/* Controls */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(["India", "USA", "China", "EU"] as const).map((country) => (
                <button
                  key={country}
                  id={`country-btn-${country.toLowerCase()}`}
                  onClick={() => setActiveCountry(country)}
                  className={`px-4 py-2 font-mono text-xs border uppercase tracking-wider transition-all duration-150 ${
                    activeCountry === country
                      ? "bg-navy-900 text-white border-navy-900"
                      : "bg-white text-gray-600 border-gray-200 hover:border-navy-900 hover:text-navy-900"
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
              {(["GDP", "Inflation", "InterestRate", "TradeBalance"] as const).map((metric) => {
                const names = {
                  GDP: "Real GDP Growth",
                  Inflation: "CPI Inflation",
                  InterestRate: "Policy Rate",
                  TradeBalance: "Trade Balance"
                };
                return (
                  <button
                    key={metric}
                    id={`metric-btn-${metric.toLowerCase()}`}
                    onClick={() => setActiveMetric(metric)}
                    className={`p-3 text-left border transition-all duration-150 ${
                      activeMetric === metric
                        ? "bg-navy-50 border-navy-900 text-navy-950 font-medium"
                        : "bg-white border-gray-100 text-gray-500 hover:border-gray-300 hover:text-navy-900"
                    }`}
                  >
                    <span className="font-mono text-[10px] tracking-wider text-gray-400 block uppercase mb-1">
                      Indicator
                    </span>
                    <span className="font-sans text-xs sm:text-sm font-medium block">
                      {names[metric]}
                    </span>
                    <span className="font-mono text-xs text-navy-950 mt-1 block">
                      {MACRO_DATA[activeCountry][metric][4]}
                      {metric === "TradeBalance" ? "%" : "%"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Render Line Chart */}
          <div className="bg-navy-50 border border-navy-100 p-6 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-4 border-b border-navy-100 pb-3">
              <span className="font-mono text-xs font-semibold text-navy-900 uppercase">
                {activeCountry} &mdash; {metricLabel}
              </span>
              <span className="font-mono text-[10px] bg-white border border-navy-100 px-2 py-0.5 text-gray-500 rounded">
                Source: IMF / WEO / Insightondia
              </span>
            </div>

            {/* SVG Visualizer */}
            <div className="relative w-full overflow-x-auto">
              <svg 
                viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
                className="w-full min-w-[500px] h-auto overflow-visible"
              >
                {/* Horizontal grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                  const y = padding + ratio * chartInnerHeight;
                  const value = maxVal - ratio * yRange;
                  return (
                    <g key={idx}>
                      <line 
                        x1={padding} 
                        y1={y} 
                        x2={svgWidth - padding} 
                        y2={y} 
                        stroke="#e2e8f0" 
                        strokeWidth="1" 
                        strokeDasharray="4 4"
                      />
                      <text 
                        x={padding - 8} 
                        y={y + 4} 
                        fontFamily="var(--font-mono)" 
                        fontSize="9px" 
                        fill="#94a3b8" 
                        textAnchor="end"
                      >
                        {value.toFixed(1)}
                        {activeMetric === "TradeBalance" ? "%" : "%"}
                      </text>
                    </g>
                  );
                })}

                {/* X Axis Years */}
                {chartYears.map((year, idx) => {
                  const x = padding + (idx / (chartYears.length - 1)) * chartInnerWidth;
                  return (
                    <text
                      key={idx}
                      x={x}
                      y={svgHeight - padding + 18}
                      fontFamily="var(--font-mono)"
                      fontSize="10px"
                      fill="#64748b"
                      textAnchor="middle"
                    >
                      {year}
                    </text>
                  );
                })}

                {/* Path line */}
                <polyline
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={pointsString}
                />

                {/* Data Points */}
                {macroPoints.map((val, idx) => {
                  const x = padding + (idx / (macroPoints.length - 1)) * chartInnerWidth;
                  const y = padding + chartInnerHeight - ((val - minVal) / yRange) * chartInnerHeight;
                  return (
                    <g key={idx} className="group">
                      <circle
                        cx={x}
                        cy={y}
                        r="5"
                        fill="#0f172a"
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="transition-all duration-150 cursor-pointer hover:r-7"
                      />
                      <text
                        x={x}
                        y={y - 12}
                        fontFamily="var(--font-mono)"
                        fontSize="11px"
                        fontWeight="600"
                        fill="#0f172a"
                        textAnchor="middle"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none bg-white"
                      >
                        {val}%
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="flex gap-4 p-4 border border-navy-100 rounded-lg bg-white">
            <Info className="w-5 h-5 text-navy-800 shrink-0 mt-0.5" />
            <p className="font-sans text-xs text-gray-500 leading-relaxed">
              <span className="font-semibold text-navy-950 block mb-1">Methodological Note:</span>
              Estimates are computed by Insightondia contributors leveraging public national accounts, adjusting for structural logistics expansions, digital footprint capital monetization, and sovereign debt service costs.
            </p>
          </div>
        </div>

        {/* SECTION 2: FORECASTING SIMULATOR (5 Cols) */}
        <div className="lg:col-span-5 bg-navy-950 text-white p-8 rounded-xl flex flex-col justify-between shadow-xl" id="forecasting-simulator">
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-gray-400" />
                <h3 className="font-serif text-xl font-medium tracking-tight">
                  Sensitivity Growth Simulator
                </h3>
              </div>
              <button 
                id="reset-simulator-btn"
                onClick={resetSimulator}
                className="text-gray-400 hover:text-white transition-colors p-1"
                title="Reset Parameters"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <p className="font-sans text-xs text-gray-300 leading-relaxed mb-6">
              Simulate output growth for emerging economies by tuning structural fiscal, labor, logistics, and friction parameters below.
            </p>

            {/* Inputs */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-gray-300">Capital Capex (% of GDP)</span>
                  <span className="text-white font-semibold">{capitalInput.toFixed(1)}%</span>
                </div>
                <input 
                  type="range"
                  id="range-capital"
                  min="2"
                  max="12"
                  step="0.5"
                  value={capitalInput}
                  onChange={(e) => setCapitalInput(parseFloat(e.target.value))}
                  className="w-full accent-white bg-gray-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[10px] text-gray-500 block mt-1">Sovereign allocation to infrastructure and capital assets.</span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-gray-300">Labor Productivity (YoY %)</span>
                  <span className="text-white font-semibold">+{laborProductivity.toFixed(1)}%</span>
                </div>
                <input 
                  type="range"
                  id="range-labor"
                  min="0.5"
                  max="7"
                  step="0.1"
                  value={laborProductivity}
                  onChange={(e) => setLaborProductivity(parseFloat(e.target.value))}
                  className="w-full accent-white bg-gray-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[10px] text-gray-500 block mt-1">Workforce efficiency gains driven by technology adoption.</span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-gray-300">Logistics Cost (% of GDP)</span>
                  <span className="text-white font-semibold">{logisticsEfficiency.toFixed(1)}%</span>
                </div>
                <input 
                  type="range"
                  id="range-logistics"
                  min="6"
                  max="18"
                  step="0.5"
                  value={logisticsEfficiency}
                  onChange={(e) => setLogisticsEfficiency(parseFloat(e.target.value))}
                  className="w-full accent-white bg-gray-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[10px] text-gray-500 block mt-1">Frictional transit, storage, and customs costs. (Lower is better)</span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-gray-300">Regulatory Friction (Index 1-10)</span>
                  <span className="text-white font-semibold">{regulationFriction} / 10</span>
                </div>
                <input 
                  type="range"
                  id="range-friction"
                  min="1"
                  max="10"
                  step="1"
                  value={regulationFriction}
                  onChange={(e) => setRegulationFriction(parseInt(e.target.value))}
                  className="w-full accent-white bg-gray-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[10px] text-gray-500 block mt-1">Compliance thresholds, licensing timelines, and labor rigidities.</span>
              </div>
            </div>
          </div>

          {/* Simulated Outputs */}
          <div className="mt-8 pt-6 border-t border-gray-800 bg-gray-900/50 -mx-4 px-4 py-4 rounded-lg">
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-gray-400 mb-3">
              Simulated Sensitivity Outputs (5-Year Window)
            </h4>

            {/* Simulated Path */}
            <div className="grid grid-cols-5 gap-1 mb-4">
              {simulatedForecast.map((data) => (
                <div key={data.year} className="text-center bg-gray-950 p-2 border border-gray-800 rounded">
                  <span className="font-mono text-[9px] text-gray-400 block mb-1">
                    {data.year}
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-semibold text-white block">
                    {data.growthRate}%
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-950 p-3 rounded border border-gray-800">
                <span className="text-[10px] font-mono text-gray-400 block mb-0.5">
                  Capital Output Ratio (ICOR)
                </span>
                <span className="text-lg font-serif font-semibold text-white">
                  {simulatedForecast[4].icor}
                </span>
                <span className="text-[9px] text-gray-500 block leading-tight mt-1">
                  Lower means higher capital deployment efficiency.
                </span>
              </div>

              <div className="bg-gray-950 p-3 rounded border border-gray-800">
                <span className="text-[10px] font-mono text-gray-400 block mb-0.5">
                  Sovereign Competitiveness Index
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-serif font-semibold text-white">
                    {simulatedForecast[4].competitivenessIndex}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">/ 100</span>
                </div>
                <span className="text-[9px] text-gray-500 block leading-tight mt-1">
                  Synthetic ranking index of industrial competence.
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 3: INDUSTRY MATRIX & MARKET INTELLIGENCE (Full Width) */}
      <div className="border-t border-navy-100 pt-12 mt-6" id="industry-matrix-explorer">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 bg-navy-50 text-navy-900 border border-navy-100 rounded">
                <Database className="w-4 h-4" />
              </span>
              <h2 className="font-serif text-2xl font-medium text-navy-950">
                Industry Database & Market Intelligence
              </h2>
            </div>
            <p className="font-sans text-sm text-gray-600">
              Query structural characteristics, barriers, values, and sovereign support levels across critical vertical economic sectors.
            </p>
          </div>

          <div className="relative max-w-sm w-full shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              id="db-search-input"
              placeholder="Search sectors, subsectors..."
              value={dbSearch}
              onChange={(e) => setDbSearch(e.target.value)}
              className="pl-9 pr-4 py-2 w-full text-xs font-mono bg-white border border-gray-200 focus:border-navy-950 focus:outline-none transition-all rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* List panel */}
          <div className="md:col-span-4 border border-navy-100 rounded-lg overflow-hidden divide-y divide-navy-100 h-[360px] overflow-y-auto bg-white">
            {filteredSectors.length > 0 ? (
              filteredSectors.map((sector) => (
                <button
                  key={sector.name}
                  id={`sector-list-btn-${sector.name.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedDbSector(sector)}
                  className={`w-full p-4 text-left font-sans transition-all duration-150 flex items-center justify-between ${
                    selectedDbSector.name === sector.name
                      ? "bg-navy-50"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div>
                    <span className="font-medium text-sm text-navy-950 block">
                      {sector.name}
                    </span>
                    <span className="font-mono text-[10px] text-gray-400 block mt-1">
                      Flow Trend: {sector.capitalFlowTrend}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${selectedDbSector.name === sector.name ? "translate-x-1" : ""}`} />
                </button>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400 font-sans text-sm">
                No industries matching the query.
              </div>
            )}
          </div>

          {/* Details panel */}
          <div className="md:col-span-8 bg-navy-50 border border-navy-100 rounded-lg p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-navy-100 pb-4 mb-6">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-gray-500 block">
                    Macro Sector Profile
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-navy-950">
                    {selectedDbSector.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-gray-500 block">
                    Est. Global Capitalization
                  </span>
                  <span className="font-mono text-sm font-bold text-navy-950">
                    {selectedDbSector.marketCapGlobally}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 block mb-1">
                    Key Segments Covered
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDbSector.subsectors.map((sub) => (
                      <span key={sub} className="px-2 py-0.5 bg-white border border-navy-100 rounded text-xs font-sans text-navy-900">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 block mb-1">
                    Sovereign Subsidy Index
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-semibold text-xs text-navy-950">
                      {selectedDbSector.subsidyLevel}
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 block mb-1">
                    Competitive Moat Structure
                  </span>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    {selectedDbSector.competitiveMoat}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 block mb-1">
                    Primary Risk Vectors
                  </span>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    {selectedDbSector.riskFactor}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-navy-100 flex justify-between items-center text-xs">
              <span className="font-mono text-gray-400">
                Continuous Market Intel Node #9
              </span>
              <a 
                href="#/research" 
                className="text-navy-950 font-semibold hover:underline flex items-center gap-1"
              >
                Request Custom Brief <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
