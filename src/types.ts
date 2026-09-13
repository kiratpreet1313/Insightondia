/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Publication {
  id: string;
  title: string;
  category: string;
  readingTime: string;
  author: string;
  publishedDate: string;
  summary: string;
  featured?: boolean;
  downloadUrl?: string;
  pdfSize?: string;
  contentMarkdown?: string;
}

export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  topics: string[];
}

export interface FeaturedProject {
  id: string;
  title: string;
  category: string;
  summary: string;
  keyFinding: string;
  metrics?: { label: string; value: string }[];
  author: string;
  publishedDate: string;
}

export interface CurrentAffairsAnalysis {
  id: string;
  title: string;
  summary: string;
  whyItHappened: string;
  whoBenefits: string[];
  whoLoses: string[];
  economicChanges: string;
  longTermConsequences: string;
  category: string;
  publishedDate: string;
}

export interface BusinessSolution {
  title: string;
  description: string;
  deliverables: string[];
}

export interface FutureInitiative {
  title: string;
  description: string;
  timeline: string;
  status: "Planning" | "In Progress" | "Launched";
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
}

