/**
 * Data Monetization Agent — AngularJS 1.x SPA
 * ThinkVerge.in | Agentic AI Enablement
 *
 * Main module definition and route configuration.
 */
(function () {
  'use strict';

  angular
    .module('dataMonetizationApp', ['ngRoute'])
    .config(routeConfig);

  routeConfig.$inject = ['$routeProvider', '$locationProvider'];

  function routeConfig($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm'
      })
      .when('/industries', {
        templateUrl: 'views/industries.html',
        controller: 'IndustriesController',
        controllerAs: 'vm'
      })
      .when('/valuation', {
        templateUrl: 'views/valuation.html',
        controller: 'ValuationController',
        controllerAs: 'vm'
      })
      .when('/orchestration', {
        templateUrl: 'views/orchestration.html',
        controller: 'OrchestrationController',
        controllerAs: 'vm'
      })
      .when('/data-products', {
        templateUrl: 'views/data_products.html',
        controller: 'DataProductsController',
        controllerAs: 'vm'
      })
      .when('/compliance', {
        templateUrl: 'views/compliance.html',
        controller: 'ComplianceController',
        controllerAs: 'vm'
      })
      .when('/revenue', {
        templateUrl: 'views/revenue.html',
        controller: 'RevenueController',
        controllerAs: 'vm'
      })
      .otherwise({ redirectTo: '/' });
  }
})();
