/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { 
  Sliders, 
  RefreshCw, 
  ArrowRight, 
  Info, 
  Sparkles, 
  TrendingUp, 
  ShieldAlert, 
  Coins, 
  Zap, 
  Layers, 
  ChevronRight 
} from "lucide-react";

// Sector configurations with custom economic equations & insights
interface SectorConfig {
  id: string;
  name: string;
  icon: string;
  baseInflow: number; // in $ Billions
  baseFriction: number; // 1-10
  description: string;
  treasuryQuote: string;
  vectors: {
    inflow: string;
    outflow: string;
    regulation: string;
  };
  getMetrics: (subsidy: number, restraint: number, skilling: number) => {
    productivity: number; // multiplier
    deficit: number; // % of GDP
    employment: number; // % change
    attraction: number; // % YoY
    riskLevel: "Low" | "Medium" | "High";
    insight: string;
  };
}

const SECTOR_CONFIGS: Record<string, SectorConfig> = {
  Technology: {
    id: "Technology",
    name: "Technology & AI",
    icon: "Zap",
    baseInflow: 480,
    baseFriction: 3,
    description: "Algorithmic expansion, high-performance compute architecture, and foundational AI model clusters.",
    treasuryQuote: "Compute-capital represents the modern oil reserves. Sovereignties that fail to subsidize GPU clustering forfeit digital autonomy.",
    vectors: {
      inflow: "Private Venture Funds & Global Cloud CAPEX",
      outflow: "Sovereign Compute Leases & Talent Remittances",
      regulation: "Compute Licensing & Export Restraints"
    },
    getMetrics: (subsidy, restraint, skilling) => {
      const productivity = 1.0 + (subsidy * 0.05) + (skilling * 0.03) - (restraint * 0.02);
      const attraction = 12 + (subsidy * 1.8) - (restraint * 2.2);
      const deficit = -(2.1 + (subsidy * 0.35) - (restraint * 0.1));
      const employment = -4.5 + (skilling * 1.5) + (subsidy * 0.4) - (restraint * 0.2);
      
      let riskLevel: "Low" | "Medium" | "High" = "Medium";
      if (restraint < 3 && subsidy > 6) riskLevel = "High"; // Bubbles / structural displacement
      else if (skilling > 6) riskLevel = "Low";

      let insight = "";
      if (restraint > 7) {
        insight = "High regulatory restraint stifles technological venture activity. While sovereign hazard is mitigated, capital flight to computational havens is estimated at 18.5% of total cloud venture CAPEX.";
      } else if (subsidy > 7 && skilling < 4) {
        insight = "Heavy direct compute subsidies without proportional labor up-skilling create severe structural friction: productivity rises, but labor displacement leads to severe domestic inequality.";
      } else if (skilling > 7) {
        insight = "Advanced labor adaptation grants are successfully channeling technological productivity gains back into domestic median wages, yielding a highly stable, high-velocity digital economy.";
      } else {
        insight = "Capital and talent flows are moderately aligned. Incremental subsidies to compute clusters are yielding healthy organic productivity multipliers without destabilizing regional job markets.";
      }

      return { productivity, deficit, employment, attraction, riskLevel, insight };
    }
  },
  Energy: {
    id: "Energy",
    name: "Energy Transition",
    icon: "TrendingUp",
    baseInflow: 350,
    baseFriction: 5,
    description: "Sovereign grid decarbonization, ultra-scale utility storage, and hydrogen reduction infrastructure.",
    treasuryQuote: "The energy transition is not a supply problem; it is a leveraged capital pricing problem. High interest rates are the real carbon tax.",
    vectors: {
      inflow: "Sovereign Green Bonds & Infrastructure Credit",
      outflow: "Mineral Procurement & Grid Congestion Penalties",
      regulation: "Grid Access Approvals & Decarbonization Mandates"
    },
    getMetrics: (subsidy, restraint, skilling) => {
      const productivity = 1.0 + (subsidy * 0.03) + (skilling * 0.01) - (restraint * 0.01);
      const attraction = 8 + (subsidy * 2.5) - (restraint * 1.5);
      const deficit = -(3.5 + (subsidy * 0.55) - (restraint * 0.2));
      const employment = 1.2 + (subsidy * 0.5) + (skilling * 0.6) - (restraint * 0.3);
      
      let riskLevel: "Low" | "Medium" | "High" = "Medium";
      if (subsidy > 8 && restraint < 3) riskLevel = "High"; // Fiscal overhang
      else if (subsidy > 4 && restraint > 4) riskLevel = "Low";

      let insight = "";
      if (subsidy > 8) {
        insight = "Massive infrastructure tax credits are driving record green venture attraction, but fiscal deficit margins are deteriorating rapidly, creating structural interest rate headwinds.";
      } else if (restraint > 7) {
        insight = "Severe permitting bottle-necks and compliance checks cancel out state subsidies. Interconnection queues are averaging 6.4 years, leaving major private capital pools locked on the sidelines.";
      } else if (skilling > 6 && subsidy > 4) {
        insight = "A synchronized grid-skills framework ensures efficient capital absorption. High productivity and low installation failure rates create an exemplary regional energy transition corridor.";
      } else {
        insight = "Decarbonization is proceeding at a baseline pace. Moderate grid-connection friction exists, but sovereign bonds remain highly attractive to global institutional ESG funds.";
      }

      return { productivity, deficit, employment, attraction, riskLevel, insight };
    }
  },
  Trade: {
    id: "Trade",
    name: "Supply Chains & Trade",
    icon: "Layers",
    baseInflow: 290,
    baseFriction: 6,
    description: "Near-shoring trade lanes, multi-modal dry port terminals, and strategic mineral custody routes.",
    treasuryQuote: "Global trade is bifurcating into trusted economic corridors. Geography is being replaced by alignment as the primary pricing factor.",
    vectors: {
      inflow: "Multinational Relocation CAPEX & Trade Financing",
      outflow: "Tariff Escrow Surcharges & Port Logistical Leaks",
      regulation: "Bilateral Sanctions, Local Content Rules & Tariffs"
    },
    getMetrics: (subsidy, restraint, skilling) => {
      const productivity = 1.0 + (subsidy * 0.02) - (restraint * 0.03) + (skilling * 0.01);
      const attraction = 5 + (subsidy * 1.5) - (restraint * 3.0);
      const deficit = -(1.8 + (subsidy * 0.25) - (restraint * 0.3)); // Tariffs can generate direct revenue!
      const employment = 0.5 + (subsidy * 0.3) - (restraint * 0.5) + (skilling * 0.4);
      
      let riskLevel: "Low" | "Medium" | "High" = "Low";
      if (restraint > 7) riskLevel = "High"; // Logistical gridlock / supply shock
      else if (subsidy > 4 && restraint > 3) riskLevel = "Medium";

      let insight = "";
      if (restraint > 8) {
        insight = "Symmetric tariff retaliations and aggressive local-content mandates have choked trade throughput. Retaliatory measures represent a direct 2.4% contraction in sovereign trading capacity.";
      } else if (subsidy > 7 && restraint < 3) {
        insight = "Subsidizing trade zones with minimal border friction has supercharged global re-routing. However, excessive reliance on foreign intermediates creates significant supply-chain fragility.";
      } else if (skilling > 5 && restraint > 4) {
        insight = "Sovereign near-shoring policies have effectively insulated core manufacturing. Domestic supply integration is deep, mitigating geopolitical supply-chain vulnerabilities.";
      } else {
        insight = "Logistical corridors remain stable. Port clearances and capital repatriation rules are in equilibrium, maintaining steady integration with global maritime logistics networks.";
      }

      return { productivity, deficit, employment, attraction, riskLevel, insight };
    }
  },
  Climate: {
    id: "Climate",
    name: "Climate & Agriculture",
    icon: "Coins",
    baseInflow: 180,
    baseFriction: 4,
    description: "Adaptive crop genetics, regional groundwater credit ledgers, and carbon footprint reduction models.",
    treasuryQuote: "A 1.5°C temperature rise is not just an environmental threshold; it is a structural supply-side inflation multiplier that devalues sovereign capital assets.",
    vectors: {
      inflow: "Climate Adaptation Grants & Carbon Offsets",
      outflow: "Crop Failures, Arable Land Losses & Insurance Write-downs",
      regulation: "Sovereign Water Allocation Rules & Pesticide Codes"
    },
    getMetrics: (subsidy, restraint, skilling) => {
      const productivity = 1.0 + (subsidy * 0.015) + (skilling * 0.02) - (restraint * 0.005);
      const attraction = 3 + (subsidy * 1.2) - (restraint * 0.5);
      const deficit = -(1.2 + (subsidy * 0.2) - (restraint * 0.05));
      const employment = 0.8 + (subsidy * 0.2) + (skilling * 0.5);
      
      let riskLevel: "Low" | "Medium" | "High" = "Low";
      if (subsidy < 3 && restraint < 3) riskLevel = "High"; // Severe climate shock risk
      else if (subsidy > 5) riskLevel = "Low";

      let insight = "";
      if (subsidy < 3 && restraint < 3) {
        insight = "Critical under-investment in climate adaptation leaves agricultural yield exposed to extreme weather shocks. Soil degradation and water table depletion risk driving a 15% local food price hike.";
      } else if (subsidy > 7) {
        insight = "Substantial state funding for genetic crops and efficient micro-irrigation is stabilizing farm yields. Global ESG index inclusion is up, attracting premium climate-finance pools.";
      } else {
        insight = "Sovereign crop-insurance schemes are keeping credit lines open for rural cooperatives. Gradual modernization of food supply chains provides stable, resilient regional supply lines.";
      }

      return { productivity, deficit, employment, attraction, riskLevel, insight };
    }
  }
};

export default function CapitalGravitySandbox() {
  const [selectedSector, setSelectedSector] = useState<string>("Technology");
  
  // Interactive policy levers
  const [subsidy, setSubsidy] = useState<number>(5); // 0 to 10 (Sovereign Subsidy Rate)
  const [restraint, setRestraint] = useState<number>(4); // 0 to 10 (Regulatory Restraint Score)
  const [skilling, setSkilling] = useState<number>(5); // 0 to 10 (Labor Adaptability Support)

  // Memoized dynamic variables based on chosen levers
  const activeSector = useMemo(() => SECTOR_CONFIGS[selectedSector] || SECTOR_CONFIGS.Technology, [selectedSector]);
  const metrics = useMemo(() => {
    return activeSector.getMetrics(subsidy, restraint, skilling);
  }, [activeSector, subsidy, restraint, skilling]);

  const handleResetLevers = () => {
    setSubsidy(5);
    setRestraint(4);
    setSkilling(5);
  };

  // Helper for rendering particles along lines with custom speeds
  // Faster speed when subsidy is high, slower when restraint is high
  const flowSpeed = useMemo(() => {
    const base = 8; // seconds
    const diff = (subsidy * 0.5) - (restraint * 0.4);
    return Math.max(2, Math.min(15, base - diff));
  }, [subsidy, restraint]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm p-6 sm:p-8 space-y-8" id="capital-gravity-sandbox">
      
      {/* Header and intro */}
      <div className="border-b border-gray-100 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#0A1F44] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#0A1F44] font-bold">
              Interactive Capital Gravity Model
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A]">
            Macroeconomic Policy <span className="italic">Sandbox</span>
          </h2>
          <p className="font-sans text-sm text-gray-500 max-w-2xl">
            Simulate how state subsidies, regulatory friction, and human-capital upskilling interact to dictate international capital gravity and structural yield.
          </p>
        </div>

        <button 
          onClick={handleResetLevers}
          className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 hover:text-black hover:bg-gray-50 text-xs font-mono tracking-widest uppercase transition-all rounded"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Parameters
        </button>
      </div>

      {/* Grid: Levers and Visual Flow Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Sector Selection & Control Levers (5 cols) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Sector Tabs */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
                Select Macro Sector
              </span>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(SECTOR_CONFIGS).map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setSelectedSector(sec.id);
                    }}
                    className={`flex items-center justify-between p-3 text-left border rounded-lg transition-all ${
                      selectedSector === sec.id
                        ? "border-[#0A1F44] bg-[#0A1F44]/5 text-[#0A1F44] font-semibold"
                        : "border-gray-100 hover:border-gray-300 text-gray-500"
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-serif">{sec.name}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${selectedSector === sec.id ? "translate-x-0.5 text-[#0A1F44]" : "text-gray-300"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 1: Subsidy Rate */}
            <div className="space-y-2 p-4 bg-gray-50 border border-gray-100 rounded-lg">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-amber-600" />
                  Sovereign Subsidy Rate
                </label>
                <span className="font-mono text-xs font-bold text-[#0A1F44]">
                  {subsidy * 10}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={subsidy}
                onChange={(e) => setSubsidy(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0A1F44]"
              />
              <p className="text-[11px] text-gray-400 leading-normal">
                Direct state aid, tax write-offs, and structural supply grants. Higher rate draws capital but drains the Treasury.
              </p>
            </div>

            {/* Slider 2: Regulatory Restraint */}
            <div className="space-y-2 p-4 bg-gray-50 border border-gray-100 rounded-lg">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  Regulatory Restraint
                </label>
                <span className="font-mono text-xs font-bold text-[#0A1F44]">
                  Score {restraint}/10
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={restraint}
                onChange={(e) => setRestraint(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0A1F44]"
              />
              <p className="text-[11px] text-gray-400 leading-normal">
                Anti-trust rules, licensing bottlenecks, security audits, and capital controls. High rates decrease systemic risk but stall velocity.
              </p>
            </div>

            {/* Slider 3: Labor Up-Skilling */}
            <div className="space-y-2 p-4 bg-gray-50 border border-gray-100 rounded-lg">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  Labor Adaptability Support
                </label>
                <span className="font-mono text-xs font-bold text-[#0A1F44]">
                  Score {skilling}/10
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={skilling}
                onChange={(e) => setSkilling(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0A1F44]"
              />
              <p className="text-[11px] text-gray-400 leading-normal">
                Transition allowances, state-mentored up-skilling academies, and geographical labor relocation grants. Protects median wages.
              </p>
            </div>

          </div>

          <div className="border-t border-gray-100 pt-4 mt-4 hidden lg:block">
            <p className="font-serif italic text-xs text-gray-400 leading-relaxed">
              "{activeSector.treasuryQuote}"
            </p>
          </div>
        </div>

        {/* Right Column: Interactive SVG Flow Canvas & Outcome Gauges (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between border-l border-gray-100 lg:pl-8 gap-6">
          
          {/* Real-time Flow Canvas */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
              Active Gravity Flow Canvas (Live Network Particle Simulation)
            </span>
            <div className="relative h-[230px] bg-[#0A1F44] rounded-xl overflow-hidden shadow-inner flex items-center justify-center p-4">
              
              {/* Particle flow SVG */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Background Grid Pattern */}
                <defs>
                  <pattern id="sandbox-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#sandbox-grid)" />

                {/* Flow lines with dynamic speed using stroke-dashoffset */}
                {/* 1. Global Capital Source to Sovereign Treasury */}
                <path 
                  id="flow-treasury"
                  d="M 40,115 Q 160,50 280,75" 
                  fill="none" 
                  stroke="rgba(251, 191, 36, 0.25)" 
                  strokeWidth="3" 
                  strokeDasharray="6 8"
                  style={{
                    animation: `dash ${flowSpeed}s linear infinite`
                  }}
                />
                
                {/* 2. Global Capital Source to Private Innovation Node */}
                <path 
                  id="flow-innovation"
                  d="M 40,115 Q 160,115 280,115" 
                  fill="none" 
                  stroke="rgba(14, 165, 233, 0.25)" 
                  strokeWidth="3" 
                  strokeDasharray="6 8"
                  style={{
                    animation: `dash ${flowSpeed * 0.9}s linear infinite`
                  }}
                />

                {/* 3. Global Capital Source to Labor / Society Node */}
                <path 
                  id="flow-labor"
                  d="M 40,115 Q 160,180 280,155" 
                  fill="none" 
                  stroke="rgba(16, 185, 129, 0.25)" 
                  strokeWidth="3" 
                  strokeDasharray="6 8"
                  style={{
                    animation: `dash ${flowSpeed * 1.2}s linear infinite`
                  }}
                />

                {/* Nodes on Top */}
                {/* Source Node */}
                <circle cx="40" cy="115" r="16" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                
                {/* Destination Node 1: Treasury */}
                <circle 
                  cx="280" 
                  cy="75" 
                  r={12 + (subsidy * 0.6)} 
                  className="transition-all duration-300"
                  fill="#78350f" 
                  stroke="#fbbf24" 
                  strokeWidth="2" 
                />
                
                {/* Destination Node 2: Corporate Sector */}
                <circle 
                  cx="280" 
                  cy="115" 
                  r={12 + (Math.max(1, 10 - restraint) * 0.6)} 
                  className="transition-all duration-300"
                  fill="#0369a1" 
                  stroke="#38bdf8" 
                  strokeWidth="2" 
                />

                {/* Destination Node 3: Labor Force */}
                <circle 
                  cx="280" 
                  cy="155" 
                  r={12 + (skilling * 0.6)} 
                  className="transition-all duration-300"
                  fill="#064e3b" 
                  stroke="#34d399" 
                  strokeWidth="2" 
                />
              </svg>

              {/* Text labels absolute overlays */}
              <div className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#1A1A1A]/80 border border-gray-700 px-2 py-1 rounded text-[9px] font-mono text-gray-300 text-center w-[85px]">
                <span className="block text-white font-bold uppercase tracking-wider">SOURCE</span>
                Global Capital
              </div>

              <div className="absolute right-4 top-[50px] bg-[#1A1A1A]/80 border border-gray-700 px-2 py-1 rounded text-[9px] font-mono text-amber-300 w-[110px]">
                <span className="block text-white font-bold uppercase tracking-wider">TREASURY</span>
                Direct Subsidy
              </div>

              <div className="absolute right-4 top-[98px] bg-[#1A1A1A]/80 border border-gray-700 px-2 py-1 rounded text-[9px] font-mono text-sky-300 w-[110px]">
                <span className="block text-white font-bold uppercase tracking-wider">ENTERPRISE</span>
                Market Capitalization
              </div>

              <div className="absolute right-4 top-[146px] bg-[#1A1A1A]/80 border border-gray-700 px-2 py-1 rounded text-[9px] font-mono text-emerald-300 w-[110px]">
                <span className="block text-white font-bold uppercase tracking-wider">LABOR INDEX</span>
                Domestic Resiliency
              </div>

              {/* Real-time systemic velocity HUD top right */}
              <div className="absolute top-3 left-3 bg-[#1A1A1A]/90 border border-gray-800 px-3 py-1.5 rounded-lg text-left font-mono">
                <span className="text-[9px] uppercase tracking-wider text-gray-400 block">SYSTEM VELOCITY</span>
                <span className="text-xs font-bold text-[#fbbf24]">
                  {((flowSpeed) ? (10 / flowSpeed).toFixed(1) : 1.2)}x Standard Stream
                </span>
              </div>

              {/* Status flag bottom left */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-[#1A1A1A]/90 border border-gray-800 px-2.5 py-1 rounded text-[9px] font-mono">
                <span className="block h-2 w-2 rounded-full" style={{
                  backgroundColor: metrics.riskLevel === "Low" ? "#10b981" : metrics.riskLevel === "Medium" ? "#f59e0b" : "#ef4444"
                }} />
                <span className="text-gray-300 uppercase">System Risk: {metrics.riskLevel}</span>
              </div>
            </div>
            
            {/* Embedded custom CSS animation inside JSX for compatibility */}
            <style>{`
              @keyframes dash {
                to {
                  stroke-dashoffset: -100;
                }
              }
            `}</style>
          </div>

          {/* Outcome Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="border border-gray-100 rounded-lg p-3 bg-gray-50 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                Productivity Multiplier
              </span>
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#0A1F44] tracking-tight">
                {metrics.productivity.toFixed(2)}x
              </span>
              <span className="text-[9px] font-mono text-emerald-600 block mt-1">
                +{((metrics.productivity - 1.0) * 100).toFixed(0)}% output gain
              </span>
            </div>

            <div className="border border-gray-100 rounded-lg p-3 bg-gray-50 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                Sovereign Net Pull
              </span>
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#0A1F44] tracking-tight">
                {metrics.attraction > 0 ? `+${metrics.attraction.toFixed(1)}` : metrics.attraction.toFixed(1)}%
              </span>
              <span className="text-[9px] font-mono text-gray-400 block mt-1">
                Private CAPEX growth
              </span>
            </div>

            <div className="border border-gray-100 rounded-lg p-3 bg-gray-50 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                Fiscal Balance Impact
              </span>
              <span className="text-xl sm:text-2xl font-serif font-bold text-rose-600 tracking-tight">
                {metrics.deficit.toFixed(1)}%
              </span>
              <span className="text-[9px] font-mono text-gray-400 block mt-1">
                Sovereign GDP deficit
              </span>
            </div>

            <div className="border border-gray-100 rounded-lg p-3 bg-gray-50 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                Resilience & Jobs
              </span>
              <span className={`text-xl sm:text-2xl font-serif font-bold tracking-tight ${metrics.employment >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                {metrics.employment > 0 ? `+${metrics.employment.toFixed(1)}` : metrics.employment.toFixed(1)}%
              </span>
              <span className="text-[9px] font-mono text-gray-400 block mt-1">
                Wage index shift
              </span>
            </div>

          </div>

          {/* Dynamically Generated Executive Insight Memorandum */}
          <div className="p-4 bg-[#0A1F44]/5 border border-[#0A1F44]/10 rounded-lg space-y-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#0A1F44]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#0A1F44] font-bold">
                Economic Advisory Note
              </span>
            </div>
            <p className="font-serif text-xs sm:text-sm text-[#1A1A1A] leading-relaxed italic">
              "{metrics.insight}"
            </p>
            <div className="pt-2 border-t border-[#0A1F44]/10 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] font-mono text-gray-500">
              <div><span className="font-bold text-[#0A1F44]">Inflow Target:</span> {activeSector.vectors.inflow}</div>
              <div><span className="font-bold text-[#0A1F44]">Leakage Vector:</span> {activeSector.vectors.outflow}</div>
              <div><span className="font-bold text-[#0A1F44]">Friction Channel:</span> {activeSector.vectors.regulation}</div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
