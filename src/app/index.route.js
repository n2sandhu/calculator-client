(function() {
  'use strict';

  angular
    .module('calculatorFront')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })

      .state('test', {
        url: '/tests',
        templateUrl: 'app/jasmine/SpecRunner.html'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
