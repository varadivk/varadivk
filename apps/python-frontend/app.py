"""
Data Monetization Agent — Flask Frontend
A deployable Python web application for the ThinkVerge Data Monetization
Agent framework: asset discovery, multi-industry coverage, automated
valuation, and agent orchestration views.

Run locally:   python app.py
Run with gunicorn:  gunicorn -w 4 -b 0.0.0.0:5000 app:app
"""

from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# ---------------------------------------------------------------------------
# Model: Data Assets  (the raw inputs to every monetization activity)
# ---------------------------------------------------------------------------

DATA_ASSETS = [
    {
        "id": "DA-001",
        "name": "Freight Lane Benchmark Feed",
        "asset_type": "Operational Time-Series",
        "source_system": "TMS / ERP",
        "owner": "Logistics BU",
        "industry": "Manufacturing & Supply Chain",
        "sub_industry": "Logistics / 3PL",
        "sensitivity": "Internal",
        "pii": False,
        "regulatory_tags": [],
        "quality": {"completeness": 94, "accuracy": 91, "freshness_hours": 4,
                    "uniqueness": 99, "consistency": 88, "overall": 94},
        "volume": {"records": 18_500_000, "update_freq": "Hourly", "history_years": 5},
        "commercial": {"estimated_tam_usd": 8_200_000, "moat_score": 7,
                       "uniqueness_score": 8, "substitutability": "Low"},
        "status": "Productized",
        "tags": ["logistics", "freight", "time-series"],
    },
    {
        "id": "DA-002",
        "name": "Retail Transaction Graph",
        "asset_type": "Graph / Network",
        "source_system": "POS + Loyalty Platform",
        "owner": "Retail BU",
        "industry": "Retail & Consumer Goods",
        "sub_industry": "Grocery / CPG",
        "sensitivity": "Confidential",
        "pii": True,
        "regulatory_tags": ["GDPR", "CCPA"],
        "quality": {"completeness": 87, "accuracy": 95, "freshness_hours": 24,
                    "uniqueness": 96, "consistency": 91, "overall": 91},
        "volume": {"records": 420_000_000, "update_freq": "Daily", "history_years": 7},
        "commercial": {"estimated_tam_usd": 22_000_000, "moat_score": 9,
                       "uniqueness_score": 9, "substitutability": "Very Low"},
        "status": "Valued",
        "tags": ["retail", "transactions", "graph", "PII"],
    },
    {
        "id": "DA-003",
        "name": "Machine Sensor Telemetry",
        "asset_type": "IoT Time-Series",
        "source_system": "SCADA / MES",
        "owner": "Manufacturing BU",
        "industry": "Manufacturing & Supply Chain",
        "sub_industry": "Discrete Manufacturing",
        "sensitivity": "Internal",
        "pii": False,
        "regulatory_tags": [],
        "quality": {"completeness": 99, "accuracy": 97, "freshness_hours": 0.1,
                    "uniqueness": 100, "consistency": 95, "overall": 98},
        "volume": {"records": 2_800_000_000, "update_freq": "Real-time", "history_years": 4},
        "commercial": {"estimated_tam_usd": 15_400_000, "moat_score": 8,
                       "uniqueness_score": 9, "substitutability": "Low"},
        "status": "Productized",
        "tags": ["manufacturing", "IoT", "real-time", "telemetry"],
    },
    {
        "id": "DA-004",
        "name": "Smart-Meter Interval Data",
        "asset_type": "Regulatory Time-Series",
        "source_system": "AMI / MDM",
        "owner": "Grid Operations",
        "industry": "Energy & Utilities",
        "sub_industry": "Electric Utilities",
        "sensitivity": "Confidential",
        "pii": True,
        "regulatory_tags": ["GDPR", "NERC CIP"],
        "quality": {"completeness": 98, "accuracy": 99, "freshness_hours": 1,
                    "uniqueness": 100, "consistency": 97, "overall": 98},
        "volume": {"records": 5_200_000_000, "update_freq": "15-min intervals", "history_years": 6},
        "commercial": {"estimated_tam_usd": 11_700_000, "moat_score": 8,
                       "uniqueness_score": 7, "substitutability": "Medium"},
        "status": "Catalogued",
        "tags": ["energy", "smart-meter", "regulated", "time-series"],
    },
    {
        "id": "DA-005",
        "name": "EHR Clinical Notes Corpus",
        "asset_type": "Unstructured Text",
        "source_system": "Epic / Cerner EHR",
        "owner": "Health System IT",
        "industry": "Healthcare & Life Sciences",
        "sub_industry": "Health Systems",
        "sensitivity": "Restricted",
        "pii": True,
        "regulatory_tags": ["HIPAA", "GDPR"],
        "quality": {"completeness": 78, "accuracy": 89, "freshness_hours": 48,
                    "uniqueness": 94, "consistency": 72, "overall": 82},
        "volume": {"records": 34_000_000, "update_freq": "Daily", "history_years": 10},
        "commercial": {"estimated_tam_usd": 43_000_000, "moat_score": 10,
                       "uniqueness_score": 10, "substitutability": "None"},
        "status": "Valued",
        "tags": ["healthcare", "clinical", "NLP", "PHI", "regulated"],
    },
    {
        "id": "DA-006",
        "name": "Ad Impression / Click Graph",
        "asset_type": "Event Stream",
        "source_system": "DSP / Ad Server",
        "owner": "AdTech BU",
        "industry": "Telecommunications & Media",
        "sub_industry": "Advertising Tech",
        "sensitivity": "Confidential",
        "pii": True,
        "regulatory_tags": ["GDPR", "CCPA", "COPPA"],
        "quality": {"completeness": 91, "accuracy": 93, "freshness_hours": 0.25,
                    "uniqueness": 88, "consistency": 90, "overall": 91},
        "volume": {"records": 12_000_000_000, "update_freq": "Real-time", "history_years": 3},
        "commercial": {"estimated_tam_usd": 35_000_000, "moat_score": 7,
                       "uniqueness_score": 6, "substitutability": "Medium"},
        "status": "Catalogued",
        "tags": ["adtech", "events", "real-time", "PII"],
    },
]

# ---------------------------------------------------------------------------
# Model: Data Products  (monetizable products built on top of data assets)
# ---------------------------------------------------------------------------

DATA_PRODUCTS = [
    {
        "id": "DP-001",
        "name": "FreightIQ API",
        "description": "Real-time freight lane benchmarks across 500+ OD pairs; ideal for shippers, 3PLs, and freight-tech platforms.",
        "type": "API",
        "source_assets": ["DA-001"],
        "industry": "Logistics / Supply Chain",
        "status": "Live",
        "launch_date": "2026-01-15",
        "pricing_tiers": [
            {"tier": "Starter", "monthly_usd": 299,
             "calls_included": 10_000, "overage_per_1k": 25,
             "features": ["Lane-level benchmarks", "Weekly refresh", "REST API", "CSV export"]},
            {"tier": "Professional", "monthly_usd": 1_499,
             "calls_included": 100_000, "overage_per_1k": 12,
             "features": ["Lane + carrier benchmarks", "Daily refresh", "REST + webhooks", "SLA 99.5%"]},
            {"tier": "Enterprise", "monthly_usd": 0,
             "calls_included": -1, "overage_per_1k": 0,
             "features": ["Custom lanes", "Real-time refresh", "Dedicated instance", "SLA 99.9%", "Revenue-share option"]},
        ],
        "sla": {"latency_p99_ms": 120, "uptime_pct": 99.9, "refresh_rate": "Hourly"},
        "customers": 14,
        "monthly_arr_usd": 42_300,
        "api_calls_mtd": 1_240_000,
    },
    {
        "id": "DP-002",
        "name": "Manufacturing OEE Benchmark Suite",
        "description": "Cross-plant OEE and downtime benchmarks; enriched with failure-mode labels for predictive maintenance use cases.",
        "type": "Dataset + API",
        "source_assets": ["DA-003"],
        "industry": "Manufacturing",
        "status": "Beta",
        "launch_date": "2026-03-01",
        "pricing_tiers": [
            {"tier": "Beta Access", "monthly_usd": 0,
             "calls_included": 5_000, "overage_per_1k": 0,
             "features": ["5 plants sample", "Monthly snapshot", "CSV only", "Feedback-loop agreement"]},
            {"tier": "Standard", "monthly_usd": 2_499,
             "calls_included": 50_000, "overage_per_1k": 40,
             "features": ["50+ plants", "Weekly refresh", "REST API", "Failure-mode labels"]},
            {"tier": "Enterprise", "monthly_usd": 0,
             "calls_included": -1, "overage_per_1k": 0,
             "features": ["All plants", "Real-time streaming", "Custom taxonomies", "Model-ready format"]},
        ],
        "sla": {"latency_p99_ms": 350, "uptime_pct": 99.5, "refresh_rate": "Weekly"},
        "customers": 3,
        "monthly_arr_usd": 7_497,
        "api_calls_mtd": 118_000,
    },
    {
        "id": "DP-003",
        "name": "Consumer Spend Intelligence Feed",
        "description": "Anonymised and aggregated spend trends by category, geography, and demographic cohort — derived from POS transaction graph.",
        "type": "Dataset",
        "source_assets": ["DA-002"],
        "industry": "Retail & CPG",
        "status": "Draft",
        "launch_date": None,
        "pricing_tiers": [
            {"tier": "Quarterly Snapshot", "monthly_usd": 4_999,
             "calls_included": -1, "overage_per_1k": 0,
             "features": ["National coverage", "12 categories", "Quarterly delivery", "Excel + JSON"]},
            {"tier": "Monthly Feed", "monthly_usd": 14_999,
             "calls_included": -1, "overage_per_1k": 0,
             "features": ["National + DMA", "50 categories", "Monthly refresh", "API access", "Custom filters"]},
            {"tier": "Custom Research", "monthly_usd": 0,
             "calls_included": -1, "overage_per_1k": 0,
             "features": ["Bespoke cohorts", "Daily granularity", "Analyst support", "Exclusivity window"]},
        ],
        "sla": {"latency_p99_ms": 0, "uptime_pct": 99.0, "refresh_rate": "Monthly"},
        "customers": 0,
        "monthly_arr_usd": 0,
        "api_calls_mtd": 0,
    },
]

# ---------------------------------------------------------------------------
# Model: Compliance Regulations  (regulatory matrix for data monetization)
# ---------------------------------------------------------------------------

REGULATIONS = [
    {
        "id": "GDPR",
        "name": "General Data Protection Regulation",
        "jurisdiction": "EU / EEA",
        "scope": "Personal data of EU residents — applies globally if processing EU resident data",
        "key_obligations": [
            "Lawful basis for processing",
            "Data minimisation & purpose limitation",
            "Data subject rights (access, erasure, portability)",
            "DPA / DPO appointment for high-risk activities",
            "72-hour breach notification to supervisory authority",
            "Data Processing Agreements with all processors",
        ],
        "max_penalty": "€20M or 4% of global annual turnover",
        "data_types": ["PII", "Behavioral", "Location", "Health / Special category"],
        "industries": ["All industries processing EU resident data"],
        "monetization_impact": "Restricts selling raw PII; requires anonymisation or explicit consent for secondary use",
        "severity": "High",
    },
    {
        "id": "CCPA",
        "name": "California Consumer Privacy Act / CPRA",
        "jurisdiction": "California, USA",
        "scope": "California residents; businesses meeting revenue / data volume thresholds",
        "key_obligations": [
            "Right to know what personal information is collected",
            "Right to delete personal information",
            "Right to opt-out of sale or sharing",
            "Sensitive PI — opt-in required",
            "Contracts with all third parties who receive PI",
        ],
        "max_penalty": "$7,500 per intentional violation",
        "data_types": ["PII", "Biometric", "Geolocation", "Inferences"],
        "industries": ["Retail", "Financial Services", "Healthcare", "AdTech"],
        "monetization_impact": "Consumers can opt-out of data selling; third-party sharing requires explicit contracts",
        "severity": "High",
    },
    {
        "id": "HIPAA",
        "name": "Health Insurance Portability and Accountability Act",
        "jurisdiction": "USA",
        "scope": "Protected Health Information (PHI) held by covered entities and business associates",
        "key_obligations": [
            "De-identification before secondary use (Safe Harbor or Expert Determination)",
            "Business Associate Agreements (BAAs) with all partners",
            "Minimum necessary standard",
            "Audit controls and access logs",
            "Breach notification within 60 days",
        ],
        "max_penalty": "$1.9M per violation category per year",
        "data_types": ["PHI", "Medical records", "Billing data", "Device data linked to patients"],
        "industries": ["Healthcare", "Health Insurance", "Medical Devices", "Life Sciences"],
        "monetization_impact": "PHI cannot be sold; de-identified data (18-point safe harbor) can be commercialised",
        "severity": "High",
    },
    {
        "id": "DPDP",
        "name": "Digital Personal Data Protection Act",
        "jurisdiction": "India",
        "scope": "Digital personal data of Indian residents; processed within or outside India",
        "key_obligations": [
            "Consent-based processing with clear notice",
            "Purpose limitation",
            "Data fiduciary obligations",
            "Cross-border transfer only to permitted territories",
            "Significant data fiduciary additional obligations",
            "Child data — verifiable parental consent",
        ],
        "max_penalty": "₹250 Cr (~$30M) per incident",
        "data_types": ["Personal data", "Sensitive personal data"],
        "industries": ["All industries with Indian resident data"],
        "monetization_impact": "Explicit consent required for commercial secondary use; cross-border restrictions apply",
        "severity": "High",
    },
    {
        "id": "NERC-CIP",
        "name": "NERC Critical Infrastructure Protection Standards",
        "jurisdiction": "North America (USA, Canada, Mexico bulk power)",
        "scope": "Bulk Electric System (BES) cyber systems and operational data",
        "key_obligations": [
            "Access management for BES cyber systems",
            "Security patch management",
            "Incident reporting within 1 hour for severe events",
            "Supply chain risk management",
            "Electronic security perimeter controls",
        ],
        "max_penalty": "$1M per violation per day",
        "data_types": ["Grid telemetry", "SCADA data", "Control system logs"],
        "industries": ["Electric Utilities", "Grid Operators", "Energy ISOs"],
        "monetization_impact": "Grid operational data subject to access restrictions; aggregated/anonymised products require compliance review",
        "severity": "High",
    },
    {
        "id": "PDPA",
        "name": "Personal Data Protection Act (Singapore / Thailand)",
        "jurisdiction": "Singapore / Thailand",
        "scope": "Personal data collected, used, or disclosed in Singapore / Thailand",
        "key_obligations": [
            "Consent obligation before collection",
            "Notification of purpose",
            "Access and correction rights",
            "Data Protection Officer appointment",
            "Data breach notification within 3 days (SG)",
        ],
        "max_penalty": "SGD 1M (Singapore) / THB 5M (Thailand)",
        "data_types": ["PII", "National ID", "Financial data"],
        "industries": ["All industries operating in ASEAN"],
        "monetization_impact": "Consent required for secondary commercial use; ASEAN data marketplace strategies need multi-jurisdiction analysis",
        "severity": "Medium",
    },
]

# ---------------------------------------------------------------------------
# Model: Buyer Personas  (go-to-market targeting)
# ---------------------------------------------------------------------------

BUYER_PERSONAS = [
    {
        "id": "BP-001",
        "name": "The Alpha-Hungry Quant",
        "icon": "📈",
        "role": "Quantitative Researcher / Portfolio Manager",
        "company_type": "Hedge Fund / Asset Manager",
        "industry": "Financial Services",
        "company_size": "$500M–$10B AUM",
        "pain_points": [
            "Commoditised signals losing alpha half-life",
            "Slow alternative data procurement (3–6 months)",
            "Manual data cleaning before model ingestion",
        ],
        "success_metrics": [
            "Sharpe improvement ≥ 0.1",
            "Signal half-life > 6 months",
            "Data latency < 1 hour",
        ],
        "wtp_monthly_usd": {"min": 2_000, "typical": 8_000, "max": 50_000},
        "decision_cycle_days": 45,
        "key_objections": ["Data exclusivity requirements", "IP ownership clarity", "Backfill depth"],
        "buying_triggers": ["Fund strategy change", "New regulatory alpha mandate", "Competitor adoption"],
        "channels": ["Direct outreach via LinkedIn", "Alternative data conference", "Data marketplace listing"],
    },
    {
        "id": "BP-002",
        "name": "The Supply Chain Optimizer",
        "icon": "🚛",
        "role": "VP Supply Chain / Chief Procurement Officer",
        "company_type": "Manufacturer / Retailer / 3PL",
        "industry": "Manufacturing & Supply Chain",
        "company_size": "$1B–$50B revenue",
        "pain_points": [
            "Freight cost unpredictability — ±30% quarterly swings",
            "No benchmark data for carrier negotiation",
            "Manual lane-by-lane rate analysis taking weeks",
        ],
        "success_metrics": [
            "Freight cost reduction ≥ 5%",
            "Carrier contract cycle time < 2 weeks",
            "On-time delivery improvement ≥ 3pp",
        ],
        "wtp_monthly_usd": {"min": 500, "typical": 2_500, "max": 15_000},
        "decision_cycle_days": 60,
        "key_objections": ["Data freshness guarantees", "Integration with TMS", "ROI proof-of-concept"],
        "buying_triggers": ["Annual carrier contract renewal", "New logistics VP hire", "Cost reduction initiative"],
        "channels": ["Industry analyst report", "Gartner peer review", "Pilot programme offer"],
    },
    {
        "id": "BP-003",
        "name": "The CPG Category Manager",
        "icon": "🛍️",
        "role": "Category Manager / Head of Consumer Insights",
        "company_type": "CPG Brand / FMCG Company",
        "industry": "Retail & Consumer Goods",
        "company_size": "$100M–$5B revenue",
        "pain_points": [
            "Reliance on syndicated panel data with 4-week lag",
            "No real-time view of category share shifts",
            "Retailer data sharing fragmented across 20+ portals",
        ],
        "success_metrics": [
            "Category share signal within 48 hours",
            "Promo lift visibility same week",
            "Reduction in BI tool subscriptions",
        ],
        "wtp_monthly_usd": {"min": 3_000, "typical": 10_000, "max": 40_000},
        "decision_cycle_days": 90,
        "key_objections": ["Panel vs. transactional data methodology", "Retailer coverage gaps", "GDPR / data lineage"],
        "buying_triggers": ["Syndicated data contract renewal", "New product launch planning", "Board-level growth mandate"],
        "channels": ["Consumer goods conference", "Consultancy referral", "Retailer data marketplace"],
    },
    {
        "id": "BP-004",
        "name": "The Pharma Real-World Evidence Lead",
        "icon": "💊",
        "role": "VP Real-World Evidence / Medical Affairs Director",
        "company_type": "Pharmaceutical / Biotech Company",
        "industry": "Healthcare & Life Sciences",
        "company_size": "$1B+ revenue",
        "pain_points": [
            "RCT results not translating to real-world outcomes",
            "Slow and expensive patient registry build",
            "Regulatory submissions lacking longitudinal RWE",
        ],
        "success_metrics": [
            "Time to RWE submission: < 12 months",
            "Patient cohort matching accuracy ≥ 90%",
            "FDA / EMA label expansion supported",
        ],
        "wtp_monthly_usd": {"min": 10_000, "typical": 35_000, "max": 200_000},
        "decision_cycle_days": 180,
        "key_objections": ["IRB / ethics approval requirements", "De-identification standard", "Data provenance documentation"],
        "buying_triggers": ["New drug approval filing", "Phase III trial completion", "Competitor RWE publication"],
        "channels": ["Medical conference", "Health data consortium", "CRO / consulting referral"],
    },
    {
        "id": "BP-005",
        "name": "The Grid Flexibility Trader",
        "icon": "⚡",
        "role": "Head of Energy Trading / Flexibility Product Manager",
        "company_type": "Energy Retailer / Aggregator / ISO",
        "industry": "Energy & Utilities",
        "company_size": "$500M–$20B",
        "pain_points": [
            "Demand forecast errors leading to imbalance costs",
            "No visibility into distributed asset flexibility",
            "Manual settlement reconciliation",
        ],
        "success_metrics": [
            "Forecast MAPE < 3%",
            "Flexibility response time < 5 minutes",
            "Imbalance cost reduction ≥ 10%",
        ],
        "wtp_monthly_usd": {"min": 5_000, "typical": 20_000, "max": 100_000},
        "decision_cycle_days": 120,
        "key_objections": ["NERC CIP compliance", "Data latency guarantees", "Grid interconnect API"],
        "buying_triggers": ["Renewable capacity addition", "Demand response programme launch", "Grid stress event"],
        "channels": ["Energy industry forum", "Utility innovation lab", "ISO / TSO direct"],
    },
]

# ---------------------------------------------------------------------------
# Model: Revenue Scenarios  (financial projections)
# ---------------------------------------------------------------------------

REVENUE_SCENARIOS = [
    {
        "scenario": "Bear Case",
        "icon": "🐻",
        "color": "#f472b6",
        "assumptions": [
            "1 data product live by month 9",
            "Average ACV: $10,000",
            "Monthly churn: 4%",
            "New logo growth: 1/month from month 6",
            "Compliance delays slow two products",
        ],
        "projections": [
            {"period": "Q1", "arr_usd": 0,       "customers": 0,  "products": 0},
            {"period": "Q2", "arr_usd": 0,       "customers": 0,  "products": 0},
            {"period": "Q3", "arr_usd": 10_000,  "customers": 1,  "products": 1},
            {"period": "Q4", "arr_usd": 30_000,  "customers": 3,  "products": 1},
            {"period": "Y2 End", "arr_usd": 120_000, "customers": 12, "products": 2},
            {"period": "Y3 End", "arr_usd": 360_000, "customers": 32, "products": 3},
        ],
        "y3_arr_usd": 360_000,
    },
    {
        "scenario": "Base Case",
        "icon": "📊",
        "color": "#60a5fa",
        "assumptions": [
            "2 data products live by month 6",
            "Average ACV: $18,000",
            "Monthly churn: 2.5%",
            "New logo growth: 3/month from month 4",
            "Marketplace listing adds 30% inbound pipeline",
        ],
        "projections": [
            {"period": "Q1", "arr_usd": 0,         "customers": 0,  "products": 1},
            {"period": "Q2", "arr_usd": 36_000,    "customers": 4,  "products": 2},
            {"period": "Q3", "arr_usd": 108_000,   "customers": 9,  "products": 2},
            {"period": "Q4", "arr_usd": 216_000,   "customers": 16, "products": 3},
            {"period": "Y2 End", "arr_usd": 540_000,   "customers": 34, "products": 5},
            {"period": "Y3 End", "arr_usd": 1_200_000, "customers": 72, "products": 8},
        ],
        "y3_arr_usd": 1_200_000,
    },
    {
        "scenario": "Bull Case",
        "icon": "🚀",
        "color": "#34d399",
        "assumptions": [
            "3 data products live by month 4",
            "Average ACV: $32,000",
            "Monthly churn: 1%",
            "New logo growth: 6/month from month 3",
            "Strategic partnership accelerates distribution",
            "Two enterprise exclusivity deals signed in Year 1",
        ],
        "projections": [
            {"period": "Q1", "arr_usd": 32_000,     "customers": 1,   "products": 1},
            {"period": "Q2", "arr_usd": 160_000,    "customers": 7,   "products": 3},
            {"period": "Q3", "arr_usd": 480_000,    "customers": 18,  "products": 4},
            {"period": "Q4", "arr_usd": 960_000,    "customers": 34,  "products": 5},
            {"period": "Y2 End", "arr_usd": 2_400_000,  "customers": 78,  "products": 9},
            {"period": "Y3 End", "arr_usd": 5_000_000,  "customers": 158, "products": 15},
        ],
        "y3_arr_usd": 5_000_000,
    },
]

# ---------------------------------------------------------------------------
# Static domain data
# ---------------------------------------------------------------------------

INDUSTRIES = [
    {
        "name": "Financial Services",
        "icon": "💹",
        "sub_industries": [
            {"name": "Retail Banking", "assets": "Transaction history, credit behavior, channel usage", "levers": "Embedded finance APIs, behavioral scoring, fraud-model licensing"},
            {"name": "Capital Markets", "assets": "Trade flow, order book depth, sentiment signals", "levers": "Alternative data feeds, quant factor licensing, analytics SaaS"},
            {"name": "Insurance", "assets": "Claims patterns, telematics, underwriting signals", "levers": "Risk-scoring APIs, real-time pricing engines, partner data pools"},
            {"name": "Wealth Management", "assets": "Portfolio behavior, risk preference, life events", "levers": "Personalized advisory engines, robo-advisor data licensing"},
            {"name": "FinTech / Payments", "assets": "Merchant MCC patterns, cash-flow signals", "levers": "SMB credit underwriting APIs, merchant insights products"},
        ],
    },
    {
        "name": "Healthcare & Life Sciences",
        "icon": "🏥",
        "sub_industries": [
            {"name": "Health Systems", "assets": "Clinical notes, EHR, readmission patterns", "levers": "De-identified research datasets, HEDIS analytics services"},
            {"name": "Pharma / Biotech", "assets": "Trial data, molecular assays, RWE", "levers": "Clinical development partnerships, regulatory filing packages"},
            {"name": "Medical Devices", "assets": "Device telemetry, usage waveforms", "levers": "Predictive maintenance SaaS, outcomes benchmarking"},
            {"name": "Payers / Insurers", "assets": "Claims adjudication, utilization", "levers": "Risk stratification APIs, population health data products"},
            {"name": "Digital Health", "assets": "Wearable streams, symptom logs", "levers": "Consumer wellness APIs, research data partnerships"},
        ],
    },
    {
        "name": "Retail & Consumer Goods",
        "icon": "🛒",
        "sub_industries": [
            {"name": "E-Commerce", "assets": "Clickstream, basket data, search intent", "levers": "Supplier analytics portals, demand-forecast APIs"},
            {"name": "Grocery / CPG", "assets": "POS scan data, loyalty behavior", "levers": "Retailer-manufacturer data exchanges, shelf analytics"},
            {"name": "Apparel / Fashion", "assets": "Return signals, style affinity, size data", "levers": "Trend forecasting products, fit-analytics licensing"},
            {"name": "Marketplace Platforms", "assets": "Seller performance, buyer patterns", "levers": "Seller intelligence dashboards, category intelligence APIs"},
        ],
    },
    {
        "name": "Manufacturing & Supply Chain",
        "icon": "🏭",
        "sub_industries": [
            {"name": "Discrete Manufacturing", "assets": "Machine sensor telemetry, OEE", "levers": "Predictive maintenance models, OEM benchmarking services"},
            {"name": "Process Manufacturing", "assets": "Quality control signals, yield data", "levers": "Recipe optimization APIs, cross-plant analytics"},
            {"name": "Logistics / 3PL", "assets": "Route, dwell time, carrier performance", "levers": "Freight benchmarking products, carrier scorecards"},
            {"name": "Agriculture (AgriTech)", "assets": "Field sensors, weather correlations, yield maps", "levers": "Precision farming APIs, crop-insurance signal licensing"},
        ],
    },
    {
        "name": "Energy & Utilities",
        "icon": "⚡",
        "sub_industries": [
            {"name": "Electric Utilities", "assets": "Smart-meter intervals, grid events", "levers": "Demand-response APIs, grid-edge analytics"},
            {"name": "Oil & Gas", "assets": "Well logs, seismic, production telemetry", "levers": "Subsurface analytics SaaS, trading signal APIs"},
            {"name": "Renewables", "assets": "Generation forecasts, curtailment logs", "levers": "Grid integration APIs, carbon accounting services"},
            {"name": "Water Utilities", "assets": "Consumption patterns, leak signals", "levers": "Predictive leak-detection SaaS, ESG data products"},
        ],
    },
    {
        "name": "Telecommunications & Media",
        "icon": "📡",
        "sub_industries": [
            {"name": "Mobile / Broadband", "assets": "Network KPIs, subscriber usage", "levers": "Audience intelligence APIs, network benchmarking"},
            {"name": "Streaming / OTT", "assets": "Content engagement, skip/pause signals", "levers": "Content performance analytics, recommendation model licensing"},
            {"name": "Advertising Tech", "assets": "Impression, click, conversion graphs", "levers": "Identity resolution APIs, contextual targeting models"},
        ],
    },
    {
        "name": "Government & Smart Cities",
        "icon": "🏛️",
        "sub_industries": [
            {"name": "Transport / Mobility", "assets": "Ticketing, congestion, parking", "levers": "Mobility-as-a-Service APIs, urban planning analytics"},
            {"name": "Land & Property", "assets": "Cadastral, permit, transaction records", "levers": "Automated valuation models (AVM), risk layers"},
            {"name": "Public Health", "assets": "Surveillance, immunization registries", "levers": "Epidemiological analytics platforms, policy modeling"},
        ],
    },
    {
        "name": "Real Estate & PropTech",
        "icon": "🏢",
        "sub_industries": [
            {"name": "Residential", "assets": "Listing signals, buyer journey, valuations", "levers": "AVM APIs, mortgage origination data packages"},
            {"name": "Commercial / REIT", "assets": "Footfall, lease comps, capex trends", "levers": "Tenant intelligence platforms, portfolio analytics APIs"},
            {"name": "Construction Tech", "assets": "BIM telemetry, labor productivity", "levers": "Project benchmarking SaaS, risk underwriting signals"},
        ],
    },
    {
        "name": "Education & HRTech",
        "icon": "🎓",
        "sub_industries": [
            {"name": "EdTech", "assets": "Learning paths, performance signals", "levers": "Skills gap analytics, curriculum intelligence APIs"},
            {"name": "Workforce / HCM", "assets": "Compensation, tenure, skill graphs", "levers": "Labor market intelligence products, benchmarking APIs"},
        ],
    },
]

AGENTS = [
    {
        "name": "Master Orchestrator",
        "icon": "🧠",
        "status": "active",
        "tasks": 3,
        "description": "Decomposes monetization goals into sub-tasks, manages state, handles failures, and triggers human checkpoints.",
        "tools": ["Planning LLM", "State store", "Task queue"],
    },
    {
        "name": "Asset Discovery",
        "icon": "🔍",
        "status": "active",
        "tasks": 12,
        "description": "Catalogues internal data assets, classifies sensitivity, and scores quality (completeness, freshness, uniqueness).",
        "tools": ["Data catalog APIs", "Schema scanners", "DQ framework"],
    },
    {
        "name": "Value Engine",
        "icon": "💰",
        "status": "active",
        "tasks": 7,
        "description": "Runs valuation models (cost, market-comp, DCF, options) and produces valuation reports with confidence intervals.",
        "tools": ["Financial model tools", "Market data APIs", "Monte Carlo simulator"],
    },
    {
        "name": "Product Builder",
        "icon": "🛠️",
        "status": "idle",
        "tasks": 2,
        "description": "Designs data product schema, generates OpenAPI specs, creates sample datasets and data documentation.",
        "tools": ["Code-gen LLM", "OpenAPI builder", "Data masking tools"],
    },
    {
        "name": "Go-to-Market",
        "icon": "🚀",
        "status": "idle",
        "tasks": 1,
        "description": "Drafts pricing recommendations, identifies buyer personas, creates marketplace listings.",
        "tools": ["CRM API", "Pricing engine", "Email-gen LLM", "Marketplace SDKs"],
    },
    {
        "name": "Compliance & Legal",
        "icon": "⚖️",
        "status": "active",
        "tasks": 5,
        "description": "Checks GDPR/CCPA/DPDP/HIPAA constraints, generates data-sharing agreements, flags PII/PHI exposure.",
        "tools": ["Compliance rulebook", "PII scanner", "Contract template engine"],
    },
    {
        "name": "Measurement",
        "icon": "📊",
        "status": "active",
        "tasks": 8,
        "description": "Tracks revenue attribution, API usage, customer health scores, churn signals; triggers re-pricing.",
        "tools": ["Analytics DB", "Billing API", "Alerting tools"],
    },
]

OBJECTIVES = [
    {"title": "Data Asset Inventory & Quality", "kpi": "200+ assets catalogued", "progress": 78, "color": "#34d399"},
    {"title": "Revenue from Data Products", "kpi": "First external ARR", "progress": 35, "color": "#60a5fa"},
    {"title": "Cost Reduction via Intelligence", "kpi": "3-week → 2-hour valuations", "progress": 60, "color": "#fbbf24"},
    {"title": "Competitive Signal Moat", "kpi": "5 proprietary signal assets", "progress": 45, "color": "#a78bfa"},
    {"title": "Governance & Compliance", "kpi": "0 violations", "progress": 92, "color": "#f472b6"},
]

INITIATIVES = [
    {"title": "Foundation", "months": "Months 1–3", "steps": ["Deploy data catalog", "Run Asset Discovery Agent", "Establish governance charter", "Instrument pipelines with metadata tagging"]},
    {"title": "Valuation Baseline", "months": "Months 2–4", "steps": ["Value top-20 assets", "Produce first DAVR", "Identify top-5 quick wins", "Build pricing playbook per vertical"]},
    {"title": "First Product Launch", "months": "Months 3–6", "steps": ["Design and deploy first data API", "Onboard 3–5 design-partner customers", "Implement metering and billing", "Calibrate pricing model from usage signals"]},
    {"title": "Multi-Vertical Expansion", "months": "Months 6–12", "steps": ["Add more industry verticals", "Launch products per sub-industry", "Build cross-industry bundle recommendations", "Integrate with data marketplaces"]},
    {"title": "Dynamic Pricing", "months": "Months 9–15", "steps": ["Deploy demand-sensing pricing engine", "Implement revenue-share contract management", "Run A/B tests on pricing tiers", "Build churn prediction model"]},
    {"title": "Autonomous Optimization", "months": "Months 12–18", "steps": ["Orchestrator auto-reprices within guardrails", "Real-time P&L dashboards per product", "Train proprietary valuation model on deal history", "Quarterly retraining cadence"]},
]

# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.route("/")
def index():
    total_sub = sum(len(ind["sub_industries"]) for ind in INDUSTRIES)
    active_agents = sum(1 for a in AGENTS if a["status"] == "active")
    return render_template(
        "index.html",
        industries=INDUSTRIES,
        agents=AGENTS,
        objectives=OBJECTIVES,
        total_industries=len(INDUSTRIES),
        total_sub_industries=total_sub,
        active_agents=active_agents,
        total_agents=len(AGENTS),
    )


@app.route("/industries")
def industries():
    selected = request.args.get("industry")
    return render_template("industries.html", industries=INDUSTRIES, selected=selected)


@app.route("/valuation", methods=["GET", "POST"])
def valuation():
    result = None
    form_data = {}
    error = None

    if request.method == "POST":
        form_data = request.form.to_dict()
        try:
            def _float(key, default):
                v = form_data.get(key, "").strip()
                return float(v) if v != "" else default

            def _int(key, default):
                v = form_data.get(key, "").strip()
                return int(v) if v != "" else default

            asset_name = form_data.get("asset_name", "Unnamed Asset").strip() or "Unnamed Asset"
            collection_cost = _float("collection_cost", 0)
            curation_cost   = _float("curation_cost", 0)
            market_benchmark = _float("market_benchmark", 0)
            similarity       = max(0.0, min(1.0, _float("similarity", 0.8)))
            annual_revenue   = _float("annual_revenue", 0)
            growth_rate      = _float("growth_rate", 0.1)
            discount_rate    = _float("discount_rate", 0.12)
            years            = max(1, min(20, _int("years", 5)))

            if discount_rate <= -1.0:
                raise ValueError("Discount rate must be greater than -100%.")

            cost_value = collection_cost + curation_cost
            market_value = market_benchmark * similarity
            dcf_value = sum(
                annual_revenue * ((1 + growth_rate) ** t) / ((1 + discount_rate) ** t)
                for t in range(1, years + 1)
            )
            blended = (cost_value + market_value + dcf_value) / 3.0

            result = {
                "asset_name": asset_name,
                "cost_value": round(cost_value, 2),
                "market_value": round(market_value, 2),
                "dcf_value": round(dcf_value, 2),
                "blended": round(blended, 2),
                "recommendation": _pricing_recommendation(blended),
                "years": years,
            }
        except (ValueError, ZeroDivisionError) as exc:
            error = f"Invalid input — please check all numeric fields. ({exc})"

    return render_template("valuation.html", result=result, form_data=form_data, error=error)


@app.route("/orchestration")
def orchestration():
    return render_template("orchestration.html", agents=AGENTS, initiatives=INITIATIVES)


@app.route("/api/agents")
def api_agents():
    return jsonify(AGENTS)


@app.route("/api/objectives")
def api_objectives():
    return jsonify(OBJECTIVES)


@app.route("/data-products")
def data_products():
    return render_template("data_products.html", products=DATA_PRODUCTS, assets=DATA_ASSETS)


@app.route("/compliance")
def compliance():
    return render_template("compliance.html", regulations=REGULATIONS)


@app.route("/revenue")
def revenue():
    return render_template("revenue.html", scenarios=REVENUE_SCENARIOS, personas=BUYER_PERSONAS)


@app.route("/api/industries")
def api_industries():
    return jsonify(INDUSTRIES)


@app.route("/api/data-assets")
def api_data_assets():
    return jsonify(DATA_ASSETS)


@app.route("/api/data-products")
def api_data_products():
    return jsonify(DATA_PRODUCTS)


@app.route("/api/regulations")
def api_regulations():
    return jsonify(REGULATIONS)


@app.route("/api/buyer-personas")
def api_buyer_personas():
    return jsonify(BUYER_PERSONAS)


@app.route("/api/revenue-scenarios")
def api_revenue_scenarios():
    return jsonify(REVENUE_SCENARIOS)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _pricing_recommendation(blended: float) -> str:
    if blended < 10_000:
        return "Niche / Internal use — consider cost-recovery pricing only."
    if blended < 100_000:
        return "Emerging product — start with a tiered subscription or per-API-call model."
    if blended < 500_000:
        return "Mid-market product — consider subscription + usage-based hybrid pricing."
    return "High-value asset — premium licensing, exclusivity tiers, and revenue-share structures recommended."


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
