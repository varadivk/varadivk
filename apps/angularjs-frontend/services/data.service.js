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
      getPricingRecommendation: getPricingRecommendation
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
  }
})();
