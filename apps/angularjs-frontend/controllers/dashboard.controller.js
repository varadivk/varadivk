/**
 * DashboardController — landing page stats and agent overview.
 */
(function () {
  'use strict';

  angular
    .module('dataMonetizationApp')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['DataService'];

  function DashboardController(DataService) {
    var vm = this;

    vm.industries  = DataService.getIndustries();
    vm.agents      = DataService.getAgents();
    vm.objectives  = DataService.getObjectives();

    vm.totalIndustries    = vm.industries.length;
    vm.totalSubIndustries = vm.industries.reduce(function (acc, i) { return acc + i.subIndustries.length; }, 0);
    vm.activeAgents       = vm.agents.filter(function (a) { return a.status === 'active'; }).length;
    vm.totalAgents        = vm.agents.length;
  }
})();
