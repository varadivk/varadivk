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
            asset_name = form_data.get("asset_name", "Unnamed Asset").strip() or "Unnamed Asset"
            collection_cost = float(form_data.get("collection_cost") or 0)
            curation_cost = float(form_data.get("curation_cost") or 0)
            market_benchmark = float(form_data.get("market_benchmark") or 0)
            similarity = max(0.0, min(1.0, float(form_data.get("similarity") or 0.8)))
            annual_revenue = float(form_data.get("annual_revenue") or 0)
            growth_rate = float(form_data.get("growth_rate") or 0.1)
            discount_rate = float(form_data.get("discount_rate") or 0.12)
            years = max(1, min(20, int(form_data.get("years") or 5)))

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


@app.route("/api/industries")
def api_industries():
    return jsonify(INDUSTRIES)


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
