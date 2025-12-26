import { BadgeDollarSign, Calculator, LineChart, TrendingUp, Building2, Megaphone } from 'lucide-react';
import argusLogo from '../assets/argus (1).png';
import costarLogo from '../assets/logo-costar-png-900px.png';
import excelLogo from '../assets/excel.webp';
import yardiLogo from '../assets/yardi.png';
import xeroLogo from '../assets/xero.png';
import zoho from '../assets/zoha.png';
import quickbooksLogo from '../assets/Quickbooks-Logo.png';
import appfolioLogo from '../assets/appfolio.png';
import googlesheetLogo from '../assets/googlesheet.png';
import copilotLogo from '../assets/copilot.png';
import openaiLogo from '../assets/openai.png';
import vbaLogo from '../assets/vba.png';
import pythonLogo from '../assets/python.png';
import powerbiLogo from '../assets/powerbi.png';
import zillow from '../assets/zillow.png';
import replace from '../assets/replace.png';
import loopnet from '../assets/loopnet.png';
import cashflow from '../assets/cashflow.webp';
import freshbook from '../assets/freeshbook.webp';
import googleStudio from '../assets/googlestudio.png';
import tableau from '../assets/tablue.png';
import rent from '../assets/rent.webp';
import ps from '../assets/ps.png';
import ai from '../assets/ai.png';
import canva from '../assets/canva.jpg';
import cd from '../assets/Cd.png';
import image1 from '../assets/Picture 1.png';
import image2 from '../assets/Picture 2.png';
import image3 from '../assets/Picture 3.png';
import image4 from '../assets/Picture 4.png';
import image5 from '../assets/Picture 5.png';
import image6 from '../assets/Picture 6.png';
import image7 from '../assets/Picture 7.png';
import image8 from '../assets/Picture 8.png';

import image9 from '../assets/Picture 9.png';
import image10 from '../assets/Picture 10.png';
import image11 from '../assets/Picture 11.png';
import image12 from '../assets/Picture 12.png';




export const servicesData = [
    {
        id: "financial-services",
        title: "Real Estate Financial Services",
        icon: BadgeDollarSign,
        shortDescription: "Enhance your deal flow with our comprehensive Financial Analysis Services, which encompass DCF modeling, Underwriting Services, Market Research, and precise Asset Valuations.",
        overview: "Achieve faster CRE underwriting turnarounds with our deep domain expertise, market intelligence, and efficient processes. We provide end-to-end underwriting support, from sizing and valuation to due diligence, enabling clients to close deals faster in competitive markets. Our scalable, knowledge-driven team leverages industry-leading tools and strong lease analysis expertise to ensure accurate, high-quality deliverables, allowing underwriters to focus on value-add activities while managing volume spikes with ease.",
        fullDescription: "Our comprehensive services encompass due diligence support relating to underwriting from sizing through valuation and underwriting, enabling clients to close deals efficiently in a competitive environment. Our knowledge-based team abreast with market trends, and adept in use of market and client provided property valuation software and models ensures delivery of high-calibre deals enabling underwriters to focus on value-add activities. Leveraging our scalable team provides an edge to clients to manage volume spikes during sizing phase ensuring quicker turnaround increasing client’s feasibility to close.",
        toolLogos: [
            { name: "Excel", logo: excelLogo },
            { name: "zillow", logo: zillow },
            { name: "Argus", logo: argusLogo },
            { name: "CoStar", logo: costarLogo },
            { name: "replace", logo: replace },
            { name: "yardi", logo: yardiLogo }
            ,
            { name: "loopnet", logo: loopnet }
        ],
        subServices: [
            {
                title: "Debt & Equity Underwriting",
                description: "Strengthen underwriting practice by deploying advanced digital technologies to mitigate risks across the underwriting Processes.",
                image: image2
            },
            {
                title: "Service & Asset Management",
                description: "Transforming CRE Asset Management leveraging digitized reporting & analysis supplemented by deep industry knowledge of our experts.",
                image: image5
            },
            {
                title: "Valuation / Appraisal Support",
                description: "Comprehensive Valuation procedures, diligent audit process, and reports aided by augmented solutions.",
                image: image9
            },
            {
                title: "Argus Financial Modeling",
                description: "Enable robust financial modeling, including property valuation, cash flow forecasting, and sensitivity analysis. We provide in-depth insights.",
                image: image1
            },

            {
                title: "Loan Closing Support",
                description: "Helps in preparing and creating closing packages. All the documents collected at closing are accurate and in conformance with the loan to be originated.",
                image: image6
            },

            {
                title: "Offering Memorandums",
                description: "Provide support in creating written and visual content for the Offering Memorandum, covering property details, loan and financial analysis, tenancy overview, historical statements, pro forma analysis, and management and sponsor charts.",
                image: image8
            },


        ],
        capabilities: [
            {
                title: "Financial Analysis and Modeling",
                details: [
                    "Argus Runs",
                    "T12,T6, T3 Analysis",
                    "3, 5, 10, 15-Year DCF Modeling",
                    "Replacement Cost Analysis",
                    "Broker Opinion of Values",
                    "Waterfall Modeling and Calculations",
                    "Stress Test Scenarios",
                    "Model Creation and/or Manipulation",

                ]
            },
            {
                title: "Property and Market Research",
                details: [
                    "Property/Market Research",
                    "Sales/Rent Comparable Analysis",
                    "Demographics/Maps/Photographs",
                    "Location/Neighborhood Narratives",
                    "Tax Research",
                    "Calling Comparable Properties and Surveying"
                ]
            },
            {
                title: "Lease and Asset Analysis",
                details: [
                    "Lease Analysis/Abstracts",
                    "Lease Set-up and Updates",
                    "Hold Sell Analysis",
                    "CAM Reconciliation",
                    "Budget Reviews and Tracking Support",
                    "Periodic Reporting"
                ]
            },
            {
                title: "Underwriting & Due Diligence",
                details: [
                    "Property Screening",
                    "Re-Underwriting/Risk Rating",
                    "Appraisal Support Services",

                ]
            }
        ]
    },
    {
        id: "accounting-services",
        title: "Accounting Services",
        icon: Calculator,
        shortDescription: "Devising Digital Outcomes by Leveraging Data-driven Decision making to Accelerate Business Grow. Scale and streamline your accounting systems and ensure financial accuracy, timeliness and compliance with our accounting professionals.",
        overview: "Offshore Mind’s Real Estate Accounting Service provides cost-effective and efficient solutions to help clients scale their internal accounting teams. Our dedicated real estate accountants in India collaborate closely with owners, operators, developers, fund managers, brokers, and property managers. By seamlessly integrating our experts into your team, we streamline and enhance existing processes while maintaining quality and integrity. Trust us to maximize your output and free up time for your core operations.",
        fullDescription: "Our expert team specializes in managing the complex financials of real estate investments in the USA, offering tailored accounting and bookkeeping services. We ensure precise records and insights for investment firms, while our experienced accountants and bookkeepers provide the necessary support for sound business decisions.",
        toolLogos: [
            { name: "Yardi", logo: yardiLogo },
            { name: "excel", logo: excelLogo },
            { name: "Xero", logo: xeroLogo },
            { name: "zoha", logo: zoho },
            { name: "cashflow-manager", logo: cashflow },
            { name: "freshbook", logo: freshbook },
            { name: "QuickBooks", logo: quickbooksLogo },
            { name: "rent", logo: rent }

        ],
        subServices: [
            {
                title: "Bookkeeping",
                description: "Monitoring your financial activities, guaranteeing precise and current record-keeping. This encompasses documenting transactions, matching bank statements, and preserving detailed records of revenues and expenditures.",
                image: image3
            },
            {
                title: "Accounting",
                description: "The creation of key financial documents such as balance sheets, income statements, and cash flow statements. These documents are essential for gaining insights into your company’s financial status.",
                image: image4
            },
            {
                title: "Financial Planning and Analysis",
                description: "The development and execution of financial strategies and budgets. We also offer continuous analysis and reporting to ensure your financial goals are met.",
                image: image5
            }
        ],
        capabilities: [
            {
                title: "Bookkeeping and Financial Reporting",
                details: [
                    "Maintaining financial records and preparing financial statements."
                ]
            },
            {
                title: "Tax Planning and Compliance",
                details: [
                    "Advising on tax strategies and ensuring compliance with federal, state, and local tax laws.",

                ]
            },
            {
                title: "Budgeting and Forecasting:",
                details: [
                    "Creating financial forecasts and budget plans for real estate projects."
                ]
            },
            {
                title: "Cost Segregation Studies",
                details: [
                    "Analyzing property to identify assets for accelerated depreciation."
                ]
            },
            {
                title: "Lease Abstracting and Administration",
                details: [
                    "Summarizing lease agreements and managing lease terms and renewals."
                ]
            },
            {
                title: "Operational Accounting",
                details: [
                    "Managing day-to-day financial operations, including accounts payable and receivable."
                ]
            },

            {
                title: "Capital Improvement Analysis",
                details: [
                    "Assessing and planning for property improvements and capital expenditures."
                ]
            },
            {
                title: "Real Estate Transaction Support",
                details: [
                    "Assisting with the financial aspects of buying, selling, or leasing properties."
                ]
            },
            {
                title: "1031 Exchanges",
                details: [
                    "Facilitating tax-deferred exchanges of investment properties"
                ]
            }
        ]
    },
    {
        id: "analytics-services",
        title: "Real Estate Analytics Services",
        icon: LineChart,
        shortDescription: "Data-Driven Insights for Confident Real Estate Decision-Making",
        overview: "Make smarter real estate investment and asset management decisions with our data-driven analytics services. We empower investors, sponsors, lenders, and brokers with actionable insights by combining market intelligence, demographic trends, financial data, and property-level metrics into clear, decision-ready outputs.",
        fullDescription: "Our analytics services cover the full lifecycle of real estate assets, from market selection and site analysis to performance tracking and portfolio optimization. By leveraging advanced tools and data platforms such as CoStar, Yardi Matrix, RealPage, and proprietary client data, our team delivers tailored insights aligned with your strategic goals.",
        toolLogos: [
            { name: "Excel", logo: excelLogo },
            { name: "googlesheet", logo: googlesheetLogo },
            { name: "openai", logo: openaiLogo },
            { name: "copilot", logo: copilotLogo },
            { name: "googlestudio", logo: googleStudio },
            { name: "PowerBI", logo: excelLogo },
            { name: "Tableau", logo: tableau },

        ],
        subServices: [
            {
                title: "Market Intelligence & Deal Screening",
                description: "We help identify, prioritize, and assess new opportunities using customized market datasets and scoring tools.",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            },
            {
                title: "Asset Performance & KPI Dashboards",
                description: "We provide visibility across your portfolio through automated dashboards and deep-dive reports.",
                image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            },
            {
                title: "Forecasting & Predictive Modeling",
                description: "We build forward-looking models to assess market risk, rent trends, and absorption rates.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            }
        ],
        capabilities: [
            {
                title: "Market Intelligence & Deal Screening",
                details: [
                    "Demographics, income growth, and migration trends",
                    "Rent growth, absorption, and vacancy analysis",
                    "Market comparable and sales pipeline tracking",
                    "Market comparable and sales pipeline tracking"
                ]
            },
            {
                title: "Asset Performance & KPI Dashboards",
                details: [
                    "Occupancy, leasing, and tenant retention analytics",
                    "NOI trends, OpEx efficiency, and capex benchmarking",
                    "Lease rollover and rent comp analysis",
                    "Custom dashboards in Excel and Power BI"
                ]
            },
            {
                title: "Forecasting & Predictive Modeling",
                details: [
                    "Rent and expense forecasting models",
                    "Sensitivity and scenario analysis",
                    "Stress testing for downside protection",
                    "Predictive vacancy and turnover modeling"
                ]
            },
            {
                title: "Risk & Lender-Focused Analytics",
                details: [
                    "DSCR, LTV, and cash flow coverage monitoring",
                    "Borrower history and creditworthiness analysis",
                    "Refinancing risk and interest rate exposure",
                    "Watchlist and loan portfolio surveillance"
                ]
            },

        ]
    },
    {
        id: "asset-management",
        title: "Asset Management Services",
        icon: Building2,
        shortDescription: "Maximizing Performance Across the U.S. Real Estate Lifecycle",
        overview: "Maximize returns and operational efficiency with our comprehensive Asset Management Services designed for real estate investors, sponsors, and portfolio managers. We provide end-to-end support that enables proactive decision-making, performance optimization, and long-term value creation across all asset classes.",
        fullDescription: "Our team acts as an extension of your internal asset management function, overseeing financial performance, capital planning, budgeting, leasing strategy, and operational KPIs. From tracking NOI and occupancy metrics to managing CapEx schedules and lender reporting, we ensure your assets perform in line with business plans and market expectations. We leverage data from rent rolls, operating statements, market comps, and third-party platforms to deliver timely, insightful dashboards and reports.",
        toolLogos: [
            { name: "Excel", logo: excelLogo },
            { name: "Yardi", logo: yardiLogo },
            { name: "rent", logo: rent },
            { name: "quickbook", logo: quickbooksLogo },
            { name: "appfolio", logo: appfolioLogo },

        ],
        subServices: [
            {
                title: "Property Performance Tracking",
                description: "We monitor and analyze operating results to identify opportunities for revenue enhancement and expense control, providing detailed monthly and quarterly reports.",
                image: image7
            },
            {
                title: "Investor Reporting & Dashboards",
                description: "Custom-designed Excel and Power BI dashboards for LPs, GPs, and fund managers. Includes capital account updates and distribution history.",
                image: image6
            },
            {
                title: "Rent Roll & Lease Management",
                description: "Maintain up-to-date lease data with structured tracking of lease expirations, rollover risks, rent escalations, and renewal negotiations.",
                image: image8
            },

        ],
        capabilities: [
            {
                title: "Property Performance Tracking",
                details: [
                    "Occupancy, rent collections, and leasing velocity",
                    "NOI and cash flow tracking",
                    "Budget vs. actual performance",
                    "Variance analysis and exception reporting"
                ]
            },
            {
                title: "Investor Reporting & Dashboards",
                details: [
                    "Asset summary reports",
                    "Capital account updates",
                    "IRR and equity multiple tracking",
                    "Distribution history and cash flow forecasts",

                ]
            },
            {
                title: "Rent Roll & Lease Management",
                details: [
                    "Lease expirations and rollover risks",
                    "Rent escalations and recovery clauses",
                    "Renewal negotiations and tenant performance",
                    "Concessions and delinquencies"

                ]
            },
            {
                title: "Market & Portfolio Benchmarking",
                details: [
                    "Comparable rent, occupancy, and absorption analysis",
                    "Local economic and demographic trends",
                    "Submarket performance benchmarking",
                    "Asset-level vs. market-level KPIs"

                ]
            },
            {
                title: "Debt Compliance & Lender Coordination",
                details: [
                    "DSCR and LTV monitoring",
                    "Loan maturity and refinance planning",
                    "Lender reporting packages",
                    "Covenant tracking and notice management"

                ]
            },
            {
                title: "Construction & Development Trackers",
                details: [
                    "Custom Excel + visual dashboards to track construction schedules, cost forecasts, and contractor updates — ideal for sponsors managing ground-up or redevelopment projects.",

                ]
            }
        ]
    },
    {
        id: "financial-modeling",
        title: "Financial Modeling Services",
        icon: TrendingUp,
        shortDescription: "Robust, Industry-Specific Models for Real Estate, Infrastructure & Renewable Energy Projects",
        overview: "We provide specialized financial modeling services to support real estate, infrastructure, and renewable energy investments with precision and clarity. Our models are built to reflect complex deal structures, financing mechanisms, and regulatory frameworks, enabling clients to make informed decisions with confidence. From underwriting real estate acquisitions and developments to structuring infrastructure project finance and renewable energy models, our team delivers tailored, audit-ready models aligned with industry best practices.",
        fullDescription: "Our financial modeling experts are equipped with strong technical backgrounds and academic credentials, including MBAs, Chartered Accountants, and infrastructure finance specialists. With years of experience in building complex real estate and project finance models, our team ensures accuracy, flexibility, and clarity. Whether modeling real estate acquisitions or renewable energy projects, we bring precision and deep domain understanding to every assignment.",

        subServices: [
            {
                title: "Real Estate Financial Modeling",
                description: "From acquisition to refinance, our models include fully dynamic underwritings for multifamily, office, retail, industrial, and mixed-use assets.",
                image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            },
            {
                title: "Infrastructure Project Finance",
                description: "We model large-scale, long-term infrastructure investments under PPP and traditional DBFOM structures.",
                image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            },
            {
                title: "Renewable Energy Modeling",
                description: "We work closely with clean energy sponsors, investors, and IPPs to build bankable models for solar, wind, and hybrid projects.",
                image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            }
        ],
        capabilities: [
            {
                title: "Real Estate Financial Modeling",
                details: [
                    "Acquisition & disposition modeling",
                    "Value-add & development pro formas",
                    "Sponsor-LP waterfall distributions",
                    "Fund-level cash flow aggregation",
                    "Lease roll, rent growth, and operating assumptions integration"
                ]
            },
            {
                title: "Renewable Energy Modeling",
                details: [
                    "Project IRR, equity IRR, and PPA revenue modeling",
                    "Tax equity structuring (ITC/PTC models)",
                    "Sponsor-level cash waterfalls",
                    "Loan sizing and DSRA planning",
                    "Yieldco and portfolio roll-up modeling"
                ]
            }
        ]
    },
    {
        id: "marketing",
        title: "Real Estate Marketing Services",
        icon: Megaphone,
        shortDescription: "Custom Marketing Support for U.S. Investors, Sponsors, Lenders, and Brokers",
        overview: "Enhance your brand presence and accelerate deal flow with high-impact marketing materials tailored for the real estate industry. We support investors, sponsors, brokers, and developers with professionally designed pitch decks, offering memorandums, investor presentations, brochures, and digital assets that effectively communicate your value proposition.",
        fullDescription: "Our marketing team blends creative design talent with real estate know-how, including professionals with experience in branding, investor communications, and design strategy. With backgrounds in real estate, finance, and visual communication, we craft compelling marketing materials that resonate with investors, tenants, and stakeholders.",
        toolLogos: [
            { name: "ps", logo: ps },
            { name: "canva", logo: canva },
            { name: "ai", logo: ai },
            { name: "cd", logo: cd },


        ],
        subServices: [
            {
                title: "Offering Memorandums (OMs)",
                description: "Professionally designed and data-driven investment packages that highlight property features, market positioning, rent rolls, and financials.",
                image: image10
            },
            {
                title: "Investor Pitch Decks",
                description: "Engaging, visually appealing decks that help you raise capital or present to LPs, covering investment thesis, financial projections, and team credentials.",
                image: image11
            },
            {
                title: "Property Flyers & Brochures",
                description: "Concise, on-brand one-pagers or multi-page brochures designed for quick listings, open houses, or virtual tours.",
                image: image12
            }
        ],
        capabilities: [
            {
                title: "Offering Memorandums (OMs)",
                details: [
                    "Professionally designed and data-driven investment packages that highlight property features, market positioning, rent rolls, and financials — customized for acquisitions, dispositions, and recapitalizations."
                ]
            },
            {
                title: "Investor Pitch Decks",
                details: [
                    "Engaging, visually appealing decks that help you raise capital or present to LPs, covering investment thesis, financial projections, comparable sales, and team credentials.",
                ]
            },
            {
                title: "Property Flyers & Brochures",
                details: [
                    "Concise, on-brand one-pagers or multi-page brochures designed for quick listings, open houses, or virtual tours.",
                ]
            },

            {
                title: "Quarterly & Monthly Reports",
                details: [
                    "Institutional-grade reporting templates with clean data visualizations and property performance highlights — ideal for fund sponsors and asset managers.",
                ]
            },

            {
                title: "Market Research Summaries",
                details: [
                    "Professionally packaged market data — including comps, demographic insights, cap rate trends, and economic overviews — for internal strategy or investor presentations.",
                ]
            },

            {
                title: "Construction & Development Trackers",
                details: [
                    "Custom Excel + visual dashboards to track construction schedules, cost forecasts, and contractor updates — ideal for sponsors managing ground-up or redevelopment projects.",
                ]
            },


        ]
    }
];

