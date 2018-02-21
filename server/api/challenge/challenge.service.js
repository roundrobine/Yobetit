'use strict';
import config from '../../config/environment';
import _ from 'lodash';
var bigInt = require("big-integer");

/**
 Bailey-Borwein-Plouffe digit-extraction algorithm for pi in hexadecimal format
 <http://www.ams.org/journals/mcom/1997-66-218/S0025-5718-97-00856-9/>
 */
export function extractNthPIDigit(digitNth){
    var partial = function(digit, coefficient) {
      var sumPartial = 0;

      // Left sum
      var k;
      for (k = 0; k <= digit - 1; k++) {
        sumPartial +=  bigInt(16).modPow((digit - 1 - k), (8 * k + coefficient)) / (8 * k + coefficient);
      }

      // Right sum. This converges fast...
      var prev = undefined;
      for(k = digit; sumPartial !== prev; k++) {
        prev = sumPartial;
        sumPartial += bigInt(16).pow((digit - 1 - k)) / (8 * k + coefficient);
      }

      return sumPartial;
    };

    /**
     JavaScript's modulus operator gives the wrong
     result for negative numbers. E.g. `-2.9 % 1`
     returns -0.9, the correct result is 0.1.
     */
    var modulo = function(number) {
      return number < 0 ? 1 - (-number % 1) : number % 1;
    };

    var sum = 0;
    sum +=  4 * partial(digitNth, 1);
    sum += -2 * partial(digitNth, 4);
    sum += -1 * partial(digitNth, 5);
    sum += -1 * partial(digitNth, 6);

    sum = modulo(sum);

    return Math.floor(sum * 16);
}
