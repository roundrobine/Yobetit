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

  };

  MainCtrl.$inject = ['$scope', 'Factory'];

  angular.module('yobetitApp')
    .controller('MainCtrl', MainCtrl);

}());
