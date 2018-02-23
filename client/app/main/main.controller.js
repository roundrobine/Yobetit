'use strict';
(function() {

  var MainCtrl = function ($scope, Factory) {

    var vm = this;

    vm.getNthDigitOfPi = function () {
      Factory.pi({digit: vm.pidigit}, function (result) {
        vm.piNthDigit = result[0];
        console.log(result);
      }, function(error) {
        console.log(error);
      });
    };

    vm.getCountryByName = function () {
      Factory.getCountryByFullName({country: vm.countryName}, function (result) {
        if(result) {
          vm.countryError = null;
          vm.country = result[0];
          console.log(result);
        }
      }, function(error) {
        vm.country = null;
        console.log(error);
        vm.countryError = "Data does not exist for the requested country."
      });
    };

    vm.strings = [{}];
    vm.addInputField = function(){
      vm.strings.push({})
    }

    vm.match = function () {
      Factory.match(vm.strings.map(s => s.name), function (result) {

        if(result.length === 0) {
          vm.matchCountires = null;
          vm.matchError = "Entered words do not match any country."
        }else {
          vm.matchError = null;
          vm.matchCountires = result;
          console.log(result);
        }

      }, function(error) {
        console.log(error);
      });
    };

    vm.spin = function () {
      Factory.spin('', function (result) {
        vm.spinResult = result;
        console.log(result);
      }, function(error) {
        console.log(error);
      });
    };


  };

  MainCtrl.$inject = ['$scope', 'Factory'];

  angular.module('yobetitApp')
    .controller('MainCtrl', MainCtrl);

}());
