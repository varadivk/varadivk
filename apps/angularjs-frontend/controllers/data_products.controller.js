/**
 * DataProductsController — data product catalog with pricing tiers and asset inventory.
 */
(function () {
  'use strict';

  angular
    .module('dataMonetizationApp')
    .controller('DataProductsController', DataProductsController);

  DataProductsController.$inject = ['DataService'];

  function DataProductsController(DataService) {
    var vm = this;

    vm.products = DataService.getDataProducts();
    vm.assets   = DataService.getDataAssets();

    vm.liveCount  = vm.products.filter(function (p) { return p.status === 'Live'; }).length;
    vm.betaCount  = vm.products.filter(function (p) { return p.status === 'Beta'; }).length;
    vm.draftCount = vm.products.filter(function (p) { return p.status === 'Draft'; }).length;
    vm.totalArr   = vm.products.reduce(function (s, p) { return s + p.monthlyArrUsd; }, 0);

    vm.formatNum = function (n) {
      if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
      if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
      if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
      return String(n);
    };

    vm.qualityClass = function (score) {
      if (score >= 90) return 'q-high';
      if (score >= 75) return 'q-mid';
      return 'q-low';
    };
  }
})();
