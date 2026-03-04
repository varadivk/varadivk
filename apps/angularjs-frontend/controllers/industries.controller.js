/**
 * IndustriesController — accordion industry/sub-industry browser.
 */
(function () {
  'use strict';

  angular
    .module('dataMonetizationApp')
    .controller('IndustriesController', IndustriesController);

  IndustriesController.$inject = ['DataService'];

  function IndustriesController(DataService) {
    var vm = this;

    vm.industries   = DataService.getIndustries();
    vm.openIndex    = 0;   // first industry open by default
    vm.togglePanel  = togglePanel;
    vm.isOpen       = isOpen;

    function togglePanel(index) {
      vm.openIndex = (vm.openIndex === index) ? -1 : index;
    }

    function isOpen(index) {
      return vm.openIndex === index;
    }
  }
})();
