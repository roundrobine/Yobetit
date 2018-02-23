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
      },
      getCountryByFullName: {
        method:'GET',
        params: {
          controller:'country'
        },
        isArray:true
      },
      match: {
        method:'POST',
        params: {
          controller:'match'
        },
        isArray:true
      },
      spin: {
        method:'GET',
        params: {
          controller:'spin'
        }
      }
    });
  };

  factory.$inject = ['$resource'];

  angular.module('yobetitApp').factory('Factory', factory);

}());
