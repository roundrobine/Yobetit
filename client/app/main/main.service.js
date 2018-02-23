'use strict';
(function() {
  var factory = function($resource) {

    return $resource('/api/challenges/:controller/:id', {
      id: '@id'
    }, {
      pi: {
        method:'GET',
        params: {
          controller:'pi'
        }
      }
    });
  };

  factory.$inject = ['$resource'];

  angular.module('yobetitApp').factory('Factory', factory);

}());
