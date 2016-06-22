(function() {
  'use strict';

  angular
    .module('calculatorFront')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
