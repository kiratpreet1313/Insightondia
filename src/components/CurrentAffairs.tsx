/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { CURRENT_AFFAIRS_ANALYSIS } from "../data";
import { ArrowRight, HelpCircle, UserCheck, ShieldAlert, Coins, Lightbulb } from "lucide-react";

export default function CurrentAffairs() {
  const [selectedAnalysis, setSelectedAnalysis] = useState(
    CURRENT_AFFAIRS_ANALYSIS.length > 0 ? CURRENT_AFFAIRS_ANALYSIS[0] : null
  );

  return (
    <div className="w-full bg-white text-navy-900" id="current-affairs-analysis-hub">
      {/* Editorial Title */}
      <div className="border-b border-navy-100 py-12 mb-10">
        <span className="font-mono text-xs tracking-widest text-gray-500 uppercase block mb-3">
          Insightondia Weekly Geopolitical & Sovereign Briefings
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-navy-950 mb-4">
          Current Affairs & Structural Decoders
        </h1>
        <p className="font-sans text-gray-600 max-w-3xl leading-relaxed text-lg">
          We do not report headlines. We isolate raw political-economic events and trace their structural repercussions across industries, state budgets, consumer baskets, and global capital flows.
        </p>
      </div>

      {CURRENT_AFFAIRS_ANALYSIS.length === 0 || !selectedAnalysis ? (
        <div className="border-2 border-dashed border-navy-200 rounded-xl p-12 text-center max-w-2xl mx-auto my-12 bg-navy-50/50">
          <span className="font-mono text-xs uppercase tracking-widest text-[#0A1F44]/60 font-bold block mb-2">
            RESEARCH DESK NOTICE
          </span>
          <h3 className="font-serif text-2xl font-bold text-navy-950 mb-3">
            Briefings In Preparation
          </h3>
          <p className="font-sans text-sm text-gray-600 leading-relaxed mb-6">
            Our editorial desk is currently auditing and modeling upcoming structural decoders. New macroeconomic and sovereign trade dossiers will be published here in the next research cycle.
          </p>
          <a
            href="#/publications"
            className="inline-block px-5 py-2.5 bg-[#0A1F44] text-white font-mono text-xs uppercase tracking-wider font-bold rounded hover:bg-navy-900 transition-colors"
          >
            Explore Published Research
          </a>
        </div>
      ) : (
        /* Main Grid: Selector Column & Content Column */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: List selector (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">
              Active Structural Briefs
            </h3>
            <div className="space-y-3">
              {CURRENT_AFFAIRS_ANALYSIS.map((brief) => (
                <button
                  key={brief.id}
                  id={`brief-selector-btn-${brief.id}`}
                  onClick={() => setSelectedAnalysis(brief)}
                  className={`w-full p-5 text-left border rounded-lg transition-all duration-150 relative ${
                    selectedAnalysis.id === brief.id
                      ? "bg-navy-50 border-navy-900 shadow-sm"
                      : "bg-white border-gray-150 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  {selectedAnalysis.id === brief.id && (
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-navy-900 rounded-l-lg" />
                  )}
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-[9px] bg-white px-2 py-0.5 border border-navy-100 text-gray-500 rounded uppercase font-semibold">
                      {brief.category}
                    </span>
                    <span className="font-mono text-[10px] text-gray-400">
                      {brief.publishedDate}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-semibold text-navy-950 leading-snug">
                    {brief.title}
                  </h4>
                  <p className="font-sans text-xs text-gray-500 line-clamp-2 mt-2 leading-relaxed">
                    {brief.summary}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-navy-900 font-semibold mt-3 hover:underline">
                    View Full Matrix <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-navy-50 p-5 rounded-lg border border-navy-100 mt-6">
              <h4 className="font-serif text-sm font-semibold text-navy-950 mb-2">
                Have a structural event to analyze?
              </h4>
              <p className="font-sans text-xs text-gray-500 leading-relaxed mb-4">
                Our youth network continuously maps regulatory shifts. Get in touch to request specific structural modeling for unlisted public policy adjustments.
              </p>
              <a 
                href="#/join" 
                className="inline-block px-4 py-2 bg-navy-900 text-white font-mono text-[10px] uppercase tracking-wider hover:bg-navy-800 transition-colors rounded"
              >
                Collaborate
              </a>
            </div>
          </div>

          {/* Right Column: Editorial Decoded Matrix (8 Cols) */}
          <div className="lg:col-span-8 bg-white border border-navy-100 rounded-xl p-8" id="editorial-decoder-board">
            
            {/* Header */}
            <div className="border-b border-navy-100 pb-6 mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs bg-navy-100 px-2.5 py-0.5 text-navy-900 uppercase font-semibold rounded">
                  {selectedAnalysis.category}
                </span>
                <span className="font-mono text-xs text-gray-400">
                  &mdash; Analyzed on {selectedAnalysis.publishedDate}
                </span>
              </div>
              <h2 className="font-serif text-3xl font-medium tracking-tight text-navy-950 mb-4">
                {selectedAnalysis.title}
              </h2>
              <p className="font-sans text-gray-600 leading-relaxed text-sm italic border-l-2 border-navy-900 pl-4">
                {selectedAnalysis.summary}
              </p>
            </div>

            {/* Core Decoders Grid (Bento Style) */}
            <div className="space-y-6">
              
              {/* WHY IT HAPPENED */}
              <div className="p-5 bg-navy-50 rounded-lg border border-navy-100" id="matrix-why-it-happened">
                <div className="flex items-center gap-2 mb-3">
                  <span className="p-1.5 bg-white text-navy-900 border border-navy-100 rounded">
                    <HelpCircle className="w-4 h-4" />
                  </span>
                  <h4 className="font-serif text-base font-semibold text-navy-950">
                    Why It Happened
                  </h4>
                </div>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  {selectedAnalysis.whyItHappened}
                </p>
              </div>

              {/* PAYOFF MATRIX: WHO BENEFITS & WHO LOSES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="matrix-payoffs">
                {/* WHO BENEFITS */}
                <div className="p-5 border border-emerald-100 bg-emerald-50/20 rounded-lg" id="matrix-who-benefits">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="p-1.5 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded">
                      <UserCheck className="w-4 h-4" />
                    </span>
                    <h4 className="font-serif text-base font-semibold text-emerald-950">
                      Who Benefits
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {selectedAnalysis.whoBenefits.map((item, idx) => (
                      <li key={idx} className="font-sans text-xs sm:text-sm text-gray-600 flex items-start gap-2 leading-relaxed">
                        <span className="text-emerald-600 font-bold mt-0.5">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* WHO LOSES */}
                <div className="p-5 border border-rose-100 bg-rose-50/10 rounded-lg" id="matrix-who-loses">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="p-1.5 bg-rose-50 text-rose-800 border border-rose-100 rounded">
                      <ShieldAlert className="w-4 h-4" />
                    </span>
                    <h4 className="font-serif text-base font-semibold text-rose-950">
                      Who Loses
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {selectedAnalysis.whoLoses.map((item, idx) => (
                      <li key={idx} className="font-sans text-xs sm:text-sm text-gray-600 flex items-start gap-2 leading-relaxed">
                        <span className="text-rose-600 font-bold mt-0.5">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* WHAT CHANGES ECONOMICALLY */}
              <div className="p-5 bg-white border border-navy-100 rounded-lg" id="matrix-economic-changes">
                <div className="flex items-center gap-2 mb-3">
                  <span className="p-1.5 bg-navy-50 text-navy-900 border border-navy-100 rounded">
                    <Coins className="w-4 h-4" />
                  </span>
                  <h4 className="font-serif text-base font-semibold text-navy-950">
                    What Changes Economically
                  </h4>
                </div>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  {selectedAnalysis.economicChanges}
                </p>
              </div>

              {/* LONG-TERM CONSEQUENCES */}
              <div className="p-5 bg-navy-950 text-white rounded-lg border border-navy-900" id="matrix-long-term-consequences">
                <div className="flex items-center gap-2 mb-3">
                  <span className="p-1.5 bg-gray-800 text-white border border-gray-700 rounded">
                    <Lightbulb className="w-4 h-4" />
                  </span>
                  <h4 className="font-serif text-base font-semibold text-white">
                    Long-Term Consequences
                  </h4>
                </div>
                <p className="font-sans text-sm text-gray-300 leading-relaxed">
                  {selectedAnalysis.longTermConsequences}
                </p>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-navy-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-navy-900 rounded-full animate-pulse" />
                <span className="font-mono text-[10px] tracking-wider text-gray-500 uppercase">
                  Active Analysis Stream
                </span>
              </div>
              <button 
                id="print-brief-btn"
                onClick={() => window.print()}
                className="text-xs font-mono border border-gray-200 hover:border-navy-900 px-3 py-1.5 rounded transition-all bg-white text-navy-900"
              >
                Export Briefing PDF
              </button>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
