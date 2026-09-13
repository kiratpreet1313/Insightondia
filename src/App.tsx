/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DataLab from "./components/DataLab";
import CurrentAffairs from "./components/CurrentAffairs";
import CapitalGravitySandbox from "./components/CapitalGravitySandbox";
import MacroTerminal from "./components/MacroTerminal";
import VintageCommodityTrain from "./components/VintageCommodityTrain";
import AestheticParticlesBg from "./components/AestheticParticlesBg";
import TeamSection from "./components/TeamSection";
import GallerySection from "./components/GallerySection";
import SketchUnderline from "./components/SketchUnderline";
import { NewspaperHero } from "./components/NewspaperHero";
import articleImage from "./assets/images/Article image.21.37 AM.png";

import {
  RESEARCH_AREAS,
  FEATURED_PROJECTS,
  PUBLICATIONS,
  BUSINESS_SOLUTIONS,
  FUTURE_INITIATIVES,
  PRODUCTS_WE_PRODUCE,
  STATISTICS
} from "./data";

import { Publication, FeaturedProject, ResearchArea } from "./types";

import {
  ArrowRight,
  BookOpen,
  Calendar,
  Download,
  Search,
  Award,
  Users,
  CheckCircle2,
  ArrowUpRight,
  ChevronDown,
  Check,
  FileText,
  Layers,
  Compass,
  Briefcase,
  TrendingUp,
  X,
  Sparkles,
  Loader2,
  Instagram,
  Linkedin,
  Twitter
} from "lucide-react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  
  // Immersive Publication Reader State
  const [readingPublication, setReadingPublication] = useState<Publication | null>(null);

  // Search/Filter states
  const [publicationSearch, setPublicationSearch] = useState("");
  const [selectedPubCategory, setSelectedPubCategory] = useState("All");
  
  const [projectSearch, setProjectSearch] = useState("");
  const [selectedProjCategory, setSelectedProjCategory] = useState("All");

  const [expandedResearchId, setExpandedResearchId] = useState<string | null>(null);

  // Business Scoping & Consultation Inquiry State
  const [scopingCompany, setScopingCompany] = useState("");
  const [scopingEmail, setScopingEmail] = useState("");
  const [scopeVertical, setScopeVertical] = useState("");
  const [solutionDetails, setSolutionDetails] = useState("");
  const [timelineExpectation, setTimelineExpectation] = useState("Immediate Diagnostic (2-4 Weeks)");
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(["Growth Strategy", "Market Research"]);
  const [scopingOutput, setScopingOutput] = useState<any | null>(null);
  const [isSubmittingBiz, setIsSubmittingBiz] = useState(false);
  const [bizSuccessMessage, setBizSuccessMessage] = useState<string | null>(null);

  // Join Us Form State
  const [joinRole, setJoinRole] = useState("Student Research Fellowship");
  const [joinName, setJoinName] = useState("");
  const [joinEmail, setJoinEmail] = useState("");
  const [joinUniversity, setJoinUniversity] = useState("");
  const [joinFocus, setJoinFocus] = useState("Global Economics");
  const [joinProposal, setJoinProposal] = useState("");
  const [joinReceipt, setJoinReceipt] = useState<any | null>(null);

  // Hash-routing sync
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#/", "").replace("#", "");
      const validPages = [
        "home", "about", "research", "publications", "projects", 
        "business", "current-affairs", "data-lab", "join"
      ];
      if (hash && validPages.includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // initial page mount

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handlePageChange = (page: string) => {
    window.location.hash = `#/${page}`;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filter Publications
  const filteredPublications = useMemo(() => {
    return PUBLICATIONS.filter(pub => {
      const matchesSearch = pub.title.toLowerCase().includes(publicationSearch.toLowerCase()) ||
                            pub.author.toLowerCase().includes(publicationSearch.toLowerCase()) ||
                            pub.summary.toLowerCase().includes(publicationSearch.toLowerCase());
      const matchesCategory = selectedPubCategory === "All" || pub.category === selectedPubCategory;
      return matchesSearch && matchesCategory;
    });
  }, [publicationSearch, selectedPubCategory]);

  const pubCategories = ["All", ...Array.from(new Set(PUBLICATIONS.map(p => p.category)))];

  // Filter Projects
  const filteredProjects = useMemo(() => {
    return FEATURED_PROJECTS.filter(proj => {
      const matchesSearch = proj.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
                            proj.summary.toLowerCase().includes(projectSearch.toLowerCase()) ||
                            proj.author.toLowerCase().includes(projectSearch.toLowerCase());
      const matchesCategory = selectedProjCategory === "All" || proj.category === selectedProjCategory;
      return matchesSearch && matchesCategory;
    });
  }, [projectSearch, selectedProjCategory]);

  const projCategories = ["All", ...Array.from(new Set(FEATURED_PROJECTS.map(p => p.category)))];

  // Business scoping & inquiry handler
  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scopingCompany.trim() || !scopeVertical.trim() || !scopingEmail.trim() || !solutionDetails.trim()) return;

    setIsSubmittingBiz(true);
    setBizSuccessMessage(null);

    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const id = `ISO-CORP-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      await fetch("/api/business-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: scopingCompany.trim(),
          email: scopingEmail.trim(),
          vertical: scopeVertical.trim(),
          solutionTypes: solutionDetails.trim(),
          timeline: timelineExpectation,
          needs: selectedNeeds
        })
      });
    } catch (err) {
      console.warn("Business inquiry submission note:", err);
    }

    setScopingOutput({
      id,
      date,
      partner: scopingCompany.trim(),
      email: scopingEmail.trim(),
      vertical: scopeVertical.trim(),
      solutionTypes: solutionDetails.trim(),
      timeline: timelineExpectation,
      needs: selectedNeeds,
      phases: [
        { name: "Phase 1: Diagnostic Assessment & Intake", duration: "Days 1-7", details: "Evaluating vertical value chains, identifying market positioning levers, and auditing capital allocation friction points." },
        { name: "Phase 2: Econometric & Quantitative Modeling", duration: "Weeks 2-3", details: "Constructing custom sensitivity tables, competitor cost curves, and demand forecasting models." },
        { name: "Phase 3: Executive Strategic Roadmap", duration: "Final Review", details: "Delivering institutional-grade briefing decks with concrete strategic recommendations, regulatory risk mitigation, and pricing frameworks." }
      ]
    });

    setBizSuccessMessage(`Inquiry submitted successfully. Our Strategy Desk has logged your brief (Ref: ${id}). We will get back to you within 24 hours at ${scopingEmail}.`);
    setIsSubmittingBiz(false);
  };

  const toggleNeed = (need: string) => {
    if (selectedNeeds.includes(need)) {
      setSelectedNeeds(selectedNeeds.filter(n => n !== need));
    } else {
      setSelectedNeeds([...selectedNeeds, need]);
    }
  };

  // Join handler
  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinName.trim() || !joinEmail.trim() || !joinUniversity.trim()) return;

    const receiptId = `ISO-JOIN-${Math.floor(10000 + Math.random() * 90000)}`;
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    
    setJoinReceipt({
      id: receiptId,
      date,
      name: joinName,
      role: joinRole,
      university: joinUniversity,
      focus: joinFocus,
      roadmap: [
        { step: "Phase 1: Portfolio Diagnostic", date: "Within 7 Days", desc: "Our Academic Panel reviews your focus area alignment and proposed study abstract." },
        { step: "Phase 2: Econometric Review Interview", date: "Early August 2026", desc: "A technical 45-minute discussion modeling regional trade elasticity or capital structures." },
        { step: "Phase 3: Fellowship Invitation", date: "Late August 2026", desc: "Formal assignment to an active Sovereign Research Node with dedicated senior publication support." }
      ]
    });

    // Reset fields
    setJoinName("");
    setJoinEmail("");
    setJoinUniversity("");
    setJoinProposal("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 flex flex-col font-sans selection:bg-[#0A1F44] selection:text-white p-0 sm:p-2 md:p-3" id="main-thinktank-canvas">
      
      {/* OUTER BLUE BORDER FRAMING FOR THE WHOLE WEBSITE */}
      <div className="w-full max-w-[1440px] mx-auto bg-white border-0 sm:border-2 border-[#0A1F44] shadow-sm flex flex-col min-h-screen relative">

        {/* HEADER NAVBAR (Shown only on subpages so homepage utilizes the newspaper masthead navigation) */}
        {currentPage !== "home" && (
          <Header currentPage={currentPage} onPageChange={handlePageChange} />
        )}

        {/* CORE PAGES ROUTER */}
        <main className={`flex-grow w-full px-3 sm:px-6 md:px-8 pt-1 ${currentPage === "home" || currentPage === "about" ? "pb-0" : "pb-8"}`}>
          
          {/* ==================== PAGE: HOME ==================== */}
          {currentPage === "home" && (
            <div className="space-y-6 sm:space-y-8 pt-0 pb-0 relative" id="home-view-canvas">
              {/* Ambient Background Particles connecting nodes */}
              <AestheticParticlesBg />
              
              {/* 1. 90s BROADSHEET NEWSPAPER HERO SECTION */}
              <NewspaperHero 
                onPageChange={handlePageChange} 
                onReadPublication={setReadingPublication} 
              />

              {/* SECTION DIVIDER LINE */}
              <div className="w-full h-[2px] bg-[#0A1F44] my-[21px] sm:my-[29px]" />

              {/* 2. CENTRAL BANK & MACRO MATRIX */}
              <section className="py-1 sm:py-2" id="homepage-macro-terminal">
                <MacroTerminal />
              </section>

              {/* SECTION DIVIDER LINE */}
              <div className="w-full h-[2px] bg-[#0A1F44] my-[21px] sm:my-[29px]" />

              {/* 3. STRUCTURED ABOUT (2-Column Editorial Grid) */}
              <section className="pb-2 sm:pb-4" id="home-manifesto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
                  
                  {/* Left Column: Mandate Header & Core Premise (5 cols) */}
                  <div className="lg:col-span-5 space-y-3 lg:border-r lg:border-[#0A1F44]/20 lg:pr-6">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest font-black text-gray-500 block">
                        OUR IDENTITY & METHODOLOGY
                      </span>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#0A1F44] leading-snug">
                        <SketchUnderline variant="wave" color="sky">
                          About Insightondia
                        </SketchUnderline>
                      </h2>
                      <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed mt-2">
                        We are an independent youth-led economics research think tank dedicated to dismantling opacity in how sovereign capital, supply chains, and industrial networks shape societal outcomes.
                      </p>
                      <div className="pt-2">
                        <button
                          onClick={() => handlePageChange("about")}
                          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase font-bold text-[#0A1F44] hover:underline"
                        >
                          Read Full Manifesto <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Detailed Analytical Narrative (7 cols) */}
                  <div className="lg:col-span-7 space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#0A1F44]">
                      How We're Building This
                    </h3>
                    <p>
                      Right now, we're not producing fully original research. We're curating global economic issues and industries and telling the India story behind them &mdash; starting global (what's driving it, who's involved, what's at stake) and bringing it home to what it actually means for India.
                    </p>
                    <p className="font-semibold text-[#0A1F44]">
                      In the coming months, that changes. We start producing 100% original work &mdash; our own reporting, our own analysis, dug up from scratch.
                    </p>

                    {/* Explore our Work social links */}
                    <div className="pt-3 border-t border-[#0A1F44]/15 mt-3">
                      <h4 className="font-serif text-sm sm:text-base font-bold text-[#0A1F44] mb-2 sm:mb-2.5">
                        Explore our Work
                      </h4>
                      <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 sm:flex sm:flex-wrap font-mono text-[10px] sm:text-xs w-full">
                        <a
                          href="https://www.instagram.com/insightondia?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 py-2 sm:px-3 sm:py-1.5 bg-slate-100 hover:bg-[#0A1F44] hover:text-white text-[#0A1F44] border border-[#0A1F44]/20 rounded font-bold transition-all duration-150 whitespace-nowrap"
                        >
                          <Instagram className="w-4 h-4 shrink-0" />
                          <span>Instagram</span>
                        </a>
                        <a
                          href="https://www.linkedin.com/company/insightondia"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 py-2 sm:px-3 sm:py-1.5 bg-slate-100 hover:bg-[#0A1F44] hover:text-white text-[#0A1F44] border border-[#0A1F44]/20 rounded font-bold transition-all duration-150 whitespace-nowrap"
                        >
                          <Linkedin className="w-4 h-4 shrink-0" />
                          <span>LinkedIn</span>
                        </a>
                        <a
                          href="https://x.com/Insightondia"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 py-2 sm:px-3 sm:py-1.5 bg-slate-100 hover:bg-[#0A1F44] hover:text-white text-[#0A1F44] border border-[#0A1F44]/20 rounded font-bold transition-all duration-150 whitespace-nowrap"
                        >
                          <Twitter className="w-4 h-4 shrink-0" />
                          <span>X (Twitter)</span>
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* SECTION DIVIDER LINE */}
              <div className="w-full h-[2px] bg-[#0A1F44] my-[21px] sm:my-[29px]" />

              {/* 4. FEATURED PUBLICATIONS (Structured Column Grid) */}
              <section className="space-y-3 sm:space-y-4" id="home-featured-publications">
                <div className="flex justify-between items-end border-b border-[#0A1F44]/20 pb-2 sm:pb-2.5">
                  <div>
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest font-black text-[#0A1F44]/60 block mb-0.5">
                      SCHOLARLY DOSSIERS
                    </span>
                    <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#0A1F44]">
                      <SketchUnderline variant="wave" color="sky">
                        Featured Publications
                      </SketchUnderline>
                    </h3>
                  </div>
                  <button
                    onClick={() => handlePageChange("publications")}
                    className="font-mono text-[10px] sm:text-xs uppercase text-[#0A1F44] hover:underline flex items-center gap-1 font-bold"
                  >
                    View All &rarr;
                  </button>
                </div>

                {/* Structured 2-Column Card Deck */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
                  {PUBLICATIONS.slice(0, 2).map((pub) => (
                    <div key={pub.id} className="border-2 border-[#0A1F44] rounded-lg p-3 sm:p-5 bg-white flex flex-col justify-between hover:shadow-[4px_4px_0px_#0A1F44] transition-all duration-150 group">
                      <div>
                        {/* Publication Editorial Thumbnail - more compact on mobile */}
                        <div 
                          onClick={() => setReadingPublication(pub)}
                          className="relative aspect-[21/9] sm:aspect-[16/7] w-full mb-2.5 sm:mb-3 rounded overflow-hidden border border-[#0A1F44]/20 bg-slate-900 cursor-pointer"
                        >
                          <img
                            src={
                              pub.id.includes("monetary") 
                                ? articleImage
                                : "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
                            }
                            alt={pub.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.05]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44]/80 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-1.5 sm:bottom-2 left-2 sm:left-2.5 right-2 sm:right-2.5 flex items-center justify-between">
                            <span className="font-mono text-[8px] sm:text-[9px] text-white bg-[#0A1F44]/90 px-1.5 sm:px-2 py-0.5 rounded uppercase font-bold tracking-wider border border-white/20">
                              {pub.category}
                            </span>
                            <span className="font-mono text-[8px] sm:text-[9px] text-sky-200">
                              WORKING PAPER
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                          <span className="font-mono text-[8px] sm:text-[9px] text-gray-500 uppercase font-semibold">
                            INSPECTION DOSSIER
                          </span>
                          <span className="font-mono text-[9px] sm:text-[10px] text-[#0A1F44]/60 font-semibold">{pub.readingTime}</span>
                        </div>
                        <h4 
                          onClick={() => setReadingPublication(pub)}
                          className="font-serif text-base sm:text-xl font-bold text-[#0A1F44] tracking-tight leading-snug mb-1.5 sm:mb-2 hover:underline cursor-pointer"
                        >
                          {pub.title}
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-[#0A1F44]/75 line-clamp-2 sm:line-clamp-3 leading-relaxed mb-2.5 sm:mb-3.5">
                          {pub.summary}
                        </p>
                      </div>

                      <div className="pt-2 sm:pt-2.5 border-t border-[#0A1F44]/15 flex items-center justify-between">
                        <div className="text-left">
                          <span className="font-mono text-[8px] sm:text-[9px] text-[#0A1F44]/60 block uppercase">Lead Author</span>
                          <span className="font-sans text-xs font-bold text-[#0A1F44]">{pub.author}</span>
                        </div>
                        <button
                          onClick={() => setReadingPublication(pub)}
                          className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#0A1F44] text-white hover:bg-navy-900 transition-all font-mono text-[9px] sm:text-[10px] uppercase tracking-wider font-bold rounded cursor-pointer"
                        >
                          Read Article &rarr;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION DIVIDER LINE */}
              <div className="w-full h-[2px] bg-[#0A1F44] my-[21px] sm:my-[29px]" />

              {/* 5. MEET OUR TEAM SECTION (Structured Grid) */}
              <section className="py-2 sm:py-4" id="home-team-section">
                <TeamSection />
              </section>

              {/* SECTION DIVIDER LINE */}
              <div className="w-full h-[2px] bg-[#0A1F44] my-[21px] sm:my-[29px]" />

              {/* 6. OUR GALLERY SECTION (Structured Grid) */}
              <section className="pt-2 sm:pt-4 pb-2 sm:pb-3" id="home-gallery-section">
                <GallerySection />
              </section>

            </div>
          )}

        {/* ==================== PAGE: ABOUT ==================== */}
        {currentPage === "about" && (
          <div className="space-y-[17px] sm:space-y-[25px] pt-2 sm:pt-4 pb-0" id="about-view-canvas">
            {/* Hero banner */}
            <div className="py-3 sm:py-6">
              <span className="font-mono text-xs tracking-widest text-gray-500 uppercase block mb-2">
                Our Foundation & Philosophical Mandate
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-navy-950 mb-3">
                The Think Tank
              </h1>
              <p className="font-sans text-gray-600 max-w-3xl leading-relaxed text-sm sm:text-lg">
                Insightondia was born out of a critical recognition: that while economics dictates the terms of sovereign progress, corporate expansion, and social mobility, its insights are often locked behind complex jargon or superficial headline reports.
              </p>
            </div>

            {/* SECTION DIVIDER LINE */}
            <div className="w-full h-[2px] bg-[#0A1F44] my-[17px] sm:my-[25px]" />

            {/* Mission & Vision (2 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 py-1 sm:py-2">
              <div className="p-4 sm:p-6 bg-navy-50 rounded-xl border border-navy-100 space-y-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-sky-800 font-bold block">
                  Our Mission
                </span>
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-navy-950 leading-snug">
                  We produce original economic research on issues shaping India, and translate that research into articles, videos, and public content that make it usable for entrepreneurs, policymakers, and curious citizens alike.
                </h3>
              </div>

              <div className="p-4 sm:p-6 bg-navy-950 rounded-xl border border-navy-900 space-y-3 shadow-md">
                <span className="font-mono text-[10px] uppercase tracking-widest text-sky-400 font-bold block">
                  Our Vision
                </span>
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-gray-300 leading-snug">
                  To build India's leading youth-run economics think tank: one that shapes how the next generation understands economic policy and, over time, earns a seat in shaping it.
                </h3>
              </div>
            </div>

            {/* SECTION DIVIDER LINE */}
            <div className="w-full h-[2px] bg-[#0A1F44] my-[17px] sm:my-[25px]" />

            {/* How We're Building This & Explore Our Work */}
            <div className="p-4 sm:p-6 bg-white rounded-xl border border-navy-100 shadow-sm space-y-4" id="about-how-we-build">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#0A1F44]/60 font-bold block">
                Editorial & Research Roadmap
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A1F44]">
                How We're Building This
              </h3>
              <div className="space-y-2.5 font-sans text-xs sm:text-base text-gray-600 leading-relaxed max-w-4xl">
                <p>
                  Right now, we're not producing fully original research. We're curating global economic issues and industries and telling the India story behind them &mdash; starting global (what's driving it, who's involved, what's at stake) and bringing it home to what it actually means for India.
                </p>
                <p className="font-semibold text-[#0A1F44]">
                  In the coming months, that changes. We start producing 100% original work &mdash; our own reporting, our own analysis, dug up from scratch.
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#0A1F44] mb-2 sm:mb-3">
                  Explore our Work
                </h4>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-3 sm:flex sm:flex-wrap font-mono text-[10px] sm:text-xs w-full">
                  <a
                    href="https://www.instagram.com/insightondia?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 sm:gap-2 px-1.5 py-2 sm:px-4 sm:py-2.5 bg-navy-50 hover:bg-[#0A1F44] hover:text-white text-[#0A1F44] border border-[#0A1F44]/20 rounded font-bold transition-all duration-150 shadow-xs whitespace-nowrap"
                  >
                    <Instagram className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/insightondia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 sm:gap-2 px-1.5 py-2 sm:px-4 sm:py-2.5 bg-navy-50 hover:bg-[#0A1F44] hover:text-white text-[#0A1F44] border border-[#0A1F44]/20 rounded font-bold transition-all duration-150 shadow-xs whitespace-nowrap"
                  >
                    <Linkedin className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://x.com/Insightondia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 sm:gap-2 px-1.5 py-2 sm:px-4 sm:py-2.5 bg-navy-50 hover:bg-[#0A1F44] hover:text-white text-[#0A1F44] border border-[#0A1F44]/20 rounded font-bold transition-all duration-150 shadow-xs whitespace-nowrap"
                  >
                    <Twitter className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
                    <span>X (Twitter)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* SECTION DIVIDER LINE */}
            <div className="w-full h-[2px] bg-[#0A1F44] my-[17px] sm:my-[25px]" />

            {/* Team Members Section */}
            <section className="py-1 sm:py-2" id="about-team-section">
              <TeamSection />
            </section>

            {/* SECTION DIVIDER LINE */}
            <div className="w-full h-[2px] bg-[#0A1F44] my-[17px] sm:my-[25px]" />

            {/* In the Room - Fieldwork Gallery Section */}
            <section className="pt-1 sm:pt-2 pb-2 sm:pb-3" id="about-gallery-section">
              <GallerySection />
            </section>

          </div>
        )}


        {/* ==================== PAGE: RESEARCH ==================== */}
        {currentPage === "research" && (
          <div className="space-y-6 sm:space-y-12 md:space-y-16 py-3 sm:py-6" id="research-view-canvas">
            {/* Header */}
            <div className="py-3 sm:py-6 md:py-8">
              <span className="font-mono text-xs tracking-widest text-gray-500 uppercase block mb-2 sm:mb-3">
                Insightondia Academic Domains
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-navy-950 mb-2.5 sm:mb-4">
                Research Areas
              </h1>
              <p className="font-sans text-gray-600 max-w-3xl leading-relaxed text-sm sm:text-base md:text-lg">
                Our organization is structured into specialized research nodes, each focusing on critical facets of macroeconomics, corporate competition, and dynamic global currents. Click any card to expand its topics and details.
              </p>
            </div>

            {/* SECTION DIVIDER LINE */}
            <div className="w-full h-[2px] bg-[#0A1F44] my-[17px] sm:my-[25px]" />

            {/* Grid of Areas - column areas increased by 10% on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full mx-auto">
              {RESEARCH_AREAS.map((area) => {
                const isExpanded = expandedResearchId === area.id;
                return (
                  <div
                    key={area.id}
                    id={`research-area-card-${area.id}`}
                    onClick={() => setExpandedResearchId(isExpanded ? null : area.id)}
                    className={`p-4 sm:p-6 md:p-8 border rounded-xl bg-white text-left cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                      isExpanded
                        ? "border-navy-950 bg-navy-50 ring-1 ring-navy-950 md:col-span-2 lg:col-span-3"
                        : "border-navy-100 hover:border-navy-950 hover:shadow-sm"
                    }`}
                  >
                    <div>
                      <span className="font-mono text-[9px] bg-white border border-navy-100 text-gray-500 px-2 py-0.5 rounded block w-max uppercase mb-2.5 sm:mb-4 font-semibold">
                        Think Tank Node
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-950 mb-2 sm:mb-3">
                        {area.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 sm:mb-6">
                        {area.description}
                      </p>
                    </div>

                    <div>
                      {isExpanded ? (
                        <div className="border-t border-navy-200 pt-4 sm:pt-6 mt-3 sm:mt-4">
                          <span className="font-mono text-[10px] uppercase text-gray-500 tracking-wider block mb-2.5 sm:mb-3">
                            Covered Topics & Model Verticals
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {area.topics.map((topic, i) => (
                              <div key={i} className="bg-white border border-navy-200 p-2 sm:p-2.5 rounded text-xs font-sans text-navy-900 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-navy-950 rounded-full shrink-0" />
                                <span>{topic}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 sm:mt-6 flex justify-end gap-2.5 sm:gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePageChange("publications");
                              }}
                              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-navy-950 text-white font-mono text-[10px] uppercase tracking-wider hover:bg-navy-900 transition-colors rounded"
                            >
                              Browse Publications
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedResearchId(null);
                              }}
                              className="px-3 py-1.5 sm:px-4 sm:py-2 border border-navy-300 font-mono text-[10px] uppercase tracking-wider text-gray-600 hover:bg-white rounded"
                            >
                              Close Details
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-xs font-mono text-navy-950 font-semibold hover:underline">
                          <span>Expand Topics Matrix</span>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== PAGE: PUBLICATIONS ==================== */}
        {currentPage === "publications" && (
          <div className="space-y-12 py-6" id="publications-view-canvas">
            {/* Header */}
            <div className="border-b border-navy-100 py-12">
              <span className="font-mono text-xs tracking-widest text-gray-500 uppercase block mb-3">
                Insightondia Archive & Scholarly Ledger
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-navy-950 mb-4">
                Publications & Reports
              </h1>
              <p className="font-sans text-gray-600 max-w-3xl leading-relaxed text-lg">
                Browse our complete index of research papers, vertical industry deep-dives, public policy drafts, and structural briefs. Built strictly to academic publishing metrics.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-navy-50 pb-8">
              {/* Category selector */}
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {pubCategories.map((cat) => (
                  <button
                    key={cat}
                    id={`pub-filter-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setSelectedPubCategory(cat)}
                    className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider border rounded transition-all duration-150 ${
                      selectedPubCategory === cat
                        ? "bg-navy-950 text-white border-navy-950"
                        : "bg-white text-gray-500 border-gray-200 hover:border-navy-950 hover:text-navy-950"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search bar */}
              <div className="relative w-full sm:max-w-xs shrink-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="pub-search-input"
                  placeholder="Query publications..."
                  value={publicationSearch}
                  onChange={(e) => setPublicationSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full text-xs font-mono bg-white border border-gray-200 focus:border-navy-950 focus:outline-none transition-all rounded"
                />
              </div>
            </div>

            {/* Publications Archive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="publications-grid">
              {filteredPublications.length > 0 ? (
                filteredPublications.map((pub) => (
                  <div 
                    key={pub.id} 
                    className="border border-navy-100 rounded-xl overflow-hidden bg-white hover:border-navy-950 transition-all duration-150 flex flex-col justify-between"
                  >
                    {/* Cover graphic placeholder & Core info */}
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4 text-xs font-mono">
                        <span className="bg-navy-50 text-navy-950 border border-navy-100 px-2.5 py-0.5 rounded uppercase font-semibold">
                          {pub.category}
                        </span>
                        <span className="text-gray-400">
                          {pub.readingTime}
                        </span>
                      </div>

                      {/* Editorial Title */}
                      <h3 className="font-serif text-2xl font-bold text-navy-950 tracking-tight leading-snug mb-3">
                        {pub.title}
                      </h3>

                      <div className="flex gap-4 text-xs font-mono text-gray-400 mb-6">
                        <span>By {pub.author}</span>
                        <span>&bull;</span>
                        <span>{pub.publishedDate}</span>
                      </div>

                      <p className="font-sans text-sm text-gray-500 leading-relaxed line-clamp-4">
                        {pub.summary}
                      </p>
                    </div>

                    {/* Bottom CTA container */}
                    <div className="p-6 bg-navy-50/50 border-t border-navy-100 flex items-center justify-between">
                      <span className="font-mono text-[10px] text-gray-400">
                        File Type: PDF &mdash; {pub.pdfSize || "2.0 MB"}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setReadingPublication(pub)}
                          className="px-4 py-2 border border-navy-950 text-navy-950 hover:bg-navy-950 hover:text-white transition-all font-mono text-[10px] uppercase tracking-wider rounded font-bold"
                        >
                          Read Article
                        </button>
                        <a
                          href={pub.downloadUrl}
                          className="p-2 border border-gray-200 hover:border-navy-950 hover:text-navy-950 transition-colors text-gray-400 rounded"
                          title="Download PDF Copy"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Downloading publication: "${pub.title}" PDF layout. Complete formatting has been encoded.`);
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-16 text-center text-gray-400 font-sans">
                  No publications match your filter.
                </div>
              )}
            </div>

          </div>
        )}

        {/* ==================== PAGE: PROJECTS ==================== */}
        {currentPage === "projects" && (
          <div className="space-y-12 py-6" id="projects-view-canvas">
            {/* Header */}
            <div className="border-b border-navy-100 py-12">
              <span className="font-mono text-xs tracking-widest text-gray-500 uppercase block mb-3">
                Insightondia Empirical Case Files
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-navy-950 mb-4">
                Featured Projects
              </h1>
              <p className="font-sans text-gray-600 max-w-3xl leading-relaxed text-lg">
                Our network maintains dynamic investigative projects mapping long-term macro shifts. From localized supply chain friction to systemic hardware global races, explore our empirical conclusions.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-navy-50 pb-8">
              {/* Category selector */}
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {projCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedProjCategory(cat)}
                    className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider border rounded transition-all duration-150 ${
                      selectedProjCategory === cat
                        ? "bg-navy-950 text-white border-navy-950"
                        : "bg-white text-gray-500 border-gray-200 hover:border-navy-950 hover:text-navy-950"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search bar */}
              <div className="relative w-full sm:max-w-xs shrink-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search project scope..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full text-xs font-mono bg-white border border-gray-200 focus:border-navy-950 focus:outline-none transition-all rounded"
                />
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="projects-grid">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((proj) => (
                  <div key={proj.id} className="p-8 border border-navy-100 rounded-xl bg-white hover:border-navy-950 transition-all duration-150 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-mono text-[9px] bg-navy-50 border border-navy-100 px-2 py-0.5 text-navy-950 rounded uppercase font-semibold">
                          {proj.category}
                        </span>
                        <span className="font-mono text-xs text-gray-400">
                          {proj.publishedDate}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl font-bold text-navy-950 tracking-tight mb-3">
                        {proj.title}
                      </h3>

                      <p className="font-sans text-sm text-gray-500 leading-relaxed mb-6">
                        {proj.summary}
                      </p>

                      {/* Display metric if exists */}
                      {proj.metrics && (
                        <div className="grid grid-cols-2 gap-4 p-4 bg-navy-50 border border-navy-100 rounded-lg mb-6">
                          {proj.metrics.map((m, i) => (
                            <div key={i} className="text-left">
                              <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 block mb-0.5">
                                {m.label}
                              </span>
                              <span className="font-mono text-sm font-bold text-navy-950">
                                {m.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Key Finding callout */}
                      <div className="border-l-2 border-navy-950 pl-4 py-1.5 mb-6">
                        <span className="font-mono text-[10px] text-gray-400 block uppercase font-bold mb-0.5">
                          Structural Conclusion
                        </span>
                        <p className="font-sans text-xs sm:text-sm text-navy-950 italic leading-relaxed">
                          "{proj.keyFinding}"
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between text-xs font-mono text-gray-400">
                      <span>Investigated by {proj.author}</span>
                      <a 
                        href="#/join" 
                        className="text-navy-950 font-bold hover:underline flex items-center gap-1"
                      >
                        Request Dataset <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-16 text-center text-gray-400 font-sans">
                  No projects match your filter query.
                </div>
              )}
            </div>

          </div>
        )}

        {/* ==================== PAGE: BUSINESS SOLUTIONS ==================== */}
        {currentPage === "business" && (
          <div className="space-y-16 py-6" id="business-view-canvas">
            {/* Header */}
            <div className="border-b border-navy-100 py-12">
              <span className="font-mono text-xs tracking-widest text-gray-500 uppercase block mb-3">
                Insightondia Corporate & Organizational Support
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-navy-950 mb-4">
                Business Solutions
              </h1>
              <p className="font-sans text-gray-600 max-w-3xl leading-relaxed text-lg">
                Insightondia collaborates with local businesses, startups, and public organizations by providing empirical research, sector assessments, and board-level diagnostic advisory.
              </p>
            </div>

            {/* List of solutions (Bento layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="business-solutions-list">
              {BUSINESS_SOLUTIONS.map((sol, idx) => (
                <div key={idx} className="p-6 border border-navy-100 rounded-lg bg-white hover:border-navy-950 transition-all duration-150 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="font-mono text-xs text-navy-900 font-semibold block">
                      Solution 0{idx + 1}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-navy-950">
                      {sol.title}
                    </h3>
                    <p className="font-sans text-xs text-gray-500 leading-relaxed">
                      {sol.description}
                    </p>
                  </div>
                  
                  {/* Small bullet point lists of deliverables */}
                  <div className="border-t border-gray-100 pt-4 mt-6">
                    <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider block mb-2">
                      Key Deliverables
                    </span>
                    <ul className="space-y-1.5">
                      {sol.deliverables.map((del, i) => (
                        <li key={i} className="text-[11px] font-sans text-gray-600 flex items-start gap-1 leading-normal">
                          <Check className="w-3 h-3 text-navy-950 shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* INTERACTIVE SCOPING & INQUIRY CONFIGURATOR WIDGET */}
            <div className="bg-navy-950 text-white rounded-xl p-8 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8" id="scoping-configurator">
              
              {/* Form Input (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-gray-400" />
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-400 font-semibold">
                      Corporate Strategy Desk
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">
                    Request Diagnostic & Advisory Scope
                  </h3>
                  <p className="font-sans text-xs text-gray-300 leading-relaxed mt-2">
                    Submit your organization's parameters to our Strategy Node. We evaluate your vertical value chains, diagnose capital frictions, and deliver an empirical advisory scope within 24 hours.
                  </p>
                </div>

                {bizSuccessMessage && (
                  <div className="bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 p-3.5 rounded text-xs font-mono flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-emerald-300 uppercase tracking-wide text-[10px]">Inquiry Logged</div>
                      <p className="text-[11px] leading-relaxed mt-0.5">{bizSuccessMessage}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleBusinessSubmit} className="space-y-4">
                  {/* Company Name */}
                  <div>
                    <label htmlFor="company-name-input" className="block font-mono text-[10px] uppercase text-gray-400 mb-1">
                      Organization / Partner Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="company-name-input"
                      placeholder="e.g. Athena Retail Group"
                      value={scopingCompany}
                      onChange={(e) => setScopingCompany(e.target.value)}
                      className="bg-gray-900 border border-gray-800 text-xs text-white p-2.5 w-full focus:border-white focus:outline-none rounded"
                      required
                    />
                  </div>

                  {/* Work Email */}
                  <div>
                    <label htmlFor="company-email-input" className="block font-mono text-[10px] uppercase text-gray-400 mb-1">
                      Work Email / Point of Contact <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="company-email-input"
                      placeholder="e.g. director@company.com"
                      value={scopingEmail}
                      onChange={(e) => setScopingEmail(e.target.value)}
                      className="bg-gray-900 border border-gray-800 text-xs text-white p-2.5 w-full focus:border-white focus:outline-none rounded"
                      required
                    />
                  </div>

                  {/* Industrial Vertical (Required Custom Input) */}
                  <div>
                    <label htmlFor="vertical-input" className="block font-mono text-[10px] uppercase text-gray-400 mb-1">
                      Industrial Vertical <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="vertical-input"
                      placeholder="e.g. Healthcare / Tech / EdTech / Finance / Manufacturing"
                      value={scopeVertical}
                      onChange={(e) => setScopeVertical(e.target.value)}
                      className="bg-gray-900 border border-gray-800 text-xs text-white p-2.5 w-full focus:border-white focus:outline-none rounded"
                      required
                    />
                    <span className="text-[10px] text-gray-400 font-mono block mt-1">
                      Write your sector (e.g. Healthcare, Tech, EdTech, Finance, Energy).
                    </span>
                  </div>

                  {/* Solutions Looking For */}
                  <div>
                    <label htmlFor="solution-details-input" className="block font-mono text-[10px] uppercase text-gray-400 mb-1">
                      What kind of solutions are you looking for? <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="solution-details-input"
                      rows={3}
                      placeholder="e.g. We require a market-entry feasibility roadmap, competitor pricing benchmarks, and capital expenditure sensitivity models under export tariff volatility..."
                      value={solutionDetails}
                      onChange={(e) => setSolutionDetails(e.target.value)}
                      className="bg-gray-900 border border-gray-800 text-xs text-white p-2.5 w-full focus:border-white focus:outline-none rounded resize-none"
                      required
                    />
                  </div>

                  {/* Engagement Horizon & Objective */}
                  <div>
                    <label htmlFor="timeline-select" className="block font-mono text-[10px] uppercase text-gray-400 mb-1">
                      Target Engagement Horizon & Objective
                    </label>
                    <select
                      id="timeline-select"
                      value={timelineExpectation}
                      onChange={(e) => setTimelineExpectation(e.target.value)}
                      className="bg-gray-900 border border-gray-800 text-xs text-white p-2.5 w-full focus:border-white focus:outline-none rounded"
                    >
                      <option value="Immediate Diagnostic Audit (2-4 Weeks)">Immediate Diagnostic Audit (2-4 Weeks)</option>
                      <option value="Comprehensive Strategic Scoping (6-8 Weeks)">Comprehensive Strategic Scoping (6-8 Weeks)</option>
                      <option value="Quarterly Advisory & Board Monitoring">Quarterly Advisory & Board Monitoring</option>
                      <option value="Bespoke Quantitative Data Modeling">Bespoke Quantitative Data Modeling</option>
                    </select>
                  </div>

                  {/* Support Needs Toggles */}
                  <div>
                    <span className="block font-mono text-[10px] uppercase text-gray-400 mb-2">
                      Required Analytics Nodes
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {["Market Research", "Industry Analysis", "Competitive Benchmarking", "Growth Strategy", "Financial Dashboards", "Economic Research"].map((need) => {
                        const isSelected = selectedNeeds.includes(need);
                        return (
                          <button
                            type="button"
                            key={need}
                            id={`need-toggle-${need.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={() => toggleNeed(need)}
                            className={`p-2 border rounded text-left text-[11px] font-sans transition-all flex items-center justify-between ${
                              isSelected
                                ? "bg-white text-navy-950 border-white font-bold"
                                : "bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-600"
                            }`}
                          >
                            <span>{need}</span>
                            {isSelected && <Check className="w-3 h-3 text-navy-950 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    id="submit-business-inquiry-btn"
                    disabled={isSubmittingBiz}
                    className="w-full text-center py-3 bg-white text-navy-950 font-mono text-xs uppercase tracking-wider hover:bg-gray-100 transition-colors rounded font-bold flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isSubmittingBiz ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-navy-950" />
                        <span>Submitting Brief...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry & Request Diagnostic Brief</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Form Output Board Deck (7 cols) */}
              <div className="lg:col-span-7 bg-white text-navy-900 rounded-lg p-6 border border-gray-200 flex flex-col justify-between">
                {scopingOutput ? (
                  <div className="space-y-6" id="scoping-proposal-output">
                    <div className="flex justify-between items-start border-b border-navy-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded uppercase font-semibold">
                            ✓ Inquiry Logged
                          </span>
                          <span className="font-mono text-[9px] bg-navy-50 text-navy-950 border border-navy-100 px-2 py-0.5 rounded uppercase font-semibold">
                            Corporate Proposal Brief
                          </span>
                        </div>
                        <h4 className="font-serif text-xl font-bold text-navy-950 mt-2">
                          {scopingOutput.partner}
                        </h4>
                        <p className="text-xs text-gray-500 font-mono mt-0.5">
                          Contact: {scopingOutput.email}
                        </p>
                      </div>
                      <div className="text-right text-xs font-mono text-gray-400">
                        <div>ID: {scopingOutput.id}</div>
                        <div>{scopingOutput.date}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 block mb-0.5">Industrial Focus</span>
                        <span className="text-navy-900 font-semibold">{scopingOutput.vertical}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 block mb-0.5">Project Baseline</span>
                        <span className="text-navy-900 font-semibold">{scopingOutput.timeline}</span>
                      </div>
                    </div>

                    {scopingOutput.solutionTypes && (
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs font-sans">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-gray-500 block mb-1 font-semibold">
                          Solutions Scope Requested
                        </span>
                        <p className="text-gray-700 leading-relaxed italic">
                          "{scopingOutput.solutionTypes}"
                        </p>
                      </div>
                    )}

                    {scopingOutput.needs && scopingOutput.needs.length > 0 && (
                      <div>
                        <span className="font-mono text-[10px] uppercase text-gray-400 tracking-wider block mb-1.5">
                          Assigned Analytics Nodes
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {scopingOutput.needs.map((n: string) => (
                            <span key={n} className="bg-navy-50 text-navy-950 border border-navy-100 px-2 py-0.5 rounded text-[10px] font-mono font-medium">
                              {n}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <span className="font-mono text-[10px] uppercase text-gray-400 tracking-wider block mb-2">
                        Strategic Engagement Roadmap
                      </span>
                      <div className="space-y-3">
                        {scopingOutput.phases.map((phase: any, idx: number) => (
                          <div key={idx} className="p-3 bg-navy-50 border border-navy-100 rounded text-xs font-sans">
                            <div className="flex justify-between items-center font-semibold text-navy-950 mb-1">
                              <span>{phase.name}</span>
                              <span className="font-mono text-[10px] text-gray-400 font-normal">{phase.duration}</span>
                            </div>
                            <p className="text-gray-500 leading-relaxed text-[11px]">
                              {phase.details}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-navy-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>We will get back to you soon within 24 hours.</span>
                      </div>
                      <button
                        onClick={() => window.print()}
                        className="text-xs font-mono font-bold text-navy-950 hover:underline flex items-center gap-1 shrink-0"
                      >
                        Print Board Draft <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full min-h-[340px] flex flex-col items-center justify-center text-center p-8 text-gray-400 border border-dashed border-gray-200 rounded-lg">
                    <FileText className="w-12 h-12 text-gray-300 mb-3" />
                    <h4 className="font-serif text-lg font-semibold text-gray-600 mb-1">
                      No Inquiry Submitted Yet
                    </h4>
                    <p className="font-sans text-xs max-w-sm leading-relaxed">
                      Enter your organization name, specify your industrial vertical (e.g. Healthcare, Tech, EdTech, Finance), and describe the solutions you are looking for. Upon submission, our Strategy Desk will review your parameters and generate your formal engagement dossier.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ==================== PAGE: CURRENT AFFAIRS ==================== */}
        {currentPage === "current-affairs" && (
          <CurrentAffairs />
        )}

        {/* ==================== PAGE: DATA LAB ==================== */}
        {currentPage === "data-lab" && (
          <DataLab />
        )}

        {/* ==================== PAGE: COMMUNITY / JOIN US ==================== */}
        {currentPage === "join" && (
          <div className="space-y-16 py-6" id="join-us-canvas">
            {/* Header */}
            <div className="border-b border-navy-100 py-12">
              <span className="font-mono text-xs tracking-widest text-gray-500 uppercase block mb-3">
                Insightondia Global Youth Network
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-navy-950 mb-4">
                Join the Community
              </h1>
              <p className="font-sans text-gray-600 max-w-3xl leading-relaxed text-lg">
                We believe the next generation of economists should be active knowledge producers, not passive audience consumers. Establish a local chapter, join our elite research internships, or secure a full Fellowship.
              </p>
            </div>

            {/* Core initiatives list (Bento layout - 4 columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-b border-navy-100 pb-16" id="join-initiatives-list">
              {[
                { title: "Our Volunteership", desc: "Contribute to grassroots editorial projects, public discourse forums, youth webinars, and research dissemination across regional hubs.", cap: "Open Enrollment" },
                { title: "Student Research Fellowship", desc: "Our hallmark program. Work under dedicated senior contributors, secure academic co-authorship, and get published in our Annual Economic Report.", cap: "15 Scholars/Cohort" },
                { title: "Economic Club Network", desc: "Bring Insightondia's quantitative data frameworks directly to your campus. Establish a vetted local chapter, host debates, and lock-in micro-grants.", cap: "University Level" },
                { title: "Research Internship", desc: "A rigorous program. Tackle real corporate diagnostic audits, master advanced econometric modeling, and build interactive analytical dashboards.", cap: "Merit-Based Selection" }
              ].map((item, idx) => (
                <div key={idx} className="p-6 border border-navy-100 bg-white rounded-lg hover:border-navy-950 transition-all duration-150 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 block font-bold">
                      Program 0{idx + 1}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-navy-950">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-3 mt-6 flex justify-between items-center text-xs font-mono">
                    <span className="text-gray-400">Track</span>
                    <span className="font-bold text-navy-950">{item.cap}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Registration Form & Receipt Generator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="registration-block">
              {/* Form Input (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-navy-950 mb-2">
                    Submit Application
                  </h3>
                  <p className="font-sans text-xs text-gray-500 leading-relaxed">
                    Ready to produce original economic knowledge? Provide your details, select your programmatic track, and generate your academic diagnostic receipt.
                  </p>
                </div>

                <form onSubmit={handleJoinSubmit} className="space-y-4">
                  {/* Select Initiative */}
                  <div>
                    <label htmlFor="join-role-select" className="block font-mono text-[10px] uppercase text-gray-400 mb-1">
                      Target Initiative
                    </label>
                    <select
                      id="join-role-select"
                      value={joinRole}
                      onChange={(e) => setJoinRole(e.target.value)}
                      className="bg-white border border-gray-200 text-xs text-navy-950 p-2.5 w-full focus:border-navy-950 focus:outline-none rounded"
                    >
                      <option value="Our Volunteership">Our Volunteership</option>
                      <option value="Student Research Fellowship">Student Research Fellowship</option>
                      <option value="Economic Club Network">Economic Club Network</option>
                      <option value="Research Internship">Research Internship</option>
                    </select>
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="join-name-input" className="block font-mono text-[10px] uppercase text-gray-400 mb-1">
                      Full Academic Name
                    </label>
                    <input
                      type="text"
                      id="join-name-input"
                      placeholder="e.g. Kiratpreet Singh"
                      value={joinName}
                      onChange={(e) => setJoinName(e.target.value)}
                      className="bg-white border border-gray-200 text-xs text-navy-950 p-2.5 w-full focus:border-navy-950 focus:outline-none rounded"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="join-email-input" className="block font-mono text-[10px] uppercase text-gray-400 mb-1">
                      E-Mail Address
                    </label>
                    <input
                      type="email"
                      id="join-email-input"
                      placeholder="e.g. student@university.edu"
                      value={joinEmail}
                      onChange={(e) => setJoinEmail(e.target.value)}
                      className="bg-white border border-gray-200 text-xs text-navy-950 p-2.5 w-full focus:border-navy-950 focus:outline-none rounded"
                      required
                    />
                  </div>

                  {/* University */}
                  <div>
                    <label htmlFor="join-university-input" className="block font-mono text-[10px] uppercase text-gray-400 mb-1">
                      University or Institution Affiliation
                    </label>
                    <input
                      type="text"
                      id="join-university-input"
                      placeholder="e.g. St. Stephen's College / LSE"
                      value={joinUniversity}
                      onChange={(e) => setJoinUniversity(e.target.value)}
                      className="bg-white border border-gray-200 text-xs text-navy-950 p-2.5 w-full focus:border-navy-950 focus:outline-none rounded"
                      required
                    />
                  </div>

                  {/* Research Focus Area */}
                  <div>
                    <label htmlFor="join-focus-select" className="block font-mono text-[10px] uppercase text-gray-400 mb-1">
                      Proposed Research Focus Area
                    </label>
                    <select
                      id="join-focus-select"
                      value={joinFocus}
                      onChange={(e) => setJoinFocus(e.target.value)}
                      className="bg-white border border-gray-200 text-xs text-navy-950 p-2.5 w-full focus:border-navy-950 focus:outline-none rounded"
                    >
                      <option value="Global Economics">Global Economics & Central Banking</option>
                      <option value="Industry Research">Industry Value Chain Analytics</option>
                      <option value="Business Strategy">Business Models & Unit Economics</option>
                      <option value="Public Policy">Sovereign Policy & Regulatory Frictions</option>
                      <option value="Data & Analytics">Quantitative Models & Dashboards</option>
                    </select>
                  </div>

                  {/* Proposal Pitch Abstract */}
                  <div>
                    <label htmlFor="join-proposal-input" className="block font-mono text-[10px] uppercase text-gray-400 mb-1">
                      Research Abstract / Core Thesis (Optional)
                    </label>
                    <textarea
                      id="join-proposal-input"
                      rows={3}
                      placeholder="Briefly detail the economic force, central bank action, or industry value chain you intend to investigate..."
                      value={joinProposal}
                      onChange={(e) => setJoinProposal(e.target.value)}
                      className="bg-white border border-gray-200 text-xs text-navy-950 p-2.5 w-full focus:border-navy-950 focus:outline-none rounded font-sans leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    id="join-submit-btn"
                    className="w-full text-center py-3 bg-navy-950 text-white font-mono text-xs uppercase tracking-wider hover:bg-navy-900 transition-colors rounded font-bold"
                  >
                    Generate Diagnostic Receipt
                  </button>
                </form>
              </div>

              {/* Form Output Receipt (7 cols) */}
              <div className="lg:col-span-7 bg-navy-50 border border-navy-100 rounded-xl p-8 flex flex-col justify-between">
                {joinReceipt ? (
                  <div className="space-y-6" id="admission-receipt-output">
                    
                    {/* Header */}
                    <div className="flex justify-between items-start border-b border-navy-200 pb-4">
                      <div>
                        <span className="font-mono text-[9px] bg-navy-950 text-white px-2 py-0.5 rounded uppercase">
                          Academic Docket
                        </span>
                        <h4 className="font-serif text-xl font-bold text-navy-950 mt-2">
                          Application Received
                        </h4>
                      </div>
                      <div className="text-right text-xs font-mono text-gray-500">
                        <div>ID: {joinReceipt.id}</div>
                        <div>{joinReceipt.date}</div>
                      </div>
                    </div>

                    {/* Applicant details block */}
                    <div className="grid grid-cols-2 gap-4 text-xs font-sans bg-white p-4 rounded-lg border border-navy-100">
                      <div>
                        <span className="font-mono text-[9px] text-gray-400 block mb-0.5">Applicant</span>
                        <span className="text-navy-900 font-semibold">{joinReceipt.name}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-gray-400 block mb-0.5">Program Node</span>
                        <span className="text-navy-900 font-semibold">{joinReceipt.role}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-gray-400 block mb-0.5">Affiliation</span>
                        <span className="text-navy-900 font-semibold">{joinReceipt.university}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-gray-400 block mb-0.5">Proposed Area</span>
                        <span className="text-navy-900 font-semibold">{joinReceipt.focus}</span>
                      </div>
                    </div>

                    {/* Step Timeline roadmap */}
                    <div>
                      <span className="font-mono text-[10px] uppercase text-gray-400 tracking-wider block mb-3">
                        Candidate Evaluation Roadmap
                      </span>
                      <div className="space-y-4">
                        {joinReceipt.roadmap.map((phase: any, idx: number) => (
                          <div key={idx} className="flex gap-4 items-start">
                            <span className="w-6 h-6 rounded-full bg-navy-950 text-white flex items-center justify-center font-mono text-[10px] shrink-0 font-bold">
                              0{idx + 1}
                            </span>
                            <div className="font-sans text-xs">
                              <div className="flex items-baseline gap-2">
                                <h5 className="font-semibold text-navy-950">{phase.step}</h5>
                                <span className="font-mono text-[10px] text-gray-400">&bull; {phase.date}</span>
                              </div>
                              <p className="text-gray-500 leading-relaxed mt-0.5">{phase.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-navy-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Registered on Secure Registry #ISO99</span>
                      </div>
                      <button
                        onClick={() => window.print()}
                        className="text-xs font-mono font-bold text-navy-950 hover:underline flex items-center gap-1 bg-white border border-gray-200 px-3 py-1.5 rounded"
                      >
                        Print Interview Docket
                      </button>
                    </div>

                  </div>
                ) : (
                  <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8 text-gray-400 border border-dashed border-navy-200 rounded-lg bg-white">
                    <Users className="w-12 h-12 text-gray-300 mb-3" />
                    <h4 className="font-serif text-lg font-semibold text-gray-500 mb-1">
                      No Active Application
                    </h4>
                    <p className="font-sans text-xs max-w-sm leading-relaxed">
                      Please input your academic qualifications, choose your target program, write an abstract thesis concept, and click "Generate Diagnostic Receipt".
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ==================== GLOBAL IMMERSIVE READER DRAWER OVERLAY ==================== */}
      {readingPublication && (
        <div className="fixed inset-0 bg-navy-950/40 backdrop-blur-sm z-50 flex justify-end" id="immersive-article-reader">
          <div className="bg-white w-full max-w-4xl h-full shadow-2xl flex flex-col overflow-hidden animate-slide-left border-l border-navy-100">
            
            {/* Top Toolbar */}
            <div className="border-b border-navy-100 px-8 py-5 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase bg-navy-50 text-navy-950 px-2 py-0.5 border border-navy-100 rounded font-semibold">
                  {readingPublication.category}
                </span>
                <span className="font-mono text-xs text-gray-400">
                  {readingPublication.readingTime}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  id="reader-download-pdf-btn"
                  onClick={() => alert(`Downloading "${readingPublication.title}" publication PDF dossier. Document compiling success.`)}
                  className="p-2 border border-gray-100 hover:border-navy-950 text-gray-500 hover:text-navy-950 rounded transition-all"
                  title="Download Article PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  id="reader-close-btn"
                  onClick={() => setReadingPublication(null)}
                  className="p-2 border border-gray-100 hover:border-navy-950 text-gray-500 hover:text-navy-950 rounded transition-all"
                  title="Close Reader"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Immersive Scrollable Reading Canvas */}
            <div className="p-8 sm:p-12 overflow-y-auto flex-grow" id="reader-reading-body">
              <div className="max-w-2xl mx-auto space-y-8">
                
                {/* Title block */}
                <div className="space-y-4 border-b border-navy-100 pb-8">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-gray-400 block">
                    Insightondia Scholarly Ledger
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-navy-950 leading-tight">
                    {readingPublication.title}
                  </h1>
                  <div className="flex items-center gap-6 text-xs font-mono text-gray-400 pt-2">
                    <div>Author: <span className="font-sans font-semibold text-navy-900">{readingPublication.author}</span></div>
                    <div>Published: {readingPublication.publishedDate}</div>
                    <div>Archive Node: ISO-PUB-{readingPublication.id}</div>
                  </div>
                </div>

                {/* Visual Article Feature Image */}
                {readingPublication.id.includes("monetary") && (
                  <div className="rounded-lg overflow-hidden border border-navy-200 shadow-sm">
                    <img
                      src={articleImage}
                      alt={readingPublication.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto max-h-[360px] object-cover"
                    />
                    <div className="p-2 bg-slate-50 border-t border-navy-100 text-[11px] font-mono text-gray-500 flex justify-between items-center">
                      <span>Figure 1.0 • Empirical Macroeconomic Indicator Architecture</span>
                      <span className="text-[10px] uppercase font-bold text-navy-800">Insightondia Dossier</span>
                    </div>
                  </div>
                )}

                {/* Abstract Abstract Callout */}
                <div className="p-5 bg-navy-50 border border-navy-100 rounded-lg">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 block font-bold mb-1">
                    Abstract Synthesis
                  </span>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed italic">
                    "{readingPublication.summary}"
                  </p>
                </div>

                {/* Render Article body - Styled as custom rich text */}
                <div className="font-sans text-gray-700 space-y-6 leading-relaxed text-sm sm:text-base">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-navy-950 mt-8 mb-3">
                    1. Structural Paradigm & Background
                  </h3>
                  <p>
                    Every sovereign system rests upon an intricate scaffolding of fiscal policy, regulatory frictions, and labor elasticity. In this paper, we explore how macroeconomic changes in capital allocations and central bank interventions shift value chains across key global and local trade vectors.
                  </p>
                  
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-navy-950 mt-8 mb-3">
                    2. Econometric Observations
                  </h3>
                  <p>
                    Observational diagnostics from the last six quarters reveal a dynamic disconnect. While public consumption figures remain resilient, primary capital formation is increasingly focused within regional clusters backed by state-aligned subsidies. This geographical concentration increases the baseline shipping cost and limits access for micro-producers.
                  </p>

                  <div className="p-4 bg-navy-950 text-white rounded font-mono text-xs my-6 border border-navy-900 space-y-2">
                    <div className="font-bold text-gray-400 border-b border-gray-800 pb-1.5 uppercase tracking-wider text-[10px]">
                      Empirical Model: Structural Capital Elasticity
                    </div>
                    <div>Y = A * K^alpha * L^(1-alpha)</div>
                    <div className="text-gray-400 mt-1">
                      Where A represents the Logistics Velocity index, and K denotes Sovereign subsidies allocations.
                    </div>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-navy-950 mt-8 mb-3">
                    3. Strategic Framework Adjustments
                  </h3>
                  <p>
                    To insulate enterprise networks and public treasuries from this volatility, decision-makers must transition from generic just-in-time logistics to deep, redundancy-centric structures. Allocating 4% of GDP back to physical logistics corridors and establishing localized energy micro-grids remain the absolute predictors of sovereign competitiveness over the 10-year horizon.
                  </p>
                </div>

                <div className="border-t border-navy-100 pt-8 mt-12 text-center">
                  <div className="inline-block p-1 bg-navy-950 rounded-full mb-3" />
                  <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                    Insightondia Research Integrity Node &bull; End of Briefing
                  </p>
                </div>

              </div>
            </div>

            {/* Bottom Sticky CTA inside Drawer */}
            <div className="border-t border-navy-100 px-8 py-5 bg-navy-50 flex items-center justify-between shrink-0 text-xs font-mono text-gray-400">
              <span>PDF Docket &bull; {readingPublication.pdfSize || "2.0 MB"}</span>
              <button
                onClick={() => alert(`Downloading publication: "${readingPublication.title}" PDF layout.`)}
                className="px-4 py-2 bg-navy-950 text-white hover:bg-navy-900 font-mono text-[10px] uppercase tracking-wider transition-all rounded font-bold"
              >
                Download PDF Dossier
              </button>
            </div>

          </div>
        </div>
      )}

        {/* FOOTER */}
        <Footer onPageChange={handlePageChange} />

      </div>
    </div>
  );
}
