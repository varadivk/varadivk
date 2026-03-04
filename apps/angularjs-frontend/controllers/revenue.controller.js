/**
 * RevenueController — revenue scenario projections and buyer persona profiles.
 */
(function () {
  'use strict';

  angular
    .module('dataMonetizationApp')
    .controller('RevenueController', RevenueController);

  RevenueController.$inject = ['DataService'];

  function RevenueController(DataService) {
    var vm = this;

    vm.scenarios = DataService.getRevenueScenarios();
    vm.personas  = DataService.getBuyerPersonas();

    vm.maxArr = Math.max.apply(null, vm.scenarios.map(function (s) { return s.y3ArrUsd; }));

    vm.barWidth = function (arrUsd) {
      return Math.round((arrUsd / vm.maxArr) * 100) + '%';
    };

    vm.formatCurrency = function (n) {
      return '$' + Number(n).toLocaleString('en-US');
    };
  }
})();
