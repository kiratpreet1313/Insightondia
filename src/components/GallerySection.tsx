/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, Film, Maximize2, Camera } from "lucide-react";
import SketchUnderline from "./SketchUnderline";

// User-provided fieldwork & content photos
import explainingStudentsImg from "../assets/images/Explaining to students.jpeg";
import kiratPrincipalImg from "../assets/images/Kirat explaining to principal .jpeg";
import kiratContentImg from "../assets/images/Kirat creating content.54.45.jpeg.54.55 (1).jpeg";
import anshumanContentImg from "../assets/images/ANshuman Creating content.54.55.jpeg";
import onGroundSurveyImg from "../assets/images/On ground survey.01.17.jpeg";

// Photos on the vintage film tape strip
const FILM_PHOTOS = [
  {
    id: "film-1",
    title: "Explaining to Students",
    caption: "Economics Outreach & Youth Literacy",
    description: "Conducting interactive classroom sessions to break down complex macroeconomic concepts, trade mechanisms, and financial dynamics for high school and university students.",
    imageUrl: explainingStudentsImg
  },
  {
    id: "film-2",
    frameNumber: "02A",
    title: "Kirat Explaining to Principal",
    caption: "Academic Leadership Briefing",
    description: "Founder Kiratpreet Singh presenting Insightondia's youth research initiative, curriculum framework, and institutional engagement models directly to the school principal.",
    imageUrl: kiratPrincipalImg
  },
  {
    id: "film-3",
    frameNumber: "03A",
    title: "Kirat Creating Content",
    caption: "Research Production & Narrative Studio",
    description: "Drafting, recording, and curating macroeconomic explainers—deconstructing global geopolitical shifts, trade shocks, and sovereign interest rate decisions into clear analysis.",
    imageUrl: kiratContentImg
  },
  {
    id: "film-4",
    frameNumber: "04A",
    title: "Anshuman Creating Content",
    caption: "Editorial Studio & Production",
    description: "Content Head Anshuman Rishi developing visual storyboards and research briefs, bringing industrial case studies and macroeconomic trends to life across digital platforms.",
    imageUrl: anshumanContentImg
  },
  {
    id: "film-5",
    frameNumber: "05A",
    title: "On Ground Survey",
    caption: "Field Research & Data Gathering",
    description: "Carrying out firsthand ground surveys and community observations to understand real-world economic impacts, consumer sentiments, and market dynamics on the ground.",
    imageUrl: onGroundSurveyImg
  }
];

export default function GallerySection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<typeof FILM_PHOTOS[0] | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 420;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="space-y-4" id="gallery-section-container">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-2.5 gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] bg-[#0A1F44] text-white px-2 py-0.5 rounded uppercase font-bold tracking-widest flex items-center gap-1.5">
              <Camera className="w-3 h-3 text-sky-300" />
              Fieldwork & Delegations
            </span>
          </div>

          <h2 className="font-serif text-xl md:text-2xl font-extrabold text-[#0A1F44] leading-tight tracking-tight">
            <SketchUnderline variant="wave" color="sky">
              In the Room
            </SketchUnderline>
          </h2>

          <p className="font-sans text-xs md:text-sm text-gray-500 max-w-2xl leading-relaxed">
            Unfiltered glimpses from our youth policy camps, field research delegations, strategy retreats, and grassroots summits.
          </p>
        </div>
      </div>

      {/* Film Tape Strip Container - extended horizontally with subtle breathing padding before footer */}
      <div className="-mx-3 sm:-mx-6 md:-mx-8 px-1 sm:px-2 md:px-3 mt-2 mb-1 sm:mb-2 pb-1 relative select-none" id="film-strip-gallery">
        {/* Tape Navigation Controls */}
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll Film Left"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#111]/90 text-sky-300 border-2 border-sky-500/40 shadow-xl flex items-center justify-center hover:bg-black hover:text-sky-200 hover:scale-105 active:scale-95 transition-all backdrop-blur-xs"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={() => scroll("right")}
          aria-label="Scroll Film Right"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#111]/90 text-sky-300 border-2 border-sky-500/40 shadow-xl flex items-center justify-center hover:bg-black hover:text-sky-200 hover:scale-105 active:scale-95 transition-all backdrop-blur-xs"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

      {/* 1900s Celluloid Film Negative Strip */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto scrollbar-none pt-2 pb-0 px-1 scroll-smooth cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="inline-flex items-center bg-[#111215] border-y-4 border-[#08080a] shadow-[0_12px_30px_rgba(0,0,0,0.35)] rounded-md px-3 sm:px-4 py-4">
          {FILM_PHOTOS.map((photo, index) => (
            <div key={photo.id} className="flex items-center">
              {/* Individual Film Frame Negative */}
              <div 
                onClick={() => setSelectedPhoto(photo)}
                className="group relative flex flex-col bg-[#18191d] rounded-sm border border-neutral-800 shadow-inner mx-2.5 transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                style={{ width: "320px" }}
              >
                {/* Top Sprocket Perforations */}
                <div className="flex items-center justify-between px-3 py-2 bg-[#121316] border-b border-neutral-800/80">
                  <div className="flex space-x-3.5 w-full justify-between">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-4 bg-[#0a0a0c] rounded-[2px] border border-neutral-700/50 shadow-inner"
                      />
                    ))}
                  </div>
                </div>

                {/* Photo Cell / Exposure Window */}
                <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden mx-3 my-2 border-2 border-neutral-800 shadow-md">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter contrast-[1.05] brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Subtle 1900s Grain & Light Leak Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-sky-950/20 pointer-events-none opacity-80 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Hover Inspect Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-black/75 text-sky-300 text-xs font-mono font-bold px-3 py-1.5 rounded-full border border-sky-400/40 flex items-center gap-1.5 backdrop-blur-xs shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5" /> View Exposure
                    </span>
                  </div>
                </div>

                {/* Frame Caption & Description */}
                <div className="px-3 pb-2 pt-0.5 space-y-1">
                  <div className="flex items-center justify-between gap-1.5">
                    <h4 className="font-serif text-xs font-bold text-white tracking-wide truncate group-hover:text-sky-300 transition-colors">
                      {photo.title}
                    </h4>
                    <span className="text-[9px] font-mono text-sky-400/90 whitespace-nowrap bg-sky-950/70 border border-sky-900/60 px-1.5 py-0.5 rounded">
                      {photo.caption}
                    </span>
                  </div>
                  <p className="font-sans text-[11px] text-neutral-400 leading-snug line-clamp-2">
                    {photo.description}
                  </p>
                </div>

                {/* Bottom Sprocket Perforations */}
                <div className="flex items-center justify-between px-3 py-2 bg-[#121316] border-t border-neutral-800/80">
                  <div className="flex space-x-3.5 w-full justify-between">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-4 bg-[#0a0a0c] rounded-[2px] border border-neutral-700/50 shadow-inner"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Film Frame Cut Separator */}
              {index < FILM_PHOTOS.length - 1 && (
                <div className="h-48 w-1 bg-neutral-800/60 mx-1 flex flex-col justify-around py-4">
                  <div className="w-full h-2 bg-neutral-900" />
                  <div className="w-full h-2 bg-neutral-900" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Lightbox / Zoom View */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#111] p-3 sm:p-5 rounded-xl border border-neutral-700 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-2 pb-3 border-b border-neutral-800 text-sky-300 font-mono text-xs">
              <span className="flex items-center gap-2 font-bold tracking-wider">
                <Film className="w-4 h-4 text-sky-400" />
                {selectedPhoto.title}
              </span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative aspect-[16/10] max-h-[62vh] w-full bg-black mt-3 rounded-lg overflow-hidden border border-neutral-800 flex items-center justify-center">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-3 p-3 bg-neutral-900/90 rounded-lg border border-neutral-800 space-y-1 text-left">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-serif font-bold text-white tracking-wide">
                  {selectedPhoto.title}
                </h3>
                <span className="text-[10px] font-mono text-sky-300 uppercase tracking-widest bg-sky-950/80 border border-sky-700/60 px-2 py-0.5 rounded">
                  {selectedPhoto.caption}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans pt-0.5">
                {selectedPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
