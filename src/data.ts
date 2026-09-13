/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ResearchArea,
  FeaturedProject,
  CurrentAffairsAnalysis,
  Publication,
  BusinessSolution,
  FutureInitiative,
  TeamMember
} from "./types";

import kiratpreetImg from "./assets/images/founder_kiratpreet.jpg";
import anjlinaImg from "./assets/images/cofounder_anjlina.jpg";
import anshumanImg from "./assets/images/content_head_anshuman.jpg";


export const STATISTICS = [
  { label: "Research Articles", value: "100+" },
  { label: "Industry Reports", value: "20+" },
  { label: "Research Projects", value: "10+" },
  { label: "Community Members", value: "500+" },
  { label: "Research Contributors", value: "15+" }
];

export const RESEARCH_AREAS: ResearchArea[] = [
  {
    id: "global-economics",
    title: "Global Economics",
    description: "Analyzing the systemic forces anchoring the global system: central banking, fiscal actions, trade networks, and currency valuations.",
    topics: [
      "Macroeconomic trends",
      "Inflation & purchasing power",
      "Interest rates & credit cycles",
      "Central bank monetary policies",
      "Global trade & bilateral tariffs",
      "Currencies & reserve assets",
      "Sovereign growth models",
      "Recession triggers & dynamics"
    ]
  },
  {
    id: "industry-research",
    title: "Industry Research",
    description: "Granular microeconomic studies detailing industrial output, technological shifts, resource constraints, and value chains across traditional and emerging sectors.",
    topics: [
      "Technology & platform economics",
      "Healthcare markets & delivery cost",
      "Energy transition & grid economics",
      "Advanced manufacturing",
      "Retail & consumption channels",
      "Luxury goods & premium markets",
      "Automobile & transport tech",
      "Financial services & fintech",
      "Real Estate & land economics",
      "Agriculture & food security",
      "Media & advertising economics",
      "Sports Business & enterprise structures"
    ]
  },
  {
    id: "business-strategy",
    title: "Business Strategy",
    description: "Deconstructing corporate competition, unit economics, market structures, and the structural dynamics that govern firm survival and expansion.",
    topics: [
      "Competitive benchmarking",
      "Industry structure & oligopolies",
      "Business model design",
      "Market entry & dynamics",
      "Consumer behavior & demand elasticity",
      "Growth strategies & scaling constraints",
      "Corporate finance & capital allocation",
      "Strategic case studies"
    ]
  },
  {
    id: "public-policy",
    title: "Public Policy",
    description: "Evaluating the economic consequences of state interventions: regulatory frameworks, tax structures, labor reforms, and public capital deployments.",
    topics: [
      "Government policies & impact studies",
      "Taxation systems & incentive design",
      "Regulatory compliance & market frictions",
      "Economic reforms & liberalization",
      "Infrastructure development funding",
      "Public finance & debt sustainability",
      "Labor markets & structural employment",
      "Welfare economics & transfers"
    ]
  },
  {
    id: "data-analytics",
    title: "Data & Analytics",
    description: "Building the quantitative foundations of research through active financial modeling, forecasting frameworks, and interactive public databases.",
    topics: [
      "Interactive data dashboards",
      "Quantitative financial modeling",
      "Macroeconomic forecasting",
      "Proprietary industry databases",
      "Economic visualization & cartography",
      "Market intelligence streams",
      "Time-series econometrics"
    ]
  },
  {
    id: "current-affairs",
    title: "Current Affairs",
    description: "Bypassing clickbait headlines to analyze the structural undercurrents, asset flows, and regulatory pressures driving weekly global events.",
    topics: [
      "Structural event breakdown",
      "Stakeholder payoff matrices",
      "Capital reallocation vectors",
      "Macro-regulatory changes",
      "Long-term policy adjustments",
      "Geopolitical risk pricing"
    ]
  }
];

export const PRODUCTS_WE_PRODUCE = [
  {
    title: "Research Papers",
    description: "Long-form academic inquiries detailing original hypotheses, econometric validation, and structural conclusions."
  },
  {
    title: "Industry Reports",
    description: "Exhaustive deep-dives into vertical markets, evaluating competitive moats, technological disruptions, and value chains."
  },
  {
    title: "Economic Briefs",
    description: "Concise, data-rich analysis on immediate macroeconomic policy actions and regional indicators."
  },
  {
    title: "Policy Notes",
    description: "Rigorous evaluations of state bills, active regulations, and public budget allocations."
  },
  {
    title: "Business Strategy Reports",
    description: "Deconstructions of corporate business models, competitive dynamics, and structural unit economics."
  },
  {
    title: "Interactive Dashboards",
    description: "Web-native data explorers providing direct agency to filter and analyze custom datasets."
  },
  {
    title: "Data Visualizations",
    description: "Stunning, magazine-grade visual translations of complex multidimensional financial information."
  },
  {
    title: "Market Intelligence",
    description: "Continuous tracking of industrial metrics, consumer patterns, and trade flows."
  },
  {
    title: "Financial Models",
    description: "Open-source spreadsheet architectures enabling direct sensitivity analyses of markets."
  },
  {
    title: "Infographics",
    description: "Elegant, high-density diagrams mapping structural networks and capital channels."
  },
  {
    title: "Explainer Videos",
    description: "Visually arrested, script-driven mini-documentaries translating high economics for the public."
  },
  {
    title: "Weekly Newsletters",
    description: "Delivering structural breakdowns of complex weekly developments directly to your inbox."
  }
];

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "economics-of-ai",
    title: "The Economics of Artificial Intelligence",
    category: "Technology",
    summary: "Deconstructing the structural unit economics of foundational models, compute infrastructure cost projections, and the potential capital-labor substitution rates in knowledge-intensive industries.",
    keyFinding: "The marginal cost of intelligence drops by 90%, shifting the value chain from software generation to proprietary context and hardware capital.",
    metrics: [
      { label: "Est. Productivity Gain", value: "+2.3% CAGR" },
      { label: "Hardware Capex Flow", value: "$450B" }
    ],
    author: "Aditya Vardhan",
    publishedDate: "May 2026"
  },
  {
    id: "indias-manufacturing-future",
    title: "India's Manufacturing Future",
    category: "Global Economics",
    summary: "An econometric evaluation of India's Production-Linked Incentive (PLI) schemes, logistics friction, structural labor supply shifts, and the path to 25% GDP contribution.",
    keyFinding: "Logistics cost reduction to 8% of GDP is critical to unlock export competitiveness, as manufacturing hubs shift to southern coastal clusters.",
    metrics: [
      { label: "Target Share of GDP", value: "25.0%" },
      { label: "PLI Capital Outlay", value: "₹1.97 Lakh Cr" }
    ],
    author: "Sneha Nair",
    publishedDate: "April 2026"
  },
  {
    id: "semiconductor-race",
    title: "Global Semiconductor Race",
    category: "Industry Research",
    summary: "Mapping the geopolitical and economic moats of extreme ultraviolet (EUV) lithography, sub-3nm foundry capacity distribution, and domestic fabrication capital subsidies.",
    keyFinding: "Subsidized domestic duplication of fabs leads to structural supply gluts in legacy nodes while advanced node production remains high-risk and concentrated.",
    metrics: [
      { label: "Advanced Foundry Moat", value: "92% TSMC Share" },
      { label: "Global Subsidy Pool", value: "$280B" }
    ],
    author: "Kabir Sen",
    publishedDate: "March 2026"
  },
  {
    id: "future-of-water-markets",
    title: "The Future of Water Markets",
    category: "Public Policy",
    summary: "Assessing water property rights, dynamic scarcity pricing mechanisms, and the economic performance of index-based hydrological derivative trading.",
    keyFinding: "Structured water trading markets incentivize 40% higher agricultural irrigation efficiency and mitigate crop-failure risk across arid arable belts.",
    author: "Ananya Deshmukh",
    publishedDate: "February 2026"
  },
  {
    id: "economics-behind-ipl",
    title: "Economics Behind IPL",
    category: "Sports Business",
    summary: "Deconstructing media rights bid models, franchisee valuation multiples, advertising yield formulas, and player auction game theory models.",
    keyFinding: "The shift from linear TV to digital streaming triggers auction dynamics that elevate franchise valuations to double-digit revenue multiples.",
    author: "Rohan Kapoor",
    publishedDate: "January 2026"
  },
  {
    id: "digital-payments-rise",
    title: "Rise of Digital Payments",
    category: "Data & Analytics",
    summary: "Tracing UPI volume growth, merchant MDR structures, public digital infrastructure externalities, and the economic substitution of cash.",
    keyFinding: "Zero-fee UPI architecture generates secondary digital footprint records that unlock credit access for 150 million previously unbanked micro-merchants.",
    author: "Meera Joshi",
    publishedDate: "December 2025"
  },
  {
    id: "china-vs-india-strategy",
    title: "China vs India Industrial Strategy",
    category: "Global Economics",
    summary: "A comparative structural analysis of dual-circulation strategies, national champions, Special Economic Zones (SEZs), and export-led credit growth models.",
    keyFinding: "India's service-led growth model bypasses early physical bottlenecks but faces labor-absorption limits that require a robust domestic manufacturing layer.",
    author: "Vikram Malhotra",
    publishedDate: "November 2025"
  },
  {
    id: "fortune-500-founders",
    title: "Fortune 500 Founder Research",
    category: "Business Strategy",
    summary: "An analytical study mapping founder backgrounds, initial capital allocations, corporate turnarounds, and systemic equity structures across major firms.",
    keyFinding: "Internal cash flow generation underpins 80% of long-term sector outperformance, minimizing dependency on high-cost volatile capital markets.",
    author: "Divya Sharma",
    publishedDate: "October 2025"
  },
  {
    id: "why-countries-become-rich",
    title: "Why Some Countries Become Rich",
    category: "Global Economics",
    summary: "Investigating historical institutional structures, property-rights enforceability, capital deepness, technological absorption, and the middle-income trap.",
    keyFinding: "Inclusive institutions coupled with systematic human capital deepness are the absolute structural predictors of high-income transition.",
    author: "Rishi Raj",
    publishedDate: "September 2025"
  },
  {
    id: "supply-chain-wars",
    title: "Supply Chain Wars",
    category: "Industry Research",
    summary: "Analyzing the transition from just-in-time logistics to just-in-case inventory buffers, decoupling mechanisms, friend-shoring, and critical mineral cartels.",
    keyFinding: "Redundancy-centric supply structures increase baseline manufacturing costs by 4-7% but safeguard against multi-billion dollar single-point failures.",
    author: "Tanmay Rao",
    publishedDate: "August 2025"
  },
  {
    id: "electric-vehicle-revolution",
    title: "Electric Vehicle Revolution",
    category: "Industry Research",
    summary: "Deconstructing lithium-ion gigafactory capital structures, battery chemistry cost curves, sovereign charging grid rollouts, and internal combustion vehicle retirements.",
    keyFinding: "Sodium-ion chemistry scaling offers a buffer against lithium-nickel supply chains, unlocking affordable short-range urban logistics fleets.",
    author: "Pooja Mehta",
    publishedDate: "July 2025"
  }
];

export const BUSINESS_SOLUTIONS: BusinessSolution[] = [
  {
    title: "Market Research",
    description: "Deep qualitative and quantitative analysis of consumer demand patterns, pricing thresholds, and distribution channel structures.",
    deliverables: ["Addressable market sizing maps", "Consumer demand elasticity models", "Distribution friction diagnostic audits"]
  },
  {
    title: "Industry Analysis",
    description: "Deconstructing sectoral value chains, cost drivers, regulatory hurdles, and technological paradigms shaping market segments.",
    deliverables: ["Vertical integration assessments", "Input material cost curve indices", "Regulatory transition risk exposure matrices"]
  },
  {
    title: "Competitive Benchmarking",
    description: "Rigorous performance evaluations of competitor unit economics, operational metrics, product margins, and strategic moats.",
    deliverables: ["Competitor cost-structure models", "Product feature value matrices", "Operational productivity ratios"]
  },
  {
    title: "Growth Strategy",
    description: "Identifying optimal product-market fits, geographic expansions, and strategic adjacencies backed by empirical data.",
    deliverables: ["Scenario planning matrices", "Capital expenditure efficiency models", "Organic vs inorganic growth decision frameworks"]
  },
  {
    title: "Consumer Insights",
    description: "Mapping buying behaviors, brand positioning perceptions, and churn indicators through advanced quantitative survey methods.",
    deliverables: ["Brand alignment maps", "Customer lifetime value forecasting engines", "Cohort retention analytics dashboards"]
  },
  {
    title: "Financial Dashboards",
    description: "Building interactive corporate finance monitors, operational cost trackers, and real-time cash flow run-rate visualizations.",
    deliverables: ["Interactive Excel/Web budget templates", "Scenario sensitivity calculators", "Treasury and cash flow runway monitors"]
  },
  {
    title: "Economic Research",
    description: "Sovereign macro-indicators, policy shifts, interest rate exposures, and regional growth projections tailored to firm operations.",
    deliverables: ["Sovereign risk indexes", "Inflation hedging strategy reports", "Regional infrastructure accessibility audits"]
  },
  {
    title: "Decision Support",
    description: "Providing on-call advisory briefs, Board-ready economic summaries, and rigorous data models for complex corporate situations.",
    deliverables: ["Board-level strategic decks", "Pre-investment underwriting reviews", "Independent macroeconomic opinions"]
  }
];

export const FUTURE_INITIATIVES: FutureInitiative[] = [
  {
    title: "Student Research Fellowship",
    description: "A prestigious, multi-month program mentoring elite young economists in empirical methods, data analytics, and policy writing.",
    timeline: "Launching Cohort 3: Fall 2026",
    status: "In Progress"
  },
  {
    title: "Economics Club Network",
    description: "Establishing rigorous chapters at leading universities to democratize structural economics and host debate panels.",
    timeline: "Targeting 25 active chapters",
    status: "Planning"
  },
  {
    title: "Research Internship Program",
    description: "Full-time summer placements working side-by-side with senior contributors on active client and public research papers.",
    timeline: "Applications open November",
    status: "Launched"
  },
  {
    title: "Annual Economic Report",
    description: "Our landmark yearly publication detailing structural shifts in international trade, labor, and capital allocation trends.",
    timeline: "Release date December 2026",
    status: "In Progress"
  },
  {
    title: "Youth Policy Lab",
    description: "A sandbox environment drafting legislative proposals and regulatory suggestions tailored to dynamic digital sectors.",
    timeline: "Initial whitepapers under draft",
    status: "Planning"
  },
  {
    title: "Industry Research Groups",
    description: "Sub-specialized nodes focusing purely on advanced tech, luxury goods, energy transition, and sovereign finance.",
    timeline: "Operational with monthly briefings",
    status: "Launched"
  },
  {
    title: "Economic Data Platform",
    description: "An open-access, API-driven terminal hosting curated datasets, charting interfaces, and regional macro-indicators.",
    timeline: "Beta interface launching soon",
    status: "In Progress"
  },
  {
    title: "Research Competitions",
    description: "Global challenges encouraging secondary school and undergraduate students to solve complex industry case studies.",
    timeline: "Next event: Spring 2027",
    status: "Planning"
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: "monetary-dilemmas-2026",
    title: "Monetary Dilemmas in the Post-Inflation Era",
    category: "Global Economics",
    readingTime: "14 min read",
    author: "Aditya Vardhan",
    publishedDate: "July 12, 2026",
    summary: "An exhaustive analysis of central bank balance sheet normalization, structural inflation floors driven by deglobalization, and the limits of policy rate hikes in highly indebted sovereign systems.",
    featured: true,
    pdfSize: "2.4 MB",
    downloadUrl: "#",
    contentMarkdown: `## Executive Summary
For the first time in two decades, global central banks face a structural, rather than cyclical, inflation floor. The historical drivers of structural disinflation—rapidly expanding global labor supplies, frictionless trade, and cheap hydrocarbon energy—are undergoing dynamic reversals. 

This paper investigates how central banks must manage balance sheet contraction in highly leveraged sovereign systems without triggering liquidity crunches.

## Key Insights
1. **The Neutral Rate Disconnect**: The real natural interest rate ($r^*$) has risen globally due to unprecedented capital expenditures required for green energy transitions and localizing supply chains.
2. **Balance Sheet Consequentialism**: Quantitative tightening (QT) has non-linear effects on commercial banking reserves, indicating liquidity shortages will occur long before central banks reach historical baselines.
3. **Debt Consolidation Frictions**: In systems with sovereign debt-to-GDP ratios exceeding 110%, high nominal interest rates create fiscal dominance feedback loops that erode monetary policy independence.`
  },
  {
    id: "generative-ai-value-chain-2026",
    title: "Generative AI and the Industrial Value Chain",
    category: "Industry Research",
    readingTime: "18 min read",
    author: "Sneha Nair",
    publishedDate: "June 28, 2026",
    summary: "Deconstructing the corporate value capture in the AI stack. We evaluate capital investments across hardware fabrication, model training, application wrappers, and proprietary data moats.",
    featured: true,
    pdfSize: "3.8 MB",
    downloadUrl: "#",
    contentMarkdown: `## Executive Summary
The commercial frenzy surrounding Generative Artificial Intelligence (GenAI) has masked critical questions of value capture. This report applies Porter's Five Forces and classical economic rent theory to map capital-efficiency and long-term moats across the three main layers of the AI ecosystem: compute hardware, foundational models, and custom software integrations.

## Core Findings
1. **The Compute Monopsony**: As fabrication remains physically limited by lithography tooling, hardware providers capture up to 75% of early software capital expenditure, behaving as rent-seeking gateways.
2. **Foundational Model Commoditization**: Open-source parity acts as a price anchor, forcing commercial closed models to aggressively discount API access, destroying capital efficiency for stand-alone model developers.
3. **Contextual Superiority**: High-margin enterprise moats belong exclusively to players possessing non-replicable, operational telemetry datasets.`
  },
  {
    id: "sovereign-wealth-funds-2026",
    title: "The Strategic Reorientation of Sovereign Wealth Funds",
    category: "Business Strategy",
    readingTime: "11 min read",
    author: "Kabir Sen",
    publishedDate: "June 05, 2026",
    summary: "Analyzing the global reallocation of sovereign capital. Gulf and Scandinavian funds are shifting allocations from public equities to private credit, domestic infrastructure, and advanced defense tech.",
    featured: false,
    pdfSize: "1.9 MB",
    downloadUrl: "#",
    contentMarkdown: `## Overview
Sovereign Wealth Funds (SWFs) managing over $12 Trillion are undergoing a historic structural shift. Under pressure to deliver both domestic industrial transformations and high-yielding returns in a volatile global macro environment, capital allocators are leaving traditional public liquid portfolios.

## Emerging Trends
- **The Private Credit Surge**: Fills the regulatory void left by traditional commercial banks retreating from high-leverage lending.
- **National Strategic Mandates**: Combining traditional ROI targets with national priorities like securing critical minerals, semiconductor fabs, and deep energy transition infrastructure.`
  },
  {
    id: "logistics-infrastructure-india-2026",
    title: "Optimizing Logistics Infrastructure in Emerging India",
    category: "Public Policy",
    readingTime: "15 min read",
    author: "Ananya Deshmukh & Rishi Raj",
    publishedDate: "May 19, 2026",
    summary: "A quantitative assessment of PM GatiShakti, dedicated freight corridors, and multi-modal logistics parks on regional trade elasticity and shipping overheads.",
    featured: false,
    pdfSize: "3.1 MB",
    downloadUrl: "#",
    contentMarkdown: `## Structural Analysis
India's historical logistics friction has cost an estimated 13-14% of GDP, compared to the OECD benchmark of 8%. This disparity functions as an effective tax on domestic manufacturing.

This policy study maps the physical progress of Dedicated Freight Corridors (DFCs) and quantifies their impact on average freight speeds and regional industrial clustering.

## Policy Conclusions
- **Velocity Uplift**: Rail freight velocities on completed DFC segments have increased from 25 km/h to 60 km/h, reducing container transit times between major inland dry ports and maritime terminals by 40%.
- **Clustering Incentives**: Connecting multi-modal logistics parks directly to DFC corridors stimulates regional secondary industry, enhancing job density in Tier-2 districts.`
  },
  {
    id: "luxury-goods-demographics-2026",
    title: "The Changing Economics of Global Luxury Goods",
    category: "Industry Research",
    readingTime: "10 min read",
    author: "Rohan Kapoor",
    publishedDate: "April 30, 2026",
    summary: "Investigating the resiliency of absolute luxury versus aspirational consumption channels under global interest rate pressures and shifting Asian demographic profiles.",
    featured: false,
    pdfSize: "1.7 MB",
    downloadUrl: "#",
    contentMarkdown: `## Abstract
This industry brief explores the structural split in the luxury market. While 'Aspirational Luxury' (consumer cohorts experiencing high credit reliance) has dropped significantly due to elevated mortgage rates and cooling wealth effects, 'Absolute Luxury' brands maintain pricing power and volume growth, buoyed by highly concentrated, asset-rich demographics.`
  },
  {
    id: "fintech-disruption-credit-2026",
    title: "Fintech Disruption and the Democratization of MSME Credit",
    category: "Data & Analytics",
    readingTime: "13 min read",
    author: "Meera Joshi",
    publishedDate: "March 11, 2026",
    summary: "How transaction-flow underwriting, public data systems (Account Aggregators), and digital cash flow modeling are closing the multi-billion dollar MSME credit gap.",
    featured: false,
    pdfSize: "2.8 MB",
    downloadUrl: "#",
    contentMarkdown: `## MSME Credit Landscapes
Micro, Small, and Medium Enterprises (MSMEs) form the backbone of developing markets, yet they systematically lack access to formal credit due to collateral requirements. 

This paper evaluates how cash-flow based underwriting, relying on GST and UPI telemetry via the Account Aggregator network, is shifting lending from asset-backed parameters to real-time transactional velocity.`
  }
];

export const CURRENT_AFFAIRS_ANALYSIS: CurrentAffairsAnalysis[] = [];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "kiratpreet-singh",
    name: "Kiratpreet Singh",
    role: "Founder & Lead Researcher",
    bio: "Pioneering youth-led economic research at Insightondia. Focused on global macroeconomics, monetary policy, sovereign capital flows, and macroeconomic modeling.",
    imageUrl: kiratpreetImg,
    email: "founder@insightondia.in",
    linkedin: "https://www.linkedin.com/in/kiratpreet-singh-2009-/",
    twitter: "https://x.com/kiratpreet12872"
  },
  {
    id: "anjlina-rishi",
    name: "Anjlina Rishi",
    role: "Co-Founder & Content Writer",
    bio: "Deconstructing complex economic theories into compelling editorial narratives. Leading content synthesis and research publications across global trade and policy.",
    imageUrl: anjlinaImg,
    email: "cofounder@insightondia.in",
    linkedin: "https://www.linkedin.com/in/anjlina-rishi-3b48b4428/"
  },
  {
    id: "anshuman-rishi",
    name: "Anshuman Rishi",
    role: "Content Head",
    bio: "Directing editorial standards, research briefs, and industry deep-dives. Overseeing quality assurance across all quantitative and qualitative publications.",
    imageUrl: anshumanImg,
    email: "content@insightondia.in",
    instagram: "https://www.instagram.com/anshumanrishiofficial/"
  }
];

