/**
 * OrchestrationController — agent architecture and strategic roadmap.
 */
(function () {
  'use strict';

  angular
    .module('dataMonetizationApp')
    .controller('OrchestrationController', OrchestrationController);

  OrchestrationController.$inject = ['DataService'];

  function OrchestrationController(DataService) {
    var vm = this;

    vm.agents      = DataService.getAgents();
    vm.initiatives = DataService.getInitiatives();

    vm.subAgents = vm.agents.filter(function (a) {
      return a.name !== 'Master Orchestrator';
    });

    vm.checkpoints = [
      'Any new external data product launch',
      'Pricing change > 20% from baseline',
      'Any new data-sharing agreement with an external party'
    ];

    vm.orchestrationLoop = [
      'Goal intake from operator',
      'Planning pass — decompose into ordered sub-tasks',
      'Parallel execution — independent agents run concurrently',
      'Human checkpoint — pause for approval on irreversible actions',
      'Outcome feedback — Measurement agent feeds actuals back',
      'Continuous loop — re-run on cadence or event triggers'
    ];
  }
})();
