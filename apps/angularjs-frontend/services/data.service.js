/**
 * DataService — shared in-memory data store for the Data Monetization Agent SPA.
 * All domain data lives here so controllers stay thin.
 */
(function () {
  'use strict';

  angular
    .module('dataMonetizationApp')
    .factory('DataService', DataService);

  function DataService() {
    var service = {
      getIndustries: getIndustries,
      getAgents: getAgents,
      getObjectives: getObjectives,
      getInitiatives: getInitiatives,
      calculateValuation: calculateValuation,
      getPricingRecommendation: getPricingRecommendation,
      getDataAssets: getDataAssets,
      getDataProducts: getDataProducts,
      getRegulations: getRegulations,
      getBuyerPersonas: getBuyerPersonas,
      getRevenueScenarios: getRevenueScenarios
    };
    return service;

    // -----------------------------------------------------------------------
    // Industries
    // -----------------------------------------------------------------------
    function getIndustries() {
      return [
        {
          name: 'Financial Services', icon: '💹',
          subIndustries: [
            { name: 'Retail Banking', assets: 'Transaction history, credit behavior, channel usage', levers: 'Embedded finance APIs, behavioral scoring, fraud-model licensing' },
            { name: 'Capital Markets', assets: 'Trade flow, order book depth, sentiment signals', levers: 'Alternative data feeds, quant factor licensing, analytics SaaS' },
            { name: 'Insurance', assets: 'Claims patterns, telematics, underwriting signals', levers: 'Risk-scoring APIs, real-time pricing engines, partner data pools' },
            { name: 'Wealth Management', assets: 'Portfolio behavior, risk preference, life events', levers: 'Personalized advisory engines, robo-advisor data licensing' },
            { name: 'FinTech / Payments', assets: 'Merchant MCC patterns, cash-flow signals', levers: 'SMB credit underwriting APIs, merchant insights products' }
          ]
        },
        {
          name: 'Healthcare & Life Sciences', icon: '🏥',
          subIndustries: [
            { name: 'Health Systems', assets: 'Clinical notes, EHR, readmission patterns', levers: 'De-identified research datasets, HEDIS analytics services' },
            { name: 'Pharma / Biotech', assets: 'Trial data, molecular assays, RWE', levers: 'Clinical development partnerships, regulatory filing packages' },
            { name: 'Medical Devices', assets: 'Device telemetry, usage waveforms', levers: 'Predictive maintenance SaaS, outcomes benchmarking' },
            { name: 'Payers / Insurers', assets: 'Claims adjudication, utilization', levers: 'Risk stratification APIs, population health data products' },
            { name: 'Digital Health', assets: 'Wearable streams, symptom logs', levers: 'Consumer wellness APIs, research data partnerships' }
          ]
        },
        {
          name: 'Retail & Consumer Goods', icon: '🛒',
          subIndustries: [
            { name: 'E-Commerce', assets: 'Clickstream, basket data, search intent', levers: 'Supplier analytics portals, demand-forecast APIs' },
            { name: 'Grocery / CPG', assets: 'POS scan data, loyalty behavior', levers: 'Retailer-manufacturer data exchanges, shelf analytics' },
            { name: 'Apparel / Fashion', assets: 'Return signals, style affinity, size data', levers: 'Trend forecasting products, fit-analytics licensing' },
            { name: 'Marketplace Platforms', assets: 'Seller performance, buyer patterns', levers: 'Seller intelligence dashboards, category intelligence APIs' }
          ]
        },
        {
          name: 'Manufacturing & Supply Chain', icon: '🏭',
          subIndustries: [
            { name: 'Discrete Manufacturing', assets: 'Machine sensor telemetry, OEE', levers: 'Predictive maintenance models, OEM benchmarking services' },
            { name: 'Process Manufacturing', assets: 'Quality control signals, yield data', levers: 'Recipe optimization APIs, cross-plant analytics' },
            { name: 'Logistics / 3PL', assets: 'Route, dwell time, carrier performance', levers: 'Freight benchmarking products, carrier scorecards' },
            { name: 'Agriculture (AgriTech)', assets: 'Field sensors, weather correlations, yield maps', levers: 'Precision farming APIs, crop-insurance signal licensing' }
          ]
        },
        {
          name: 'Energy & Utilities', icon: '⚡',
          subIndustries: [
            { name: 'Electric Utilities', assets: 'Smart-meter intervals, grid events', levers: 'Demand-response APIs, grid-edge analytics' },
            { name: 'Oil & Gas', assets: 'Well logs, seismic, production telemetry', levers: 'Subsurface analytics SaaS, trading signal APIs' },
            { name: 'Renewables', assets: 'Generation forecasts, curtailment logs', levers: 'Grid integration APIs, carbon accounting services' },
            { name: 'Water Utilities', assets: 'Consumption patterns, leak signals', levers: 'Predictive leak-detection SaaS, ESG data products' }
          ]
        },
        {
          name: 'Telecommunications & Media', icon: '📡',
          subIndustries: [
            { name: 'Mobile / Broadband', assets: 'Network KPIs, subscriber usage', levers: 'Audience intelligence APIs, network benchmarking' },
            { name: 'Streaming / OTT', assets: 'Content engagement, skip/pause signals', levers: 'Content performance analytics, recommendation model licensing' },
            { name: 'Advertising Tech', assets: 'Impression, click, conversion graphs', levers: 'Identity resolution APIs, contextual targeting models' }
          ]
        },
        {
          name: 'Government & Smart Cities', icon: '🏛️',
          subIndustries: [
            { name: 'Transport / Mobility', assets: 'Ticketing, congestion, parking', levers: 'Mobility-as-a-Service APIs, urban planning analytics' },
            { name: 'Land & Property', assets: 'Cadastral, permit, transaction records', levers: 'Automated valuation models (AVM), risk layers' },
            { name: 'Public Health', assets: 'Surveillance, immunization registries', levers: 'Epidemiological analytics platforms, policy modeling' }
          ]
        },
        {
          name: 'Real Estate & PropTech', icon: '🏢',
          subIndustries: [
            { name: 'Residential', assets: 'Listing signals, buyer journey, valuations', levers: 'AVM APIs, mortgage origination data packages' },
            { name: 'Commercial / REIT', assets: 'Footfall, lease comps, capex trends', levers: 'Tenant intelligence platforms, portfolio analytics APIs' },
            { name: 'Construction Tech', assets: 'BIM telemetry, labor productivity', levers: 'Project benchmarking SaaS, risk underwriting signals' }
          ]
        },
        {
          name: 'Education & HRTech', icon: '🎓',
          subIndustries: [
            { name: 'EdTech', assets: 'Learning paths, performance signals', levers: 'Skills gap analytics, curriculum intelligence APIs' },
            { name: 'Workforce / HCM', assets: 'Compensation, tenure, skill graphs', levers: 'Labor market intelligence products, benchmarking APIs' }
          ]
        }
      ];
    }

    // -----------------------------------------------------------------------
    // Agents
    // -----------------------------------------------------------------------
    function getAgents() {
      return [
        { name: 'Master Orchestrator', icon: '🧠', status: 'active', tasks: 3, description: 'Decomposes monetization goals into sub-tasks, manages state, handles failures, and triggers human checkpoints.', tools: ['Planning LLM', 'State store', 'Task queue'] },
        { name: 'Asset Discovery', icon: '🔍', status: 'active', tasks: 12, description: 'Catalogues internal data assets, classifies sensitivity, and scores quality (completeness, freshness, uniqueness).', tools: ['Data catalog APIs', 'Schema scanners', 'DQ framework'] },
        { name: 'Value Engine', icon: '💰', status: 'active', tasks: 7, description: 'Runs valuation models (cost, market-comp, DCF, options) and produces valuation reports with confidence intervals.', tools: ['Financial model tools', 'Market data APIs', 'Monte Carlo simulator'] },
        { name: 'Product Builder', icon: '🛠️', status: 'idle', tasks: 2, description: 'Designs data product schema, generates OpenAPI specs, creates sample datasets and data documentation.', tools: ['Code-gen LLM', 'OpenAPI builder', 'Data masking tools'] },
        { name: 'Go-to-Market', icon: '🚀', status: 'idle', tasks: 1, description: 'Drafts pricing recommendations, identifies buyer personas, creates marketplace listings.', tools: ['CRM API', 'Pricing engine', 'Email-gen LLM', 'Marketplace SDKs'] },
        { name: 'Compliance & Legal', icon: '⚖️', status: 'active', tasks: 5, description: 'Checks GDPR/CCPA/DPDP/HIPAA constraints, generates data-sharing agreements, flags PII/PHI exposure.', tools: ['Compliance rulebook', 'PII scanner', 'Contract template engine'] },
        { name: 'Measurement', icon: '📊', status: 'active', tasks: 8, description: 'Tracks revenue attribution, API usage, customer health scores, churn signals; triggers re-pricing.', tools: ['Analytics DB', 'Billing API', 'Alerting tools'] }
      ];
    }

    // -----------------------------------------------------------------------
    // Objectives
    // -----------------------------------------------------------------------
    function getObjectives() {
      return [
        { title: 'Data Asset Inventory & Quality', kpi: '200+ assets catalogued', progress: 78, color: '#34d399' },
        { title: 'Revenue from Data Products', kpi: 'First external ARR', progress: 35, color: '#60a5fa' },
        { title: 'Cost Reduction via Intelligence', kpi: '3-week → 2-hour valuations', progress: 60, color: '#fbbf24' },
        { title: 'Competitive Signal Moat', kpi: '5 proprietary signal assets', progress: 45, color: '#a78bfa' },
        { title: 'Governance & Compliance', kpi: '0 violations', progress: 92, color: '#f472b6' }
      ];
    }

    // -----------------------------------------------------------------------
    // Strategic Initiatives
    // -----------------------------------------------------------------------
    function getInitiatives() {
      return [
        { title: 'Foundation', months: 'Months 1–3', steps: ['Deploy data catalog', 'Run Asset Discovery Agent', 'Establish governance charter', 'Instrument pipelines with metadata tagging'] },
        { title: 'Valuation Baseline', months: 'Months 2–4', steps: ['Value top-20 assets', 'Produce first DAVR', 'Identify top-5 quick wins', 'Build pricing playbook per vertical'] },
        { title: 'First Product Launch', months: 'Months 3–6', steps: ['Design and deploy first data API', 'Onboard 3–5 design-partner customers', 'Implement metering and billing', 'Calibrate pricing model from usage signals'] },
        { title: 'Multi-Vertical Expansion', months: 'Months 6–12', steps: ['Add more industry verticals', 'Launch products per sub-industry', 'Build cross-industry bundle recommendations', 'Integrate with data marketplaces'] },
        { title: 'Dynamic Pricing', months: 'Months 9–15', steps: ['Deploy demand-sensing pricing engine', 'Implement revenue-share contract management', 'Run A/B tests on pricing tiers', 'Build churn prediction model'] },
        { title: 'Autonomous Optimization', months: 'Months 12–18', steps: ['Orchestrator auto-reprices within guardrails', 'Real-time P&L dashboards per product', 'Train proprietary valuation model on deal history', 'Quarterly retraining cadence'] }
      ];
    }

    // -----------------------------------------------------------------------
    // Valuation calculator (mirrors Python app logic)
    // -----------------------------------------------------------------------
    function calculateValuation(params) {
      var collectionCost = parseFloat(params.collectionCost) || 0;
      var curationCost   = parseFloat(params.curationCost)   || 0;
      var marketBench    = parseFloat(params.marketBenchmark) || 0;
      var similarity     = Math.max(0, Math.min(1, parseFloat(params.similarity) || 0.8));
      var annualRevenue  = parseFloat(params.annualRevenue)  || 0;
      var growthRate     = parseFloat(params.growthRate)     || 0.1;
      var discountRate   = parseFloat(params.discountRate)   || 0.12;
      var years          = Math.max(1, Math.min(20, parseInt(params.years) || 5));

      var costValue   = collectionCost + curationCost;
      var marketValue = marketBench * similarity;
      var dcfValue    = 0;
      for (var t = 1; t <= years; t++) {
        dcfValue += annualRevenue * Math.pow(1 + growthRate, t) / Math.pow(1 + discountRate, t);
      }
      var blended = (costValue + marketValue + dcfValue) / 3;

      return {
        assetName:    params.assetName || 'Unnamed Asset',
        costValue:    Math.round(costValue),
        marketValue:  Math.round(marketValue),
        dcfValue:     Math.round(dcfValue),
        blended:      Math.round(blended),
        years:        years,
        recommendation: getPricingRecommendation(blended)
      };
    }

    function getPricingRecommendation(blended) {
      if (blended < 10000)   return 'Niche / Internal use — consider cost-recovery pricing only.';
      if (blended < 100000)  return 'Emerging product — start with a tiered subscription or per-API-call model.';
      if (blended < 500000)  return 'Mid-market product — consider subscription + usage-based hybrid pricing.';
      return 'High-value asset — premium licensing, exclusivity tiers, and revenue-share structures recommended.';
    }

    // -----------------------------------------------------------------------
    // Data Assets
    // -----------------------------------------------------------------------
    function getDataAssets() {
      return [
        { id: 'DA-001', name: 'Freight Lane Benchmark Feed', assetType: 'Operational Time-Series', sourceSystem: 'TMS / ERP', owner: 'Logistics BU', industry: 'Manufacturing & Supply Chain', subIndustry: 'Logistics / 3PL', sensitivity: 'Internal', pii: false, regulatoryTags: [], quality: { completeness: 94, accuracy: 91, freshness: 4, uniqueness: 99, consistency: 88, overall: 94 }, volume: { records: 18500000, updateFreq: 'Hourly', historyYears: 5 }, commercial: { tamUsd: 8200000, moatScore: 7, uniquenessScore: 8, substitutability: 'Low' }, status: 'Productized', tags: ['logistics', 'freight', 'time-series'] },
        { id: 'DA-002', name: 'Retail Transaction Graph', assetType: 'Graph / Network', sourceSystem: 'POS + Loyalty Platform', owner: 'Retail BU', industry: 'Retail & Consumer Goods', subIndustry: 'Grocery / CPG', sensitivity: 'Confidential', pii: true, regulatoryTags: ['GDPR', 'CCPA'], quality: { completeness: 87, accuracy: 95, freshness: 24, uniqueness: 96, consistency: 91, overall: 91 }, volume: { records: 420000000, updateFreq: 'Daily', historyYears: 7 }, commercial: { tamUsd: 22000000, moatScore: 9, uniquenessScore: 9, substitutability: 'Very Low' }, status: 'Valued', tags: ['retail', 'transactions', 'graph', 'PII'] },
        { id: 'DA-003', name: 'Machine Sensor Telemetry', assetType: 'IoT Time-Series', sourceSystem: 'SCADA / MES', owner: 'Manufacturing BU', industry: 'Manufacturing & Supply Chain', subIndustry: 'Discrete Manufacturing', sensitivity: 'Internal', pii: false, regulatoryTags: [], quality: { completeness: 99, accuracy: 97, freshness: 0.1, uniqueness: 100, consistency: 95, overall: 98 }, volume: { records: 2800000000, updateFreq: 'Real-time', historyYears: 4 }, commercial: { tamUsd: 15400000, moatScore: 8, uniquenessScore: 9, substitutability: 'Low' }, status: 'Productized', tags: ['manufacturing', 'IoT', 'real-time'] },
        { id: 'DA-004', name: 'Smart-Meter Interval Data', assetType: 'Regulatory Time-Series', sourceSystem: 'AMI / MDM', owner: 'Grid Operations', industry: 'Energy & Utilities', subIndustry: 'Electric Utilities', sensitivity: 'Confidential', pii: true, regulatoryTags: ['GDPR', 'NERC CIP'], quality: { completeness: 98, accuracy: 99, freshness: 1, uniqueness: 100, consistency: 97, overall: 98 }, volume: { records: 5200000000, updateFreq: '15-min intervals', historyYears: 6 }, commercial: { tamUsd: 11700000, moatScore: 8, uniquenessScore: 7, substitutability: 'Medium' }, status: 'Catalogued', tags: ['energy', 'smart-meter', 'regulated'] },
        { id: 'DA-005', name: 'EHR Clinical Notes Corpus', assetType: 'Unstructured Text', sourceSystem: 'Epic / Cerner EHR', owner: 'Health System IT', industry: 'Healthcare & Life Sciences', subIndustry: 'Health Systems', sensitivity: 'Restricted', pii: true, regulatoryTags: ['HIPAA', 'GDPR'], quality: { completeness: 78, accuracy: 89, freshness: 48, uniqueness: 94, consistency: 72, overall: 82 }, volume: { records: 34000000, updateFreq: 'Daily', historyYears: 10 }, commercial: { tamUsd: 43000000, moatScore: 10, uniquenessScore: 10, substitutability: 'None' }, status: 'Valued', tags: ['healthcare', 'clinical', 'NLP', 'PHI'] },
        { id: 'DA-006', name: 'Ad Impression / Click Graph', assetType: 'Event Stream', sourceSystem: 'DSP / Ad Server', owner: 'AdTech BU', industry: 'Telecommunications & Media', subIndustry: 'Advertising Tech', sensitivity: 'Confidential', pii: true, regulatoryTags: ['GDPR', 'CCPA', 'COPPA'], quality: { completeness: 91, accuracy: 93, freshness: 0.25, uniqueness: 88, consistency: 90, overall: 91 }, volume: { records: 12000000000, updateFreq: 'Real-time', historyYears: 3 }, commercial: { tamUsd: 35000000, moatScore: 7, uniquenessScore: 6, substitutability: 'Medium' }, status: 'Catalogued', tags: ['adtech', 'events', 'real-time', 'PII'] }
      ];
    }

    // -----------------------------------------------------------------------
    // Data Products
    // -----------------------------------------------------------------------
    function getDataProducts() {
      return [
        {
          id: 'DP-001', name: 'FreightIQ API',
          description: 'Real-time freight lane benchmarks across 500+ OD pairs — ideal for shippers, 3PLs, and freight-tech platforms.',
          type: 'API', sourceAssets: ['DA-001'], industry: 'Logistics / Supply Chain',
          status: 'Live', launchDate: '2026-01-15',
          pricingTiers: [
            { tier: 'Starter', monthlyUsd: 299, callsIncluded: 10000, overagePer1k: 25, features: ['Lane-level benchmarks', 'Weekly refresh', 'REST API', 'CSV export'] },
            { tier: 'Professional', monthlyUsd: 1499, callsIncluded: 100000, overagePer1k: 12, features: ['Lane + carrier benchmarks', 'Daily refresh', 'REST + webhooks', 'SLA 99.5%'] },
            { tier: 'Enterprise', monthlyUsd: 0, callsIncluded: -1, overagePer1k: 0, features: ['Custom lanes', 'Real-time refresh', 'Dedicated instance', 'SLA 99.9%', 'Revenue-share option'] }
          ],
          sla: { latencyP99Ms: 120, uptimePct: 99.9, refreshRate: 'Hourly' },
          customers: 14, monthlyArrUsd: 42300, apiCallsMtd: 1240000
        },
        {
          id: 'DP-002', name: 'Manufacturing OEE Benchmark Suite',
          description: 'Cross-plant OEE and downtime benchmarks; enriched with failure-mode labels for predictive maintenance.',
          type: 'Dataset + API', sourceAssets: ['DA-003'], industry: 'Manufacturing',
          status: 'Beta', launchDate: '2026-03-01',
          pricingTiers: [
            { tier: 'Beta Access', monthlyUsd: 0, callsIncluded: 5000, overagePer1k: 0, features: ['5 plants sample', 'Monthly snapshot', 'CSV only', 'Feedback-loop agreement'] },
            { tier: 'Standard', monthlyUsd: 2499, callsIncluded: 50000, overagePer1k: 40, features: ['50+ plants', 'Weekly refresh', 'REST API', 'Failure-mode labels'] },
            { tier: 'Enterprise', monthlyUsd: 0, callsIncluded: -1, overagePer1k: 0, features: ['All plants', 'Real-time streaming', 'Custom taxonomies', 'Model-ready format'] }
          ],
          sla: { latencyP99Ms: 350, uptimePct: 99.5, refreshRate: 'Weekly' },
          customers: 3, monthlyArrUsd: 7497, apiCallsMtd: 118000
        },
        {
          id: 'DP-003', name: 'Consumer Spend Intelligence Feed',
          description: 'Anonymised spend trends by category, geography, and demographic cohort — from POS transaction graph.',
          type: 'Dataset', sourceAssets: ['DA-002'], industry: 'Retail & CPG',
          status: 'Draft', launchDate: null,
          pricingTiers: [
            { tier: 'Quarterly Snapshot', monthlyUsd: 4999, callsIncluded: -1, overagePer1k: 0, features: ['National coverage', '12 categories', 'Quarterly delivery', 'Excel + JSON'] },
            { tier: 'Monthly Feed', monthlyUsd: 14999, callsIncluded: -1, overagePer1k: 0, features: ['National + DMA', '50 categories', 'Monthly refresh', 'API access'] },
            { tier: 'Custom Research', monthlyUsd: 0, callsIncluded: -1, overagePer1k: 0, features: ['Bespoke cohorts', 'Daily granularity', 'Analyst support', 'Exclusivity window'] }
          ],
          sla: { latencyP99Ms: 0, uptimePct: 99.0, refreshRate: 'Monthly' },
          customers: 0, monthlyArrUsd: 0, apiCallsMtd: 0
        }
      ];
    }

    // -----------------------------------------------------------------------
    // Compliance Regulations
    // -----------------------------------------------------------------------
    function getRegulations() {
      return [
        { id: 'GDPR', name: 'General Data Protection Regulation', jurisdiction: 'EU / EEA', scope: 'Personal data of EU residents — applies globally if processing EU resident data', keyObligations: ['Lawful basis for processing', 'Data minimisation & purpose limitation', 'Data subject rights (access, erasure, portability)', 'DPA / DPO appointment', '72-hour breach notification', 'Data Processing Agreements with all processors'], maxPenalty: '€20M or 4% of global annual turnover', dataTypes: ['PII', 'Behavioral', 'Location', 'Health / Special category'], industries: ['All industries processing EU resident data'], monetizationImpact: 'Restricts selling raw PII; requires anonymisation or explicit consent for secondary use', severity: 'High' },
        { id: 'CCPA', name: 'California Consumer Privacy Act / CPRA', jurisdiction: 'California, USA', scope: 'California residents; businesses meeting revenue / data volume thresholds', keyObligations: ['Right to know what personal information is collected', 'Right to delete personal information', 'Right to opt-out of sale or sharing', 'Sensitive PI — opt-in required', 'Contracts with all third parties receiving PI'], maxPenalty: '$7,500 per intentional violation', dataTypes: ['PII', 'Biometric', 'Geolocation', 'Inferences'], industries: ['Retail', 'Financial Services', 'Healthcare', 'AdTech'], monetizationImpact: 'Consumers can opt-out of data selling; third-party sharing requires explicit contracts', severity: 'High' },
        { id: 'HIPAA', name: 'Health Insurance Portability and Accountability Act', jurisdiction: 'USA', scope: 'Protected Health Information (PHI) held by covered entities and business associates', keyObligations: ['De-identification before secondary use', 'Business Associate Agreements (BAAs)', 'Minimum necessary standard', 'Audit controls and access logs', 'Breach notification within 60 days'], maxPenalty: '$1.9M per violation category per year', dataTypes: ['PHI', 'Medical records', 'Billing data', 'Device data linked to patients'], industries: ['Healthcare', 'Health Insurance', 'Medical Devices', 'Life Sciences'], monetizationImpact: 'PHI cannot be sold; de-identified data (18-point safe harbor) can be commercialised', severity: 'High' },
        { id: 'DPDP', name: 'Digital Personal Data Protection Act', jurisdiction: 'India', scope: 'Digital personal data of Indian residents; processed within or outside India', keyObligations: ['Consent-based processing with clear notice', 'Purpose limitation', 'Data fiduciary obligations', 'Cross-border transfer only to permitted territories', 'Significant data fiduciary additional obligations', 'Child data — verifiable parental consent'], maxPenalty: '₹250 Cr (~$30M) per incident', dataTypes: ['Personal data', 'Sensitive personal data'], industries: ['All industries with Indian resident data'], monetizationImpact: 'Explicit consent required for commercial secondary use; cross-border restrictions apply', severity: 'High' },
        { id: 'NERC-CIP', name: 'NERC Critical Infrastructure Protection Standards', jurisdiction: 'North America', scope: 'Bulk Electric System (BES) cyber systems and operational data', keyObligations: ['Access management for BES cyber systems', 'Security patch management', 'Incident reporting within 1 hour for severe events', 'Supply chain risk management', 'Electronic security perimeter controls'], maxPenalty: '$1M per violation per day', dataTypes: ['Grid telemetry', 'SCADA data', 'Control system logs'], industries: ['Electric Utilities', 'Grid Operators', 'Energy ISOs'], monetizationImpact: 'Grid operational data subject to access restrictions; aggregated/anonymised products require compliance review', severity: 'High' },
        { id: 'PDPA', name: 'Personal Data Protection Act (Singapore / Thailand)', jurisdiction: 'Singapore / Thailand', scope: 'Personal data collected, used, or disclosed in Singapore / Thailand', keyObligations: ['Consent obligation before collection', 'Notification of purpose', 'Access and correction rights', 'Data Protection Officer appointment', 'Breach notification within 3 days (SG)'], maxPenalty: 'SGD 1M (Singapore) / THB 5M (Thailand)', dataTypes: ['PII', 'National ID', 'Financial data'], industries: ['All industries operating in ASEAN'], monetizationImpact: 'Consent required for secondary commercial use; ASEAN strategies need multi-jurisdiction analysis', severity: 'Medium' }
      ];
    }

    // -----------------------------------------------------------------------
    // Buyer Personas
    // -----------------------------------------------------------------------
    function getBuyerPersonas() {
      return [
        { id: 'BP-001', name: 'The Alpha-Hungry Quant', icon: '📈', role: 'Quantitative Researcher / Portfolio Manager', companyType: 'Hedge Fund / Asset Manager', industry: 'Financial Services', companySize: '$500M–$10B AUM', painPoints: ['Commoditised signals losing alpha half-life', 'Slow alternative data procurement (3–6 months)', 'Manual data cleaning before model ingestion'], successMetrics: ['Sharpe improvement ≥ 0.1', 'Signal half-life > 6 months', 'Data latency < 1 hour'], wtpMonthly: { min: 2000, typical: 8000, max: 50000 }, decisionCycleDays: 45, buyingTriggers: ['Fund strategy change', 'New regulatory alpha mandate', 'Competitor adoption'], channels: ['Direct outreach via LinkedIn', 'Alternative data conference', 'Data marketplace listing'] },
        { id: 'BP-002', name: 'The Supply Chain Optimizer', icon: '🚛', role: 'VP Supply Chain / Chief Procurement Officer', companyType: 'Manufacturer / Retailer / 3PL', industry: 'Manufacturing & Supply Chain', companySize: '$1B–$50B revenue', painPoints: ['Freight cost unpredictability — ±30% quarterly swings', 'No benchmark data for carrier negotiation', 'Manual lane-by-lane rate analysis taking weeks'], successMetrics: ['Freight cost reduction ≥ 5%', 'Carrier contract cycle time < 2 weeks', 'On-time delivery improvement ≥ 3pp'], wtpMonthly: { min: 500, typical: 2500, max: 15000 }, decisionCycleDays: 60, buyingTriggers: ['Annual carrier contract renewal', 'New logistics VP hire', 'Cost reduction initiative'], channels: ['Industry analyst report', 'Gartner peer review', 'Pilot programme offer'] },
        { id: 'BP-003', name: 'The CPG Category Manager', icon: '🛍️', role: 'Category Manager / Head of Consumer Insights', companyType: 'CPG Brand / FMCG Company', industry: 'Retail & Consumer Goods', companySize: '$100M–$5B revenue', painPoints: ['Reliance on syndicated panel data with 4-week lag', 'No real-time view of category share shifts', 'Retailer data sharing fragmented across 20+ portals'], successMetrics: ['Category share signal within 48 hours', 'Promo lift visibility same week', 'Reduction in BI tool subscriptions'], wtpMonthly: { min: 3000, typical: 10000, max: 40000 }, decisionCycleDays: 90, buyingTriggers: ['Syndicated data contract renewal', 'New product launch planning', 'Board-level growth mandate'], channels: ['Consumer goods conference', 'Consultancy referral', 'Retailer data marketplace'] },
        { id: 'BP-004', name: 'The Pharma RWE Lead', icon: '💊', role: 'VP Real-World Evidence / Medical Affairs Director', companyType: 'Pharmaceutical / Biotech Company', industry: 'Healthcare & Life Sciences', companySize: '$1B+ revenue', painPoints: ['RCT results not translating to real-world outcomes', 'Slow and expensive patient registry build', 'Regulatory submissions lacking longitudinal RWE'], successMetrics: ['Time to RWE submission: < 12 months', 'Patient cohort matching accuracy ≥ 90%', 'FDA / EMA label expansion supported'], wtpMonthly: { min: 10000, typical: 35000, max: 200000 }, decisionCycleDays: 180, buyingTriggers: ['New drug approval filing', 'Phase III trial completion', 'Competitor RWE publication'], channels: ['Medical conference', 'Health data consortium', 'CRO / consulting referral'] },
        { id: 'BP-005', name: 'The Grid Flexibility Trader', icon: '⚡', role: 'Head of Energy Trading / Flexibility Product Manager', companyType: 'Energy Retailer / Aggregator / ISO', industry: 'Energy & Utilities', companySize: '$500M–$20B', painPoints: ['Demand forecast errors leading to imbalance costs', 'No visibility into distributed asset flexibility', 'Manual settlement reconciliation'], successMetrics: ['Forecast MAPE < 3%', 'Flexibility response time < 5 minutes', 'Imbalance cost reduction ≥ 10%'], wtpMonthly: { min: 5000, typical: 20000, max: 100000 }, decisionCycleDays: 120, buyingTriggers: ['Renewable capacity addition', 'Demand response programme launch', 'Grid stress event'], channels: ['Energy industry forum', 'Utility innovation lab', 'ISO / TSO direct'] }
      ];
    }

    // -----------------------------------------------------------------------
    // Revenue Scenarios
    // -----------------------------------------------------------------------
    function getRevenueScenarios() {
      return [
        {
          scenario: 'Bear Case', icon: '🐻', color: '#f472b6',
          assumptions: ['1 data product live by month 9', 'Average ACV: $10,000', 'Monthly churn: 4%', 'New logo growth: 1/month from month 6', 'Compliance delays slow two products'],
          projections: [
            { period: 'Q1', arrUsd: 0,       customers: 0,  products: 0 },
            { period: 'Q2', arrUsd: 0,       customers: 0,  products: 0 },
            { period: 'Q3', arrUsd: 10000,   customers: 1,  products: 1 },
            { period: 'Q4', arrUsd: 30000,   customers: 3,  products: 1 },
            { period: 'Y2 End', arrUsd: 120000,  customers: 12, products: 2 },
            { period: 'Y3 End', arrUsd: 360000,  customers: 32, products: 3 }
          ], y3ArrUsd: 360000
        },
        {
          scenario: 'Base Case', icon: '📊', color: '#60a5fa',
          assumptions: ['2 data products live by month 6', 'Average ACV: $18,000', 'Monthly churn: 2.5%', 'New logo growth: 3/month from month 4', 'Marketplace listing adds 30% inbound pipeline'],
          projections: [
            { period: 'Q1', arrUsd: 0,        customers: 0,  products: 1 },
            { period: 'Q2', arrUsd: 36000,    customers: 4,  products: 2 },
            { period: 'Q3', arrUsd: 108000,   customers: 9,  products: 2 },
            { period: 'Q4', arrUsd: 216000,   customers: 16, products: 3 },
            { period: 'Y2 End', arrUsd: 540000,   customers: 34, products: 5 },
            { period: 'Y3 End', arrUsd: 1200000,  customers: 72, products: 8 }
          ], y3ArrUsd: 1200000
        },
        {
          scenario: 'Bull Case', icon: '🚀', color: '#34d399',
          assumptions: ['3 data products live by month 4', 'Average ACV: $32,000', 'Monthly churn: 1%', 'New logo growth: 6/month from month 3', 'Strategic partnership accelerates distribution', 'Two enterprise exclusivity deals signed Year 1'],
          projections: [
            { period: 'Q1', arrUsd: 32000,    customers: 1,   products: 1 },
            { period: 'Q2', arrUsd: 160000,   customers: 7,   products: 3 },
            { period: 'Q3', arrUsd: 480000,   customers: 18,  products: 4 },
            { period: 'Q4', arrUsd: 960000,   customers: 34,  products: 5 },
            { period: 'Y2 End', arrUsd: 2400000,  customers: 78,  products: 9 },
            { period: 'Y3 End', arrUsd: 5000000,  customers: 158, products: 15 }
          ], y3ArrUsd: 5000000
        }
      ];
    }
  }
})();
