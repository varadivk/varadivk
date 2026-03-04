/**
 * ValuationController — cost-based, market-comp, and DCF calculator.
 */
(function () {
  'use strict';

  angular
    .module('dataMonetizationApp')
    .controller('ValuationController', ValuationController);

  ValuationController.$inject = ['DataService'];

  function ValuationController(DataService) {
    var vm = this;

    vm.params = {
      assetName:       '',
      collectionCost:  '',
      curationCost:    '',
      marketBenchmark: '',
      similarity:      0.8,
      annualRevenue:   '',
      growthRate:      0.10,
      discountRate:    0.12,
      years:           5
    };

    vm.result  = null;
    vm.error   = null;
    vm.calculate = calculate;
    vm.reset     = reset;
    vm.formatNumber = formatNumber;

    function calculate() {
      vm.error  = null;
      vm.result = null;

      if (!vm.params.assetName) {
        vm.error = 'Please enter an asset name.';
        return;
      }
      if (vm.params.discountRate <= 0) {
        vm.error = 'Discount rate must be greater than 0.';
        return;
      }

      vm.result = DataService.calculateValuation(vm.params);
    }

    function reset() {
      vm.params = {
        assetName:       '',
        collectionCost:  '',
        curationCost:    '',
        marketBenchmark: '',
        similarity:      0.8,
        annualRevenue:   '',
        growthRate:      0.10,
        discountRate:    0.12,
        years:           5
      };
      vm.result = null;
      vm.error  = null;
    }

    function formatNumber(n) {
      return Number(n).toLocaleString('en-US');
    }
  }
})();
