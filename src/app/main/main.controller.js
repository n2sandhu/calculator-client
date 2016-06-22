(function() {
  'use strict';

  angular
    .module('calculatorFront')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(Calculator, toastr, $http) {
    var vm = this;
    vm.displayValue = 0;
    var value1 = 0;
    var value2 = 0;
    vm.operator = "";
    var firstDecimalClick = false;
    var baseUrl = "http://0.0.0.0:3000/api";
    var responseLinks = {};
    var link = "/calculators/getLinks";

    $http.get(baseUrl+ link).then(function successCallback(response) {
      console.log(response);
      responseLinks = response.data;
    }, function errorCallback(response) {
      toastr.error("Error while fetching data from server. Try refreshing the page");
    });

    vm.setDecimal = function(displayValue){
      if(parseInt(displayValue) != displayValue){
        return;
      }
      vm.displayValue = displayValue.toFixed(1);
      firstDecimalClick = true;
    }

   vm.updateDisplay = function(valueClicked, displayValue){
    if(displayValue === 0){
      vm.displayValue = valueClicked;
    }
    else if(parseInt(displayValue) !== displayValue){
      var stringValue = "" + displayValue;
      var stringSplit = stringValue.split(".");
      var noOfDigitsAfterDecimal = stringSplit[1].length;
      if(valueClicked == 0 ){
        if(firstDecimalClick){
          firstDecimalClick = false;
          return;  
        }
        vm.displayValue = parseFloat(displayValue).toFixed(noOfDigitsAfterDecimal+1);
      }
      else{
        if(firstDecimalClick){
          vm.displayValue = ((parseFloat(displayValue) * Math.pow(10, noOfDigitsAfterDecimal)) + valueClicked) / Math.pow(10, noOfDigitsAfterDecimal);  
          firstDecimalClick = false;
        }else{
          vm.displayValue = ((parseFloat(displayValue) * Math.pow(10, noOfDigitsAfterDecimal+1)) + valueClicked) / Math.pow(10, noOfDigitsAfterDecimal+1);
        }
      }
    }
    else{
      vm.displayValue = vm.displayValue*10 + valueClicked;  
     }
   }

   vm.updatedOperator = function(operator, displayValue){
      if(displayValue == 0){
        return;
      }
      vm.operator = operator;
      if(value1 != 0){
        value2 = displayValue;
      }
      else{
        value1 = displayValue;
        vm.displayValue = 0;        
      }
   }

   vm.doCalculation = function(operator, displayValue){

    if(value1 == 0 || operator == ""){
      return;
    }
    value2 = vm.displayValue;
    var linkSplit = (responseLinks._links[operator].href).split("?");
    link = linkSplit[0];
    console.log(link);
    
    $http.get(baseUrl+ link,{params: {value1: value1, value2: value2} }).then(function successCallback(response) {
      vm.displayValue = response.data;
    }, function errorCallback(response) {
      if(response.data.error.message == "Divided by zero"){
        toastr.warning("Cannot divide by zero");
      }
      else{
        toastr.error("Error while carrying out the operation");
      }
    });

    value1 = 0;
    value2 = 0;
    vm.operator = "";   
   }

  }
})();
