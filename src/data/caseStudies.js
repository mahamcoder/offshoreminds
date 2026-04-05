import cs1Pdf from "../assets/Casestudies/Cs 1.pdf";
import cs2Pdf from "../assets/Casestudies/CS2.pdf";
import cs3Pdf from "../assets/Casestudies/CS3.pdf";
import cs4Pdf from "../assets/Casestudies/Cs4.pdf";
import cs5Pdf from "../assets/Casestudies/CS 5.pdf";
import cs6Pdf from "../assets/Casestudies/CS 6.pdf";
import cs7Pdf from "../assets/Casestudies/CS 7.pdf";
import cs8Pdf from "../assets/Casestudies/CS 8.pdf";
import cs9Pdf from "../assets/Casestudies/Cs 9.pdf";
import cs10Pdf from "../assets/Casestudies/Cs 10.pdf";
import cs11Pdf from "../assets/Casestudies/CS 11.pdf";

import cs1Audio from "../assets/Casestudies/CS.mp3";
import cs2Audio from "../assets/Casestudies/CS 2.mp3";
import cs3Audio from "../assets/Casestudies/CS3.mp3";
import cs4Audio from "../assets/Casestudies/CS 4.mp3";
import cs5Audio from "../assets/Casestudies/CS 5.mp3";
import cs6Audio from "../assets/Casestudies/CS 6.mp3";
import cs7Audio from "../assets/Casestudies/CS 7.mp3";
import cs8Audio from "../assets/Casestudies/CS 8.mp3";

export const caseStudiesData = [
    {
        id: 1,
        title: "ARGUS Update and Financial Modeling for a 14-Property Office Portfolio",
        location: "205 W 37th St. Fl 8, New York, NY",
        category: ["Financial Modeling & Valuation", "Investment Underwriting"],
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        atGlance: "We partnered with a client to update and consolidate financial models for a portfolio of 14 office properties acquired between 2021 and 2022. The objective was to update ARGUS models for over 150 tenants, integrate complex historical financials, and forecast future cash flows. By meticulously matching historical data with new capital structures, we delivered precise return metrics and a current portfolio valuation.",
        challenge: "The client needed to update complex financial data for a 14-property office portfolio purchased in 2021-2022. Tracking over 150 tenants, including recent renewals and new leases, required a meticulous review of initial lease agreements and current rent rolls. Furthermore, calculating accurate return metrics required integrating complex historical data, such as capital expenditures, refinancing, new equity, and mezzanine debt, into a unified portfolio model.",
        solution: "We updated ARGUS models for all 14 properties using current lease data. After exporting the cash flows, we built a comprehensive Excel model integrating historical financials and capital events to perfectly match existing records and accurately forecast performance.",
        benefits: [
            "Precision Valuation: Valued the portfolio at $160M (100% occupancy), showing strong appreciation from the initial $120M purchase.",
            "Accurate Return Metrics:Matched historical financials with new capital structures to deliver precise return metrics from the closing date.",
            "Unified Portfolio Visibility: Combined 14 property cash flows into one portfolio model for easier forecasting, reporting, and strategic planning"
        ],
        keyMetrics: [
            { label: "Portfolio size", value: "14 Office Properties", icon: "map-pin-house" },
            { label: "Tenant Volume", value: "150+ Active Tenants", icon: "DollarSign" },
            { label: "Acquisition Value", value: "$120 Million", icon: "Clock" }
        ],
        results: [
            "Enabled $50M acquisition",
            "Identified 15% hidden value",
            "Completed in 48 hours"
        ],
        keywords: ["financial modeling", "valuation", "affordable housing", "market analysis"],
        downloadLink: cs1Pdf,
        videoLink: "",
        audioLink: cs1Audio,
        relatedStudyId: 2
    },
    {
        id: 2,
        title: "Multifamily Asset Management Reporting Template",
        location: "205 W 37th St. Fl 8, New York, NY",
        category: "Asset management support",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
        atGlance: "We designed a ready-to-deploy Excel template that consolidates three core data inputs, trailing-12 P&L actuals, current-month rent roll, and AR aging, into a single, operator-ready dashboard. Built for multifamily portfolios of any size, it surfaces critical income, vacancy, delinquency, and expense KPIs at a glance, featuring configurable threshold triggers and automated variance flags to streamline asset management.",
        challenge: "Asset managers face recurring data integration problems, dealing with P&L actuals, rent rolls, and AR aging reports that arrive in separate, inconsistent files. Manually reconciling these inputs into a coherent performance view is time-consuming and error-prone, creating critical blind spots around delinquency spikes, vacancy drift, expense overruns, and loss-to-lease gaps that compound over reporting periods.",
        solution: "We built a structured Excel environment that automatically ingests T12 financials, current rent rolls, and AR aging into a unified operator dashboard. Each module feeds the central view instantly, providing period-selectable trending, unit-type breakdowns, and operator-configurable expense triggers without requiring manual data copying.",
        benefits: [
            "Dynamic Master Dashboard:Centralized dashboard showing key metrics, with all 7 sheets updating automatically.",
            "Automated Variance Alerts:17 configurable triggers automatically flag issues like vacancy, bad debt, and NOI when thresholds are exceeded.",
            "Comprehensive Financial Visibility:Combines income trends, lease expiry tracking, and AR aging to highlight top delinquent balances for faster collections."
        ],
        keyMetrics: [
            { label: "Automated threshold monitoring", value: "17 KPI Triggers", icon: "Building" },
            { label: "T1–T120 rolling comparison", value: "MultiPeriod Trending", icon: "CheckCircle" },
            { label: "Acquisition Value", value: "$120 Million", icon: "Clock" }

        ],
        results: [
            "Automated distribution calculations",
            "Error-free investor reporting",
            "Saved 20+ hours of manual work"
        ],
        keywords: ["underwriting", "waterfall", "equity", "investment analysis"],
        downloadLink: cs2Pdf,
        videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        audioLink: cs2Audio,
        relatedStudyId: 1
    },
    {
        id: 3,
        title: "High-Volume Multifamily Underwriting & Custom BOV Model",
        location: "205 W 37th St. Fl 8, New York, NY",
        category: ["Investment underwriting", "Financial Modeling & valuation"],
        image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        atGlance: "We partnered with CBRE to develop a fully dynamic, macro-enabled multifamily underwriting model designed to produce complete Broker Opinion of Value (BOV) reports. After engineering this custom, brand-aligned tool, we transitioned into an ongoing operational role. Today, our team acts as their dedicated daily underwriting engine, executing detailed financial and market analyses to deliver three fully underwritten deals every single day in just 2-3 hours per asset.",
        solution: "We first engineered a dynamic, macro-enabled Excel model featuring a centralized dashboard and automated demographic sheets, perfectly aligned with the client's corporate branding. Utilizing this custom tool, we now perform daily underwriting for the client. For each deal, we execute detailed T12 and rent roll analysis, evaluate rent and sale comps, structure complex tax scenarios (including abatements and PILOTs), adjust OpEx, and model market-aligned renovation strategies.",
        challenge: "The client needed to process a high volume of multifamily deals rapidly without sacrificing analytical depth. Traditional underwriting required massive time commitments to manually evaluate T12s, rent rolls, complex tax structures, and market comps. They lacked a centralized, highly automated model that could consolidate these detailed inputs and instantly format them into a presentation-ready sequence for BOV pitches.",
        benefits: [
            "High-Volume Execution: Close three underwritten multifamily deals daily, increasing team pipeline",
            "Comprehensive Precision: 2–3 hour rigorous analyses with pricing, sensitivity and tax models ",
            "Instant BOV Generation:Macro model prepares all sheets instantly for client presentations. "
        ],
        keyMetrics: [
            { label: "Efficient underwriting", value: "3 DEALS PER DAY", icon: "Building2" },
            { label: "Data-to-model fast", value: "2–3 Hours", icon: "DollarSign" },
            { label: "BOV via macros", value: "1-Click output", icon: "Clock" }
        ],
        results: [
            "3 underwritten deals per day",
            "2–3 hour rigorous analyses",
            "1-Click BOV output"
        ],
        keywords: ["asset management", "development", "budget tracking", "construction"],
        downloadLink: cs3Pdf,
        videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        audioLink: cs3Audio,
        relatedStudyId: 5
    },
    {
        id: 4,
        title: `Multifamily "Go/ No-Go" Underwriting Model`,
        location: "205 W 37th St. Fl 8, New York, NY",
        category: " Investment underwriting",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        atGlance: "We built a custom Multifamily Go/No-Go Underwriting Model to help investors and acquisition teams make rapid directional decisions in under 40 minutes. Instead of diving straight into complex underwriting files, this tool allows users to input raw T-12 and rent roll data, auto-map expenses, benchmark rents, and evaluate cap rate spreads. By generating clear Green, Yellow, or Red signals, teams can instantly determine if a deal justifies deeper, time-intensive underwriting.",
        challenge: "Multifamily acquisition teams often waste hours building full financial models just to decide if a deal is worth pursuing. They struggle with drastically varying raw T-12 and rent roll formats from brokers, unstandardized expense categories that prevent apples-to-apples comparisons, and unrealistic pro forma assumptions. Without a quick way to test pricing and cap rate sensitivities on the fly, decision-making often becomes intuition-based, causing teams to burn valuable time on deals that shouldn't move forward.",
        solution: "We built an automated workflow that instantly ingests raw data, maps expenses, and summarizes unit types. A built-in framework calculates pro forma rents against market comps, while a 3-scenario dashboard evaluates cap rate spreads to generate a definitive Green, Yellow, or Red investment signal.",
        benefits: [
            "Accelerated Decision-Making:Cuts underwriting to <40 minutes, saving hours and avoiding dead-end deals.",
            "Standardized & Objective Analysis:Standardizes inputs and uses Green/Yellow/Red signals to reduce analyst variation.",
            "Strategic Offer Positioning: Instant sensitivity testing for pricing and rent growth to set a data-backed offer range before an LOI."
        ],
        keyMetrics: [
            { label: "Decision Time", value: "<40 Minutes", icon: "Clock" },
            { label: "Standardized Inputs", value: "3 Scenario Views", icon: "CheckCircle" },
            { label: "Offer Positioning", value: "Automated Mapping", icon: "DollarSign" }
        ],
        results: [
            "Cuts underwriting to <40 minutes",
            "Standardizes inputs and reduces analyst variation",
            "Instant sensitivity testing for pricing and rent growth"
        ],
        keywords: ["pitch deck", "marketing", "investor presentation", "retail"],
        downloadLink: cs4Pdf,
        videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        audioLink: cs4Audio,
        relatedStudyId: 1
    },
    {
        id: 5,
        title: "Bookkeeping and Reconciliation Support for a Growing CPA Firm",
        location: "205 W 37th St. Fl 8, New York, NY",
        category: "Accounting Support",
        image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        atGlance: "We partnered with a growing CPA firm to manage their expanding bookkeeping, payroll, tax, and advisory workload. Chosen for our cost-effectiveness and cultural alignment, we provided a dedicated accounting specialist to ensure accurate, timely monthly financial reporting.",
        challenge: "A CPA firm offering bookkeeping, payroll, tax, & investment advisory needed support to ease their bookkeeping workload. With growing demands, they sought a professional and reliable outsourcing partner to handle monthly bookkeeping and reconciliations efficiently.",
        solution: "Offshore Minds assigned a dedicated accounting specialist to support the firm with its bookkeeping and reconciliation needs. The collaboration centred on monthly bookkeeping management and reconciliation of financial records. We focused heavily on ensuring accurate and timely financial reporting.",
        benefits: [
            "Exceptional Accuracy: Consistently delivered work of exceptional quality with a high degree of accuracy.",
            "Strategic Reallocation:Reduced bookkeeping workload, enabling focus on strategic initiatives.",
            "Reliable Execution & Communication:Ensured timely accounting and smooth communication."
        ],
        keyMetrics: [
            { label: "For reconciliations", value: "1 Specialist", icon: "Maximize" },
            { label: "Monthly bookkeeping", value: "Core Tasks Managed:", icon: "MapPin" },
            { label: "Smooth virtual workflow", value: "Communication Channels:", icon: "DollarSign" }
        ],
        results: [
            "Exceptional accuracy in all deliverables",
            "Reduced bookkeeping workload",
            "Smooth virtual workflow"
        ],
        keywords: ["market research", "data analysis", "multifamily", "sunbelt"],
        downloadLink: cs5Pdf,
        videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        audioLink: cs5Audio,
        relatedStudyId: 3
    },
    {
        id: 6,
        title: "Custom Financial Model for a $13B, 10,000-Acre Mixed-Use Mega Project",
        location: "205 W 37th St. Fl 8, New York, NY",
        category: "Financial Modeling & valuation",
        image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        atGlance: "We partnered with a global real estate developer on a $13 billion, 10,000-acre master-planned project that included townhomes, retail, hotel, and multifamily units. The objective was to build a powerful, scalable financial model capable of handling multi-phase construction, multiple funding layers, and return analysis across project stages.",
        challenge: "The phased nature of the project made construction scheduling and funding flow highly complex, with equity-first deployment, staggered bank financing, and reinvested sale proceeds complicating reserve tracking. Calculating phase-wise and consolidated returns was difficult, and the client lacked a unified dashboard to monitor performance across all phases.",
        solution: "We built a custom financial model with multi-layered financing logic, automated timelines, and return metrics at both phase and project levels. A dynamic dashboard provided real-time visibility into costs, returns, funding gaps, and reserves.",
        benefits: [
            "Smart Reserve & Proceeds Management : Automated sale tracking improved liquidity planning.",
            "Accurate Return Analysis : Phase-wise and consolidated return metrics at every stage.",
            "Planning Efficiency : Timeline-based cash flow model streamlined financing and scheduling"
        ],
        keyMetrics: [
            { label: "Project Size", value: "10,000 Acres", icon: "Maximize" },
            { label: "Total Value", value: "$13 Billion", icon: "MapPin" },
            { label: "Asset Mix", value: "7 Asset Classes", icon: "DollarSign" }
        ],
        results: [
            "Streamlined funding and construction timelines",
            "Clear visibility into project-wide performance",
            "Data-backed decision-making for complex capital planning"
        ],
        keywords: ["market research", "data analysis", "multifamily", "sunbelt"],
        downloadLink: cs6Pdf,
        videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        audioLink: cs6Audio,
        relatedStudyId: 3
    },
    {
        id: 7,
        title: "Land Sale Scenario Modeling for The Avenue in Allen",
        location: "205 W 37th St. Fl 8, New York, NY",
        category: ["Investment underwriting", "Financial Modeling & valuation"],
        image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        atGlance: "We partnered with a Texas land developer to build a comprehensive Excel proforma for a 53-acre, 21-lot residential land development in Allen, Texas. The model evaluates four distinct exit scenarios, each driven by sale timing, capital structure, and income type, producing investor-ready return metrics and a clear capital stack narrative for both internal planning and active third-party fundraising.",
        challenge: "The client needed a sophisticated financial model to evaluate multiple exit strategies for a 53-acre entitled residential project. Four distinct sale scenarios were required, each driven by different timing, income structures, and capital assumptions. Furthermore, the model had to integrate a complex multi-tranche capital stack, including equity, a mezzanine loan, a bridge loan, and an optional $48M refinance facility, while accurately computing equity multiples and net profit from closing to support active fundraising.",
        solution: "We built a fully dynamic Excel proforma from the ground up, integrating scenario-driven cash flow logic with a unified capital model. The model toggles between all four exit scenarios using a single selector cell, instantly recalculating all return metrics, cash flows, and capital distributions. To ensure complete clarity for investors, two parallel versions, a no-refinance structure and a with-refinance structure, are modeled side by side for seamless comparison.",
        benefits: [
            "Four-Scenario Exit Flexibility:Modeled four exit paths with switchable waterfalls for instant investor-ready scenarios.",
            "Dual Capital Stack Comparison:Built models for no-refinance vs $48M refinance, showing $3.6M cost for crucial liquidity.",
            "Investor-Ready Return Package:2.24x levered multiple, $25.8M net profit on $16M equity."
        ],
        keyMetrics: [
            { label: "Project Size", value: "53 Acres", icon: "Maximize" },
            { label: "Lot Count", value: "4 Exit Scenarios", icon: "MapPin" },
            { label: "$16M equity", value: "Capital Setup", icon: "DollarSign" }
        ],
        results: [
            "Streamlined scenario analysis and capital planning",
            "Clear, investor-ready return documentation",
            "Flexible modeling for evolving exit strategies"
        ],
        keywords: ["market research", "data analysis", "multifamily", "sunbelt"],
        downloadLink: cs7Pdf,
        videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        audioLink: cs7Audio,
        relatedStudyId: 3
    },
    {
        id: 8,
        title: "Commercial Conversion Feasibility Modeling for a Midtown Manhattan Office Tower",
        location: "205 W 37th St. Fl 8, New York, NY",
        category: ["Investment underwriting", "Financial Modeling & valuation"],
        image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        atGlance: "We partnered with a client to build a comprehensive Excel proforma evaluating the full commercial conversion of a 1963-vintage Midtown Manhattan office tower. Spanning 808,640 GSF, the model analyzed the economics of repositioning a mixed-use (multifamily + office/retail) property into a pure commercial office asset. The entire financial architecture was built directly from the building's stacking plan to model tenant pipelines, lease-up schedules, and complex capital structures.",
        challenge: "The client needed to assess the feasibility of converting a massive mixed-use Midtown tower into a pure commercial office asset. The building presented a complex mix of 323,147 SF of in-place commercial leases alongside 597,060 SF of vacant space requiring re-leasing. Accurate modeling required reading the full stacking plan floor by floor, including 23 floors, a mezzanine, basement, and parking, and translating that into a dynamic leasing pipeline. Furthermore, the capital structure was highly complex, requiring the integration of a $26M ground lease, ~$126M in TI financing, a $17M Safehold senior loan, and an $18.3M mezzanine tranche, alongside massive TI obligations and capitalized taxes.",
        solution: "We built a fully dynamic monthly and annual Excel proforma driven directly by the building's stacking plan. Each floor was modeled individually, encoding occupancy status, existing tenants, lease expirations, and new TI obligations into a unified cash flow model. We assigned a phased leasing schedule for vacant floors and integrated the four concurrent financing tranches with distinct rate structures, maturity dates, and repayment waterfalls to calculate returns over a 5-year hold period.",
        benefits: [
            "Stacking Plan-to-Model Translation: Consistently delivered work of exceptional quality with a high degree of accuracy.",
            "Full Conversion Economics, Side by Side:Reduced bookkeeping workload, enabling focus on strategic initiatives.",
            "Investor-Ready Capital Stack & Returns:Built live floor-by-floor system feeding occupancy and leases into automated monthly cash flow"
        ],
        keyMetrics: [
            { label: "808,640 GSF", value: "Project Size", icon: "Maximize" },
            { label: "Total Project Cost", value: "$183 MILLION", icon: "MapPin" },
            { label: "Stabilized Value", value: "~$606.4 Million", icon: "DollarSign" }
        ],
        results: [
            "Stacking plan-driven leasing pipeline with 5-year timeline",
            "Integrated 4-tranche capital structure with distinct waterfalls",
            "Floor-by-floor occupancy tracking and automated monthly cash flow"
        ],
        keywords: ["market research", "data analysis", "multifamily", "sunbelt"],
        downloadLink: cs8Pdf,
        videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        audioLink: cs8Audio,
        relatedStudyId: 3
    },
    {
        id: 9,
        title: "High-Volume Invoice Processing & Bookkeeping Automation",
        location: "205 W 37th St. Fl 8, New York, NY",
        category: "Accounting Support",
        image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        atGlance: "We partnered with a large retail store to streamline their daily transaction activity and resolve an 8–10 month backlog of historical bookkeeping. By implementing a customized spreadsheet synchronization workflow integrated with QuickBooks, we automated high-volume invoice processing, vendor bill recording, and payment matching. This bookkeeping automation reduced manual data entry by 80%, restoring clean financial records and creating a highly scalable accounting process for their expanding retail operations.",
        challenge: "The client’s large retail store generated a massive volume of daily transactions, creating approximately 100–120 wholesale sales invoices and supplier bills each day. Manually entering this financial data and tracking cash, credit, and POS payment matching for each transaction became a highly repetitive, error-prone, and time-intensive burden. Without an efficient accounting workflow, handling the daily retail transaction volume and resolving multiple months of historical bookkeeping backlogs became increasingly unsustainable.",
        solution: "To resolve these accounting challenges, our team engineered a seamless spreadsheet synchronization process directly integrated with the retail client's QuickBooks system. We designed structured spreadsheets for bulk data uploads, enabling the automated generation of daily invoices across all retail departments. Furthermore, we systematically cleared the 8–10 month historical backlog by automating bill creation and directly matching daily cash deposits and credit card settlements to their respective invoices.",
        benefits: [
            "FasterInvoice Processing: Bulk uploads let retail team create invoices and bills, removing manual entry.",
            "Efficient Payment Matching:Automated daily POS matching ensures complete, audit-ready records",
            "Scalable Bookkeeping Process:EQuickBooks automation enabled scalable, high-volume bookkeeping for growing retail operations"
        ],
        keyMetrics: [
            { label: "8-10 days", value: "Historical Cleanup", icon: "Maximize" },
            { label: "100-120 invoices", value: "Daily volume", icon: "MapPin" },
            { label: "300+ invoices", value: "Total Transaction", icon: "DollarSign" }
        ],
        results: [
            "8-10 days to clear 8–10 months of historical bookkeeping backlogs",
            "100–120 invoices and 300+ transactions processed daily",
            "80% reduction in manual data entry"
        ],
        keywords: ["market research", "data analysis", "multifamily", "sunbelt"],
        downloadLink: cs9Pdf,
        videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        audioLink: "",
        relatedStudyId: 3
    },
    {
        id: 10,
        title: "1099 Compliance & Vendor Reporting Optimization",
        location: "205 W 37th St. Fl 8, New York, NY",
        category: "Accounting Support",
        image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        atGlance: "We partnered with US clients to streamline their contractor payment reporting and ensure full IRS compliance with Form 1099-NEC and Form 1099-MISC requirements. Handling hundreds of independent contractors, their existing QuickBooks Online records lacked proper vendor classification and tax documentation. Our accounting experts conducted a full vendor review, collected missing W-9 forms, and verified payment records. By implementing a structured vendor tracking system, we ensured accurate 1099 filings and optimized their vendor compliance processes for tax season.",
        challenge: "The clients managed a large volume of independent contractors but lacked a structured vendor management system to track 1099-eligible payments.Vendor records were incomplete, and many had not submitted the required W-9 tax forms. Furthermore, contractor payments were recorded inconsistently,making it extremely difficult to determine accurate 1099 reporting requirements. This disorganization created a high risk of IRS non-compliance and increased the likelihood of severe tax penalties.",
        solution: "Our accounting team executed a comprehensive vendor data review, accurately identifying contractors eligible for Form 1099-NEC and Form 1099-MISC reporting. We meticulously verified contractor payments in QuickBooks Online, collected missing W-9 forms, and correctly categorized all vendor transactions. Finally, we generated accurate 1099 reports for IRS filing and implemented a standardized vendor onboarding process to ensure ongoing, automated compliance.",
        benefits: [
            "Guaranteed IRS Compliance: Reviewed all payments for IRS 1099 compliance.",
            "Minimized Tax Penalty Risk:Accurate vendor classification and W-9s minimized IRS penalties.",
            "Streamlined Vendor Reporting:New vendor process speeds 1099 prep and ensures accurate records."
        ],
        keyMetrics: [
            { label: "350+ accounts", value: "Vendor Review", icon: "Maximize" },
            { label: "$2.8M+ in contractor", value: "Payments Verified", icon: "MapPin" },
            { label: "200+ missing W-9 forms", value: "Tax Forms", icon: "DollarSign" }
        ],
        results: [
            "100% of payments accurately classified for 1099 reporting",
            "200+ missing W-9 forms collected and verified",
            "$2.8M+ in contractor payments accurately processed and documented"
        ],
        keywords: ["market research", "data analysis", "multifamily", "sunbelt"],
        downloadLink: cs10Pdf,
        videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        audioLink: "",
        relatedStudyId: 3
    },
    {
        id: 11,
        title: "Restaurant Accounting & POS Integration",
        location: "205 W 37th St. Fl 8, New York, NY",
        category: "Accounting Support",
        image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        atGlance: "We partnered with a multi-location restaurant group to streamline their complex restaurant accounting operations and elevate financial reporting using QuickBooks Online. Managing several outlets with high daily transaction volumes made tracking sales, expenses, and profitability a challenge. We implemented a structured framework to ensure the accurate recording of daily POS sales and establish reliable financial reporting for each specific location. By organizing financial data and improving daily reconciliation procedures, we delivered clear visibility into business performance across the entire multi-location portfolio.",
        challenge: "The client faced significant hurdles managing restaurant accounting records across multiple outlets with high daily transaction volumes. Daily POS sales were recorded inconsistently, and financial data from cash, credit cards, and third-party delivery platforms remained unreconciled. This created severe discrepancies between POS reports, merchant settlements, and actual bank deposits. Furthermore, management lacked the clear financial reporting needed to evaluate individual location performance and accurately control operational costs.",
        solution: "Our accounting team implemented class-wise accounting within QuickBooks Online to precisely track income and expenses for each restaurant location. We standardized the workflow for importing and recording sales data across all 6 POS systems and established strict daily reconciliation procedures to seamlessly match POS reports with merchant settlements and bank deposits. Additionally, we optimized the Chart of Accounts to ensure highly accurate, location-level financial reporting.",
        benefits: [
            "Location-Level Profitability Insights: Reviewed all payments for IRS 1099 compliance.",
            "Accurate POS & Bank Reconciliation:Accurate vendor classification and W-9s minimized IRS penalties.",
            "Scalable & Data-Driven Operations:New vendor process speeds 1099 prep and ensures accurate records."
        ],
        keyMetrics: [
            { label: "5 restaurant outlets", value: "Locations Managed", icon: "Maximize" },
            { label: "6 distinct POS", value: "POS Integration", icon: "MapPin" },
            { label: "12,000+ monthly POS sales", value: "Transaction Volume", icon: "DollarSign" }
        ],
        results: [
            "100% of payments accurately classified for 1099 reporting",
            "200+ missing W-9 forms collected and verified",
            "$2.8M+ in contractor payments accurately processed and documented"
        ],
        keywords: ["market research", "data analysis", "multifamily", "sunbelt"],
        downloadLink: cs11Pdf,
        videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        audioLink: "",
        relatedStudyId: 3
    },

];

export const caseStudyCategories = [
    "All",
    "Financial Modeling & Valuation",
    "Investment Underwriting",
    "Asset Management Support",
    "Marketing & Pitch Decks",
    "Market Research & Data",
    "Accounting Support"
];
