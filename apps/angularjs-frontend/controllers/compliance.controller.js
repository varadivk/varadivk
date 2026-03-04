/**
 * ComplianceController — regulatory matrix and pre-launch compliance checklist.
 */
(function () {
  'use strict';

  angular
    .module('dataMonetizationApp')
    .controller('ComplianceController', ComplianceController);

  ComplianceController.$inject = ['DataService'];

  function ComplianceController(DataService) {
    var vm = this;

    vm.regulations = DataService.getRegulations();

    vm.highCount   = vm.regulations.filter(function (r) { return r.severity === 'High'; }).length;
    vm.medCount    = vm.regulations.filter(function (r) { return r.severity === 'Medium'; }).length;

    vm.checklist = [
      { title: 'Legal Basis Confirmed', desc: 'Every processing activity has an identified legal basis (consent, contract, legitimate interest, legal obligation).', status: 'ok' },
      { title: 'De-identification Review', desc: 'All PII/PHI removed or anonymised to the applicable standard (GDPR: k-anonymity; HIPAA: 18-point safe harbor).', status: 'ok' },
      { title: 'Data Processing Agreements', desc: 'DPAs/BAAs signed with every downstream processor and data marketplace.', status: 'ok' },
      { title: 'Regulatory Tag Mapping', desc: 'Each data asset tagged with applicable regulations in the catalog.', status: 'ok' },
      { title: 'Cross-Border Transfer Check', desc: 'No data transferred to non-permitted territories without SCCs / binding corporate rules.', status: 'warn' },
      { title: 'Subject Rights Process', desc: 'Automated pipeline to process access, erasure, and portability requests within statutory deadlines.', status: 'ok' },
      { title: 'Breach Response Plan', desc: 'Incident response plan documented; breach notification workflows tested.', status: 'ok' },
      { title: 'API Contract Review', desc: 'Every external API contract includes data usage restrictions, IP ownership clause, and audit rights.', status: 'warn' }
    ];
  }
})();
