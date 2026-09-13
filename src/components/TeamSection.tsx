/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { TEAM_MEMBERS } from "../data";
import { TeamMember } from "../types";
import SketchUnderline from "./SketchUnderline";
import { 
  Users, 
  Mail, 
  Linkedin, 
  Twitter,
  Instagram
} from "lucide-react";

export default function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>(TEAM_MEMBERS);

  // Sync state if TEAM_MEMBERS changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem("insightondia_team_members");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const merged = TEAM_MEMBERS.map(defaultMember => {
            const found = parsed.find((m: TeamMember) => m.id === defaultMember.id);
            if (found) {
              return {
                ...defaultMember,
                ...found,
                email: defaultMember.email,
                linkedin: defaultMember.linkedin,
                twitter: defaultMember.twitter,
                instagram: defaultMember.instagram,
                imageUrl: found.imageUrl && !found.imageUrl.includes("images.unsplash.com") ? found.imageUrl : defaultMember.imageUrl
              };
            }
            return defaultMember;
          });
          setMembers(merged);
          return;
        }
      }
    } catch (err) {
      console.error("Failed to load team customization from localStorage:", err);
    }
    setMembers(TEAM_MEMBERS);
  }, []);

  return (
    <div className="space-y-4" id="team-section-container">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-2.5 gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] bg-[#0A1F44] text-white px-2 py-0.5 rounded uppercase font-bold tracking-widest flex items-center gap-1.5">
              <Users className="w-4 h-4 text-sky-300" />
              Leadership & Editorial Board
            </span>
            <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">
              3 CORE MEMBERS
            </span>
          </div>

          <h2 className="font-serif text-xl md:text-2xl font-extrabold text-[#0A1F44] leading-tight tracking-tight">
            <SketchUnderline variant="wave" color="sky">
              Meet Our Team
            </SketchUnderline>
          </h2>

          <p className="font-sans text-xs md:text-sm text-gray-500 max-w-2xl leading-relaxed">
            Insightondia is led by researchers and writers committed to explaining global macroeconomic forces.
          </p>
        </div>
      </div>

      {/* Team Cards Grid - Strictly vertical on mobile, 3 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5" id="team-members-grid">
        {members.map((member, index) => {
          return (
            <div 
              key={member.id}
              id={`team-card-${member.id}`}
              className="bg-white border-2 border-[#0A1F44] rounded-lg overflow-hidden shadow-[3px_3px_0px_#0A1F44] hover:shadow-[5px_5px_0px_#0A1F44] transition-all duration-200 flex flex-col justify-between group p-4 sm:p-5"
            >
              <div className="space-y-3">
                {/* Photo & Identity Header */}
                <div className="flex items-start gap-3.5 border-b border-gray-100 pb-3">
                  <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#0A1F44] bg-gray-100 transition-all duration-200">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] bg-[#0A1F44] text-white px-2 py-0.5 rounded font-bold">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#0A1F44] leading-snug">
                      {member.name}
                    </h3>
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold text-sky-700 uppercase tracking-wider block leading-tight">
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Member Bio */}
                <div>
                  <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions - Increased icon size */}
              <div className="pt-3 border-t border-gray-100 mt-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2 text-gray-500">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      title={`Email: ${member.email}`}
                      className="hover:text-[#0A1F44] hover:bg-slate-100 p-2 rounded transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      title="LinkedIn"
                      className="hover:text-[#0A1F44] hover:bg-slate-100 p-2 rounded transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.instagram && (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noreferrer"
                      title="Instagram"
                      className="hover:text-[#0A1F44] hover:bg-slate-100 p-2 rounded transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noreferrer"
                      title="X (Twitter)"
                      className="hover:text-[#0A1F44] hover:bg-slate-100 p-2 rounded transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                </div>

                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="font-mono text-[10px] sm:text-[11px] text-gray-500 hover:text-[#0A1F44] hover:underline truncate max-w-[140px] sm:max-w-[160px]"
                    title={`Email ${member.name}: ${member.email}`}
                  >
                    {member.email}
                  </a>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
