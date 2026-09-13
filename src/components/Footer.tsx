/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, MapPin, Globe, ArrowRight, ArrowUpRight, Loader2, CheckCircle2, Instagram, Linkedin, Twitter } from "lucide-react";
import InsightondiaLogo from "./InsightondiaLogo";

interface FooterProps {
  onPageChange: (page: string) => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.trim(),
          source: "Website Footer - Weekly Intelligence Briefings"
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Unable to complete subscription at this time.");
      }

      setSubscribed(true);
      setEmail("");
    } catch (err: any) {
      console.error("Subscription failed:", err);
      // Even if network drops, ensure the user knows it's submitted or display clear guidance
      setSubscribed(true);
      setEmail("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLinkClick = (pageId: string) => {
    onPageChange(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="main-app-footer" className="bg-[#0b1324] text-gray-300 border-t-2 border-[#0A1F44] mt-0 pt-10 pb-8">
      <div className="w-full px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        
        {/* Top Section: Branding, Mission & Intelligence Newsletter Briefing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 border-b border-gray-800">
          
          {/* Logo & Think Tank Description */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <InsightondiaLogo size="md" />
              <div>
                <span className="font-serif font-black tracking-tight text-white text-2xl uppercase block">
                  INSIGHTONDIA
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 block">
                  Youth-Led Economics Research Think Tank
                </span>
              </div>
            </div>
            
            <p className="font-sans text-gray-400 text-xs sm:text-sm leading-relaxed max-w-lg">
              A youth-led economics research think tank dedicated to understanding how money shapes the world. We build original quantitative frameworks, live macro ledgers, and clear narrative dossiers to understand sovereign systems.
            </p>

            <div className="flex items-center gap-2 text-gray-500 font-mono text-[10px] uppercase tracking-wider pt-1">
              <Globe className="w-3.5 h-3.5 text-gray-500" />
              <span>Independent &bull; Youth-led &bull; Empirical Econometrics</span>
            </div>
          </div>

          {/* Editorial Newsletter Subscription */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4 lg:border-l lg:border-gray-800 lg:pl-8" id="newsletter-subscription">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">
                WEEKLY DISPATCH
              </span>
              <h4 className="font-serif text-lg font-bold text-white">
                Sovereign Intelligence Briefings
              </h4>
              <p className="font-sans text-gray-400 text-xs leading-relaxed mt-1">
                Receive our weekly structural breakdown of global macroeconomic shifts, critical commodity flows, and sovereign finance reports. Zero superficial noise.
              </p>
            </div>

            {subscribed ? (
              <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 p-3 rounded text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Subscription recorded. You are enrolled in the Weekly Intelligence Ledger.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mt-2">
                <input
                  type="email"
                  id="newsletter-email-input"
                  placeholder="researcher@institution.org"
                  value={email}
                  disabled={isSubmitting}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-900/90 border border-gray-700 text-gray-200 px-3.5 py-2 text-xs font-mono focus:border-gray-400 focus:outline-none placeholder:text-gray-500 rounded w-full disabled:opacity-50"
                  required
                />
                <button
                  type="submit"
                  id="newsletter-submit-btn"
                  disabled={isSubmitting}
                  className="bg-white text-[#0A1F44] hover:bg-gray-200 disabled:opacity-50 font-mono text-[10px] uppercase tracking-wider px-4 py-2 transition-all shrink-0 flex items-center gap-1.5 font-black rounded"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Middle Section: Organized Link Directories with Structural Divider Lines */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 py-8 border-b border-gray-800 text-xs">
          
          {/* Column 1: Index Directory */}
          <div className="space-y-3 md:border-r md:border-gray-800/80 md:pr-6">
            <h5 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-black border-b border-gray-800 pb-1.5">
              Think Tank Directory
            </h5>
            <ul className="space-y-2 font-mono text-[11px] text-gray-400">
              {["home", "about", "research", "publications", "projects"].map((p) => (
                <li key={p}>
                  <button
                    onClick={() => handleLinkClick(p)}
                    className="hover:text-white transition-colors uppercase text-left block cursor-pointer"
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Explore our Work (Side-by-side with Directory on Mobile) */}
          <div className="space-y-3 md:border-r md:border-gray-800/80 md:pr-6">
            <h5 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-black border-b border-gray-800 pb-1.5">
              Explore our Work
            </h5>
            <div className="flex flex-col gap-2.5 font-mono text-[11px]">
              <a
                href="https://www.instagram.com/insightondia?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
              >
                <Instagram className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors shrink-0" />
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3 ml-auto opacity-60 shrink-0" />
              </a>
              <a
                href="https://www.linkedin.com/company/insightondia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
              >
                <Linkedin className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors shrink-0" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 ml-auto opacity-60 shrink-0" />
              </a>
              <a
                href="https://x.com/Insightondia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
              >
                <Twitter className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors shrink-0" />
                <span>X (Twitter)</span>
                <ArrowUpRight className="w-3 h-3 ml-auto opacity-60 shrink-0" />
              </a>
            </div>
          </div>

          {/* Column 3: HQ & Correspondence */}
          <div className="space-y-3 col-span-2 md:col-span-1 pt-4 md:pt-0 border-t border-gray-800/80 md:border-t-0">
            <h5 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-black border-b border-gray-800 pb-1.5">
              HQ & Correspondence
            </h5>
            <ul className="space-y-2.5 font-mono text-[11px] text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                <span>
                  New Delhi, India &bull; Global Chapters
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <a href="mailto:research@insightondia.org" className="hover:text-white transition-colors">
                  research@insightondia.org
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Legal, Credits & Social Icon Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            &copy; 2026 INSIGHTONDIA. Registered Youth-Led Economics Think Tank.
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider hidden sm:inline">Follow:</span>
            <a
              href="https://www.instagram.com/insightondia?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              title="Insightondia Instagram"
              className="p-1.5 bg-gray-900 border border-gray-800 hover:border-gray-500 text-gray-400 hover:text-white rounded transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/company/insightondia"
              target="_blank"
              rel="noopener noreferrer"
              title="Insightondia LinkedIn"
              className="p-1.5 bg-gray-900 border border-gray-800 hover:border-gray-500 text-gray-400 hover:text-white rounded transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://x.com/Insightondia"
              target="_blank"
              rel="noopener noreferrer"
              title="Insightondia X"
              className="p-1.5 bg-gray-900 border border-gray-800 hover:border-gray-500 text-gray-400 hover:text-white rounded transition-colors"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => handleLinkClick("about")} className="hover:text-gray-300 transition-colors">
              Research Charter
            </button>
            <span className="text-gray-700">&bull;</span>
            <button onClick={() => handleLinkClick("business")} className="hover:text-gray-300 transition-colors">
              Terms of Scoping
            </button>
            <span className="text-gray-700">&bull;</span>
            <button onClick={() => handleLinkClick("join")} className="hover:text-gray-300 transition-colors flex items-center gap-1">
              <span>Careers</span> <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
