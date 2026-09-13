/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ArrowRight, ChevronRight, Menu, X } from "lucide-react";
import InsightondiaLogo from "./InsightondiaLogo";

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileResearchOpen, setMobileResearchOpen] = useState(false);
  const [mobilePubsOpen, setMobilePubsOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onPageChange(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      id="main-app-header"
      className="sticky top-0 z-50 w-full bg-white border-b-2 border-[#0A1F44] shadow-sm backdrop-blur-sm"
    >
      <div className="w-full px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left Section: Branding Logo + Desktop Nav Links aligned left */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            id="branding-logo-btn"
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2 group focus:outline-none shrink-0"
          >
            <InsightondiaLogo size="sm" />
            <span className="font-serif font-black tracking-tight text-[#0A1F44] text-lg sm:text-xl uppercase hover:opacity-90 transition-opacity">
              INSIGHTONDIA
            </span>
          </button>

          {/* Left-Aligned Desktop Navigation Links */}
          <nav 
            className="hidden md:flex items-center gap-1 sm:gap-2 text-[11px] sm:text-xs font-mono uppercase font-bold tracking-wider" 
            id="desktop-nav"
          >
            {/* About */}
            <button
              id="nav-link-about"
              onClick={() => handleNavClick("about")}
              className={`px-2.5 sm:px-3 py-1 transition-colors flex items-center border border-transparent ${
                currentPage === "about"
                  ? "bg-[#0A1F44] text-white"
                  : "text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white hover:border-[#0A1F44]"
              }`}
            >
              <span>ABOUT</span>
            </button>

            {/* Research Dropdown */}
            <div className="relative group">
              <button
                id="nav-link-research"
                onClick={() => handleNavClick("research")}
                className={`px-2.5 sm:px-3 py-1 transition-colors flex items-center gap-1 border border-transparent ${
                  ["research", "current-affairs", "data-lab"].includes(currentPage)
                    ? "bg-[#0A1F44] text-white"
                    : "text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white hover:border-[#0A1F44]"
                }`}
              >
                <span>RESEARCH</span>
                <ChevronRight className="w-3 h-3 group-hover:rotate-90 transition-transform" />
              </button>
              <div className="hidden group-hover:block absolute left-0 top-full pt-1 z-[100] min-w-[220px]">
                <div className="bg-white border-2 border-[#0A1F44] p-1.5 sm:p-2 shadow-[4px_4px_0px_#0A1F44] space-y-1">
                  <button
                    onClick={() => handleNavClick("research")}
                    className={`w-full text-left px-2.5 py-1.5 hover:bg-[#0A1F44] hover:text-white text-[10px] sm:text-[11px] flex items-center justify-between font-bold ${
                      currentPage === "research" ? "bg-[#0A1F44] text-white" : "text-[#0A1F44]"
                    }`}
                  >
                    <span>Explore Research</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleNavClick("current-affairs")}
                    className={`w-full text-left px-2.5 py-1.5 hover:bg-[#0A1F44] hover:text-white text-[10px] sm:text-[11px] flex items-center justify-between font-bold ${
                      currentPage === "current-affairs" ? "bg-[#0A1F44] text-white" : "text-[#0A1F44]"
                    }`}
                  >
                    <span>Current Affairs</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleNavClick("data-lab")}
                    className={`w-full text-left px-2.5 py-1.5 hover:bg-[#0A1F44] hover:text-white text-[10px] sm:text-[11px] flex items-center justify-between font-bold ${
                      currentPage === "data-lab" ? "bg-[#0A1F44] text-white" : "text-[#0A1F44]"
                    }`}
                  >
                    <span>Data Lab</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Publications Dropdown */}
            <div className="relative group">
              <button
                id="nav-link-publications"
                onClick={() => handleNavClick("publications")}
                className={`px-2.5 sm:px-3 py-1 transition-colors flex items-center gap-1 border border-transparent ${
                  ["publications", "projects", "business"].includes(currentPage)
                    ? "bg-[#0A1F44] text-white"
                    : "text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white hover:border-[#0A1F44]"
                }`}
              >
                <span>PUBLICATIONS</span>
                <ChevronRight className="w-3 h-3 group-hover:rotate-90 transition-transform" />
              </button>
              <div className="hidden group-hover:block absolute left-0 top-full pt-1 z-[100] min-w-[220px]">
                <div className="bg-white border-2 border-[#0A1F44] p-1.5 sm:p-2 shadow-[4px_4px_0px_#0A1F44] space-y-1">
                  <button
                    onClick={() => handleNavClick("publications")}
                    className={`w-full text-left px-2.5 py-1.5 hover:bg-[#0A1F44] hover:text-white text-[10px] sm:text-[11px] flex items-center justify-between font-bold ${
                      currentPage === "publications" ? "bg-[#0A1F44] text-white" : "text-[#0A1F44]"
                    }`}
                  >
                    <span>Publications Archive</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleNavClick("projects")}
                    className={`w-full text-left px-2.5 py-1.5 hover:bg-[#0A1F44] hover:text-white text-[10px] sm:text-[11px] flex items-center justify-between font-bold ${
                      currentPage === "projects" ? "bg-[#0A1F44] text-white" : "text-[#0A1F44]"
                    }`}
                  >
                    <span>Featured Projects</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleNavClick("business")}
                    className={`w-full text-left px-2.5 py-1.5 hover:bg-[#0A1F44] hover:text-white text-[10px] sm:text-[11px] flex items-center justify-between font-bold ${
                      currentPage === "business" ? "bg-[#0A1F44] text-white" : "text-[#0A1F44]"
                    }`}
                  >
                    <span>Business Solutions</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            id="header-cta-btn"
            onClick={() => handleNavClick("join")}
            className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#0A1F44] text-white hover:bg-navy-900 transition-all font-mono text-[10px] sm:text-xs uppercase font-black flex items-center gap-1 shadow-sm whitespace-nowrap"
          >
            <span>JOIN US &rarr;</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 text-[#0A1F44] hover:bg-[#0A1F44]/10 rounded border border-[#0A1F44]/30 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t-2 border-[#0A1F44] p-3 space-y-2 font-mono text-xs uppercase font-bold animate-fadeIn shadow-lg">
          {/* 1. Home */}
          <button
            onClick={() => handleNavClick("home")}
            className={`w-full text-left p-2.5 border transition-colors ${
              currentPage === "home" ? "bg-[#0A1F44] text-white" : "border-[#0A1F44]/20 text-[#0A1F44] hover:bg-[#0A1F44]/5"
            }`}
          >
            Home
          </button>

          {/* 2. About */}
          <button
            onClick={() => handleNavClick("about")}
            className={`w-full text-left p-2.5 border transition-colors ${
              currentPage === "about" ? "bg-[#0A1F44] text-white" : "border-[#0A1F44]/20 text-[#0A1F44] hover:bg-[#0A1F44]/5"
            }`}
          >
            About
          </button>

          {/* 3. Research (with Dropdown) */}
          <div className="border border-[#0A1F44]/20">
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleNavClick("research")}
                className={`flex-1 text-left p-2.5 transition-colors ${
                  ["research", "current-affairs", "data-lab"].includes(currentPage)
                    ? "bg-[#0A1F44] text-white"
                    : "text-[#0A1F44] hover:bg-[#0A1F44]/5"
                }`}
              >
                Research
              </button>
              <button
                onClick={() => setMobileResearchOpen(!mobileResearchOpen)}
                className={`p-2.5 border-l border-[#0A1F44]/20 ${
                  ["research", "current-affairs", "data-lab"].includes(currentPage)
                    ? "bg-[#0A1F44] text-white"
                    : "text-[#0A1F44] hover:bg-[#0A1F44]/10"
                }`}
                aria-label="Toggle Research Submenu"
              >
                <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${mobileResearchOpen ? "rotate-90" : ""}`} />
              </button>
            </div>

            {mobileResearchOpen && (
              <div className="bg-slate-50 border-t border-[#0A1F44]/20 p-2 space-y-1">
                <button
                  onClick={() => handleNavClick("research")}
                  className={`w-full text-left px-3 py-2 text-[11px] flex items-center justify-between font-bold ${
                    currentPage === "research" ? "bg-[#0A1F44] text-white" : "text-[#0A1F44] hover:bg-[#0A1F44]/10"
                  }`}
                >
                  <span>Explore Research</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleNavClick("current-affairs")}
                  className={`w-full text-left px-3 py-2 text-[11px] flex items-center justify-between font-bold ${
                    currentPage === "current-affairs" ? "bg-[#0A1F44] text-white" : "text-[#0A1F44] hover:bg-[#0A1F44]/10"
                  }`}
                >
                  <span>Current Affairs</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleNavClick("data-lab")}
                  className={`w-full text-left px-3 py-2 text-[11px] flex items-center justify-between font-bold ${
                    currentPage === "data-lab" ? "bg-[#0A1F44] text-white" : "text-[#0A1F44] hover:bg-[#0A1F44]/10"
                  }`}
                >
                  <span>Data Lab</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* 4. Publications (with Dropdown) */}
          <div className="border border-[#0A1F44]/20">
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleNavClick("publications")}
                className={`flex-1 text-left p-2.5 transition-colors ${
                  ["publications", "projects", "business"].includes(currentPage)
                    ? "bg-[#0A1F44] text-white"
                    : "text-[#0A1F44] hover:bg-[#0A1F44]/5"
                }`}
              >
                Publications
              </button>
              <button
                onClick={() => setMobilePubsOpen(!mobilePubsOpen)}
                className={`p-2.5 border-l border-[#0A1F44]/20 ${
                  ["publications", "projects", "business"].includes(currentPage)
                    ? "bg-[#0A1F44] text-white"
                    : "text-[#0A1F44] hover:bg-[#0A1F44]/10"
                }`}
                aria-label="Toggle Publications Submenu"
              >
                <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${mobilePubsOpen ? "rotate-90" : ""}`} />
              </button>
            </div>

            {mobilePubsOpen && (
              <div className="bg-slate-50 border-t border-[#0A1F44]/20 p-2 space-y-1">
                <button
                  onClick={() => handleNavClick("publications")}
                  className={`w-full text-left px-3 py-2 text-[11px] flex items-center justify-between font-bold ${
                    currentPage === "publications" ? "bg-[#0A1F44] text-white" : "text-[#0A1F44] hover:bg-[#0A1F44]/10"
                  }`}
                >
                  <span>Publications Archive</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleNavClick("projects")}
                  className={`w-full text-left px-3 py-2 text-[11px] flex items-center justify-between font-bold ${
                    currentPage === "projects" ? "bg-[#0A1F44] text-white" : "text-[#0A1F44] hover:bg-[#0A1F44]/10"
                  }`}
                >
                  <span>Featured Projects</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleNavClick("business")}
                  className={`w-full text-left px-3 py-2 text-[11px] flex items-center justify-between font-bold ${
                    currentPage === "business" ? "bg-[#0A1F44] text-white" : "text-[#0A1F44] hover:bg-[#0A1F44]/10"
                  }`}
                >
                  <span>Business Solutions</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* 5. Join Us */}
          <div className="pt-2">
            <button
              onClick={() => handleNavClick("join")}
              className="w-full py-2.5 bg-[#0A1F44] text-white text-center font-bold tracking-wider hover:bg-navy-900 transition-colors shadow-sm"
            >
              JOIN US &rarr;
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
