/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Flame, 
  Sparkles, 
  ArrowRight,
  HeartPulse,
  Info,
  Layers,
  HelpCircle
} from "lucide-react";

interface TrainCargo {
  id: string;
  name: string;
  vintageName: string;
  cargoType: string;
  valueDescription: string;
  manifestQuote: string;
  color: string;
  lightBg: string;
}

const CARGO_DETAILS: Record<string, TrainCargo> = {
  oil: {
    id: "oil",
    name: "Crude Oil",
    vintageName: "Petroleum Distillates",
    cargoType: "Industrial Fluid Gravity",
    valueDescription: "Crude oil acts as the absolute baseline thermodynamic physical input for global transport, trade supply lines, and manufacturing velocity.",
    manifestQuote: "Whosoever controls the flow of petroleum dictates the velocity of physical sovereign expansion.",
    color: "from-slate-800 to-slate-950",
    lightBg: "bg-slate-50 border-slate-200"
  },
  gold: {
    id: "gold",
    name: "Sovereign Gold",
    vintageName: "Specie Bullion Bars",
    cargoType: "Sovereign Vault Reserve",
    valueDescription: "Representing the absolute historic reserve of monetary gravity and sovereign trust when fiat credit contracting waves occur.",
    manifestQuote: "In times of hyper-inflationary deficit, trust collapses back to the heavy yellow metal.",
    color: "from-amber-400 to-yellow-600",
    lightBg: "bg-amber-50/50 border-amber-200"
  },
  bitcoin: {
    id: "bitcoin",
    name: "Bitcoin Ledger",
    vintageName: "Computational Gold",
    cargoType: "Consensus Protocol",
    valueDescription: "A non-sovereign, digital energetic asset anchored by mathematical proofs and the thermodynamic load of decentralized silicon networks.",
    manifestQuote: "A sovereign cryptographic ledger running on the collective heat of infinite global silicon chips.",
    color: "from-orange-500 to-amber-500",
    lightBg: "bg-orange-50/50 border-orange-200"
  },
  health: {
    id: "health",
    name: "Health Insurance",
    vintageName: "Human Life Actuarials",
    cargoType: "Biometric Capital Annuity",
    valueDescription: "Indexed actuarial risk value. The ultimate monetization of human survival parameters, securing capital resilience against physical decay.",
    manifestQuote: "The ultimate commodification of human vitality itself, translating mortality metrics into liquid capital buffers.",
    color: "from-rose-500 to-red-600",
    lightBg: "bg-rose-50/50 border-rose-200"
  }
};

export default function VintageCommodityTrain() {
  const [selectedCargo, setSelectedCargo] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Set up play states dynamically based on state
  const runningStyle = {
    animationPlayState: isPaused ? "paused" : "running"
  };

  return (
    <div className="bg-white text-gray-900 rounded-2xl p-6 md:p-8 space-y-8" id="vintage-train-container">
      
      {/* Editorial Connection Heading */}
      <div className="space-y-3 max-w-4xl border-b border-gray-100 pb-6">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] bg-[#0A1F44] text-white px-2.5 py-1 rounded uppercase font-bold tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            Macroeconomic Infrastructure
          </span>
          <span className="text-[10px] text-gray-400 font-mono tracking-widest">REAL-TIME TRAFFIC FLOW</span>
        </div>
        
        <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#0A1F44] leading-tight tracking-tight">
          The Interconnected Tracks of Capital Gravity
        </h2>
        
        <p className="font-sans text-sm text-gray-500 leading-relaxed max-w-3xl">
          Physical, digital, and actuarial assets do not move in isolation. They are chained together in a singular economic system. 
          Below, our dynamic 3D-perspective locomotive transports these core pillars—<strong className="text-slate-900">Petroleum</strong>, 
          <strong className="text-amber-600">Gold Bullion</strong>, <strong className="text-orange-600">Cryptographical Ledger state</strong>, and 
          <strong className="text-rose-600">Human Life Actuarials</strong>—on the sovereign rails of supply-side velocity.
        </p>
        
        <div className="text-xs text-slate-400 font-mono flex items-center gap-2 pt-1">
          <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
          <span>Hover on desktop or press & hold on mobile to pause the train and inspect the cargo.</span>
        </div>
      </div>

      {/* 3D PERSPECTIVAL WHITE STAGE */}
      <div 
        className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 rounded-xl border border-gray-200/80 h-[240px] overflow-hidden flex flex-col justify-end pb-6 select-none shadow-inner"
        id="train-3d-stage"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Perspectival background landscape grids */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_30px]" />
        
        {/* Subtle horizon line */}
        <div className="absolute top-[30%] inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent pointer-events-none" />

        {/* 3D RAIL TRACKS (Directly on white bg, styled with premium metallic sheen) */}
        <div className="absolute inset-x-0 bottom-6 h-16 pointer-events-none z-10" style={{ perspective: "500px" }}>
          <div className="w-full h-full relative" style={{ transform: "rotateX(32deg) translateY(2px)" }}>
            
            {/* Wooden Sleepers / Ties on the white ground */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-5 w-full bg-[repeating-linear-gradient(90deg,#8b5a2b,#8b5a2b_14px,transparent_14px,transparent_42px)] border-y border-gray-300/40 opacity-80" />
            
            {/* Inner gravel trackbed */}
            <div className="absolute inset-x-0 top-[20%] bottom-[20%] bg-gradient-to-b from-gray-200/50 via-gray-100 to-gray-200/50" />
            
            {/* Left & Right Shining Chrome Steel Rails */}
            <div className="absolute inset-x-0 top-[30%] h-[4px] bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 shadow-sm border-b border-white" />
            <div className="absolute inset-x-0 top-[70%] h-[4px] bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 shadow-sm border-b border-white" />
          </div>
        </div>

        {/* Dynamic Shadow underneath the tracks */}
        <div className="absolute inset-x-0 bottom-2 h-6 bg-gray-900/5 blur-[3px] pointer-events-none z-0" />

        {/* FAST 3D RUNNING TRAIN CONTAINER */}
        <div 
          className="absolute h-[120px] bottom-8 flex items-end animate-trainRun select-none cursor-pointer z-20"
          style={{ 
            animationDuration: "11s", // faster velocity as requested
            minWidth: "1200px",
            ...runningStyle
          }}
        >
          {/* ISOMETRIC/3D STEAM ENGINE LOCOMOTIVE MODEL */}
          <div className="relative w-[190px] h-[110px] shrink-0 flex items-end" id="isometric-3d-locomotive">
            
            {/* Locomotive main 3D metal block */}
            <div className="absolute left-[15px] bottom-[15px] w-[160px] h-[55px] bg-gradient-to-r from-[#0C1524] via-[#1A2E4C] to-[#0C1524] rounded-lg border-t border-r border-[#2C4872] shadow-lg flex items-center justify-end pr-3">
              {/* Gold decorative boiler bands */}
              <div className="absolute left-[30px] top-0 bottom-0 w-1.5 bg-amber-400/80 shadow" />
              <div className="absolute left-[70px] top-0 bottom-0 w-1.5 bg-amber-400/80 shadow" />
              <div className="absolute left-[110px] top-0 bottom-0 w-1.5 bg-amber-400/80 shadow" />
            </div>

            {/* Raised 3D Cabin block with angle */}
            <div className="absolute left-[115px] bottom-[45px] w-[60px] h-[48px] bg-gradient-to-b from-[#1C2D44] to-[#0A1624] rounded-t-md border-t border-x border-[#3E5D87] shadow-lg flex flex-col justify-between p-1.5">
              {/* Overhanging dark roof with 3D shadow */}
              <div className="absolute -top-1.5 left-[-4px] right-[-4px] h-2.5 bg-[#0A1624] rounded shadow-md border-b border-sky-900" />
              
              {/* High-visibility golden-glowing safety glass window */}
              <div className="w-10 h-5 bg-gradient-to-br from-amber-300 to-yellow-500 rounded border border-amber-600 mt-1 mx-auto shadow-[0_0_10px_rgba(245,158,11,0.5)] flex items-center justify-center animate-pulse">
                <span className="text-[7px] text-amber-950 font-bold font-mono">PILOT</span>
              </div>
            </div>

            {/* Elegant steam smoke chimney stack */}
            <div className="absolute left-[35px] bottom-[70px] w-5 h-[35px] bg-gradient-to-b from-[#0A1624] to-[#253B59] rounded-t-md border-x border-[#3E5D87]">
              {/* Brass top rim */}
              <div className="w-7 h-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full absolute -top-1 left-[-4px] border-b border-amber-600 shadow" />
            </div>

            {/* 3D Cow Catcher grill nose on front */}
            <div className="absolute left-[-2px] bottom-[15px] w-[20px] h-[28px] bg-gradient-to-br from-[#1C2D44] to-[#0A1624] rounded-bl-lg origin-top-left -skew-x-12 border-b-2 border-amber-500 shadow-md" />

            {/* Under-chassis dark machinery shadow */}
            <div className="absolute left-[10px] bottom-[5px] w-[165px] h-[12px] bg-slate-950/90 rounded-sm" />

            {/* HIGH-RES SPINNING WHEELS (With coupled rod animation matching play state) */}
            {/* Wheel 1 */}
            <div 
              className="absolute left-[28px] bottom-[0px] w-9 h-9 rounded-full bg-[#05070B] border-4 border-amber-500 flex items-center justify-center shadow-lg"
              style={{ 
                animation: "spin 1.2s linear infinite",
                ...runningStyle
              }}
            >
              <div className="w-1 h-7 bg-amber-400/80 rounded" />
              <div className="w-7 h-1 bg-amber-400/80 rounded absolute" />
            </div>

            {/* Wheel 2 */}
            <div 
              className="absolute left-[78px] bottom-[0px] w-9 h-9 rounded-full bg-[#05070B] border-4 border-amber-500 flex items-center justify-center shadow-lg"
              style={{ 
                animation: "spin 1.2s linear infinite",
                ...runningStyle
              }}
            >
              <div className="w-1 h-7 bg-amber-400/80 rounded" />
              <div className="w-7 h-1 bg-amber-400/80 rounded absolute" />
            </div>

            {/* Wheel 3 */}
            <div 
              className="absolute left-[128px] bottom-[0px] w-9 h-9 rounded-full bg-[#05070B] border-4 border-amber-500 flex items-center justify-center shadow-lg"
              style={{ 
                animation: "spin 1.2s linear infinite",
                ...runningStyle
              }}
            >
              <div className="w-1 h-7 bg-amber-400/80 rounded" />
              <div className="w-7 h-1 bg-amber-400/80 rounded absolute" />
            </div>

            {/* Connecting piston crank rod */}
            <div 
              className="absolute left-[34px] bottom-[14px] w-[104px] h-2 bg-gradient-to-r from-gray-200 to-gray-400 border border-gray-500 rounded-full shadow-md"
              style={{ 
                animation: "pistonRod 1.2s infinite linear",
                transformOrigin: "left center",
                ...runningStyle
              }}
            />
          </div>

          {/* HEAVY CARRIAGE CONNECTING LINK */}
          <div className="w-5 h-2 bg-[#0A1624] mb-[18px] shrink-0 shadow-inner" />

          {/* CAR 1: CRUDE OIL CARRIAGE */}
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedCargo(selectedCargo === "oil" ? null : "oil"); }}
            className={`relative w-[155px] h-[85px] shrink-0 bg-white border-y border-x border-gray-200 rounded-t-xl p-2 transition-all text-left shadow-md hover:border-[#0A1F44] ${
              selectedCargo === "oil" ? "ring-2 ring-[#0A1F44] scale-[1.04]" : ""
            }`}
          >
            <div className="text-[7px] font-mono text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1 mb-1.5 flex justify-between">
              <span>LEDGER #O-4</span>
              <span className="text-emerald-500 font-bold">ACTIVE</span>
            </div>

            {/* 3D Cargo Payload Model on Flatbed */}
            <div className="absolute -top-4 left-4 flex gap-1.5 items-end">
              {/* Premium Oil Tank cylinders */}
              <div className="w-24 h-9 bg-gradient-to-b from-slate-800 to-slate-950 border border-slate-700 rounded-full shadow-md flex items-center justify-around px-2">
                <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
                <span className="font-mono text-[7px] text-gray-300 tracking-wider">OIL CRUDE</span>
              </div>
            </div>

            <div className="pt-2.5 text-center">
              <span className="font-serif text-xs font-bold text-[#0A1F44] block">Petroleum</span>
              <span className="font-mono text-[8px] text-gray-500 block mt-0.5">$82.40 USD / bbl</span>
            </div>

            {/* Chrome spinning wheels */}
            <div 
              className="absolute left-5 -bottom-2 w-5 h-5 rounded-full bg-slate-900 border-2 border-gray-300"
              style={{ animation: "spin 1.2s linear infinite", ...runningStyle }}
            />
            <div 
              className="absolute right-5 -bottom-2 w-5 h-5 rounded-full bg-slate-900 border-2 border-gray-300"
              style={{ animation: "spin 1.2s linear infinite", ...runningStyle }}
            />
          </button>

          {/* HEAVY CARRIAGE CONNECTING LINK */}
          <div className="w-5 h-2 bg-[#0A1624] mb-[18px] shrink-0 shadow-inner" />

          {/* CAR 2: SOVEREIGN GOLD CARRIAGE */}
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedCargo(selectedCargo === "gold" ? null : "gold"); }}
            className={`relative w-[155px] h-[85px] shrink-0 bg-white border-y border-x border-gray-200 rounded-t-xl p-2 transition-all text-left shadow-md hover:border-amber-500 ${
              selectedCargo === "gold" ? "ring-2 ring-amber-500 scale-[1.04]" : ""
            }`}
          >
            <div className="text-[7px] font-mono text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1 mb-1.5 flex justify-between">
              <span>LEDGER #G-7</span>
              <span className="text-amber-500 font-bold">SECURE</span>
            </div>

            {/* Shiny 3D Stack of Gold Bullion Blocks */}
            <div className="absolute -top-5 left-5 flex flex-col gap-0.5 items-center">
              <div className="flex gap-1">
                <div className="w-7 h-3.5 bg-gradient-to-b from-yellow-300 to-amber-500 rounded border border-yellow-600 shadow-md" />
                <div className="w-7 h-3.5 bg-gradient-to-b from-yellow-300 to-amber-500 rounded border border-yellow-600 shadow-md" />
              </div>
              <div className="w-12 h-3 bg-gradient-to-b from-yellow-400 to-amber-600 rounded border border-yellow-700 shadow-lg" />
            </div>

            <div className="pt-2.5 text-center">
              <span className="font-serif text-xs font-bold text-[#0A1F44] block">Sovereign Gold</span>
              <span className="font-mono text-[8px] text-amber-600 block mt-0.5">$2,428.15 Spot</span>
            </div>

            {/* Chrome spinning wheels */}
            <div 
              className="absolute left-5 -bottom-2 w-5 h-5 rounded-full bg-slate-900 border-2 border-gray-300"
              style={{ animation: "spin 1.2s linear infinite", ...runningStyle }}
            />
            <div 
              className="absolute right-5 -bottom-2 w-5 h-5 rounded-full bg-slate-900 border-2 border-gray-300"
              style={{ animation: "spin 1.2s linear infinite", ...runningStyle }}
            />
          </button>

          {/* HEAVY CARRIAGE CONNECTING LINK */}
          <div className="w-5 h-2 bg-[#0A1624] mb-[18px] shrink-0 shadow-inner" />

          {/* CAR 3: BITCOIN LEDGER CARRIAGE */}
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedCargo(selectedCargo === "bitcoin" ? null : "bitcoin"); }}
            className={`relative w-[155px] h-[85px] shrink-0 bg-white border-y border-x border-gray-200 rounded-t-xl p-2 transition-all text-left shadow-md hover:border-orange-500 ${
              selectedCargo === "bitcoin" ? "ring-2 ring-orange-500 scale-[1.04]" : ""
            }`}
          >
            <div className="text-[7px] font-mono text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1 mb-1.5 flex justify-between">
              <span>LEDGER #B-21</span>
              <span className="text-orange-500 font-bold">CRYPTO</span>
            </div>

            {/* 3D Cryptographical computing pod structure */}
            <div className="absolute -top-5 left-10 flex justify-center">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 border-2 border-orange-300 shadow-lg flex items-center justify-center transform rotate-12">
                <span className="font-mono font-bold text-white text-base">₿</span>
              </div>
            </div>

            <div className="pt-2.5 text-center">
              <span className="font-serif text-xs font-bold text-[#0A1F44] block">Computational</span>
              <span className="font-mono text-[8px] text-orange-600 block mt-0.5">$64,810 BTC</span>
            </div>

            {/* Chrome spinning wheels */}
            <div 
              className="absolute left-5 -bottom-2 w-5 h-5 rounded-full bg-slate-900 border-2 border-gray-300"
              style={{ animation: "spin 1.2s linear infinite", ...runningStyle }}
            />
            <div 
              className="absolute right-5 -bottom-2 w-5 h-5 rounded-full bg-slate-900 border-2 border-gray-300"
              style={{ animation: "spin 1.2s linear infinite", ...runningStyle }}
            />
          </button>

          {/* HEAVY CARRIAGE CONNECTING LINK */}
          <div className="w-5 h-2 bg-[#0A1624] mb-[18px] shrink-0 shadow-inner" />

          {/* CAR 4: HEALTH INSURANCE CARGO */}
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedCargo(selectedCargo === "health" ? null : "health"); }}
            className={`relative w-[155px] h-[85px] shrink-0 bg-white border-y border-x border-gray-200 rounded-t-xl p-2 transition-all text-left shadow-md hover:border-rose-500 ${
              selectedCargo === "health" ? "ring-2 ring-rose-500 scale-[1.04]" : ""
            }`}
          >
            <div className="text-[7px] font-mono text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1 mb-1.5 flex justify-between">
              <span>ACTUARIAL</span>
              <span className="text-rose-500 font-bold">BIOMETRIC</span>
            </div>

            {/* Actuarial Biometric medical pods */}
            <div className="absolute -top-5 left-8 flex gap-1">
              <div className="w-14 h-9 bg-gradient-to-r from-rose-500 to-red-600 border border-rose-400 rounded-lg shadow-lg flex items-center justify-center relative">
                <HeartPulse className="w-4.5 h-4.5 text-white animate-pulse" />
                <span className="absolute bottom-0.5 right-1 text-[5px] text-white font-mono">RISK</span>
              </div>
            </div>

            <div className="pt-2.5 text-center">
              <span className="font-serif text-xs font-bold text-[#0A1F44] block">Life Actuarials</span>
              <span className="font-mono text-[8px] text-rose-500 block mt-0.5">Premium Hedge</span>
            </div>

            {/* Chrome spinning wheels */}
            <div 
              className="absolute left-5 -bottom-2 w-5 h-5 rounded-full bg-slate-900 border-2 border-gray-300"
              style={{ animation: "spin 1.2s linear infinite", ...runningStyle }}
            />
            <div 
              className="absolute right-5 -bottom-2 w-5 h-5 rounded-full bg-slate-900 border-2 border-gray-300"
              style={{ animation: "spin 1.2s linear infinite", ...runningStyle }}
            />
          </button>

        </div>

      </div>

      {/* MANIFEST DETAIL BOX (Crisp white background to fit the core color scheme) */}
      {selectedCargo ? (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 animate-fadeIn space-y-4 relative z-30" id="cargo-manifest-details">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-3">
            <div>
              <span className="font-mono text-[9px] bg-[#0A1F44] text-white px-2.5 py-1 rounded uppercase font-bold">
                COMMODITY INDEX MANIFEST SECURE
              </span>
              <h4 className="font-serif text-xl font-bold text-[#0A1F44] mt-1">
                {CARGO_DETAILS[selectedCargo].vintageName} ({CARGO_DETAILS[selectedCargo].name})
              </h4>
            </div>
            
            <div className="text-right">
              <span className="font-mono text-[9px] text-gray-400 uppercase block">INTEGRATION PEERS</span>
              <span className="font-serif text-sm font-semibold text-[#0A1F44]">
                {CARGO_DETAILS[selectedCargo].cargoType}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Descriptive values */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <span className="font-mono text-[9px] text-gray-400 uppercase font-bold block">
                  Diagnostic Parameter Breakdown
                </span>
                <p className="font-sans text-sm text-gray-700 leading-relaxed mt-1">
                  {CARGO_DETAILS[selectedCargo].valueDescription}
                </p>
              </div>

              <div className="border-l-2 border-[#0A1F44] pl-3.5">
                <span className="font-mono text-[9px] text-gray-400 uppercase font-bold block">
                  Policy Inference Memo
                </span>
                <p className="font-serif italic text-xs text-gray-600 leading-relaxed mt-1">
                  "{CARGO_DETAILS[selectedCargo].manifestQuote}"
                </p>
              </div>
            </div>

            {/* Quick visual stat box */}
            <div className="md:col-span-4 bg-white border border-gray-200 rounded-lg p-5 text-center shadow-sm">
              <span className="font-mono text-[9px] text-gray-400 uppercase block mb-1">AGGREGATE WEIGHTING</span>
              <span className="font-serif text-3xl font-extrabold text-[#0A1F44] block">
                {selectedCargo === "oil" && "+42.5% YoY"}
                {selectedCargo === "gold" && "99.8% Core"}
                {selectedCargo === "bitcoin" && "Ledger Limit"}
                {selectedCargo === "health" && "Premium Delta"}
              </span>
              <span className="font-mono text-[8px] text-gray-400 uppercase block mt-1.5">INTEGRATED COMMODITIES MODEL</span>
            </div>

          </div>

          <div className="flex justify-end pt-2">
            <button 
              onClick={() => setSelectedCargo(null)}
              className="text-[10px] font-mono uppercase text-gray-500 hover:text-black hover:underline flex items-center gap-1"
            >
              Close Manifest Details <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      ) : null}

    </div>
  );
}
