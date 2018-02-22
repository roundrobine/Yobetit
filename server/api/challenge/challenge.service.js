'use strict';
import config from '../../config/environment';
import _ from 'lodash';
const bigInt = require("big-integer");
const rp = require('request-promise');

/**
 Bailey-Borwein-Plouffe digit-extraction algorithm for pi in hexadecimal format
 <http://www.ams.org/journals/mcom/1997-66-218/S0025-5718-97-00856-9/>
 */
export function extractNthPIDigit(digitNth){
    let partial = function(digit, coefficient) {
      let sumPartial = 0;

      // Left sum
      let k;
      for (k = 0; k <= digit - 1; k++) {
        sumPartial +=  bigInt(16).modPow((digit - 1 - k), (8 * k + coefficient)) / (8 * k + coefficient);
      }

      // Right sum. This converges fast...
      let prev = undefined;
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
    let modulo = function(number) {
      return number < 0 ? 1 - (-number % 1) : number % 1;
    };

    let sum = 0;
    sum +=  4 * partial(digitNth, 1);
    sum += -2 * partial(digitNth, 4);
    sum += -1 * partial(digitNth, 5);
    sum += -1 * partial(digitNth, 6);

    sum = modulo(sum);

    return Math.floor(sum * 16);
}

// get a unique country by full name
export function getCountryByFullName(country,cb){

  let apiUrl = config.api_endpoints.country_full_name + "/" + country;

  let options = {
    method: 'GET',
    uri: apiUrl,
    qs: {
      fullText:true,
    },
    json: true // Automatically parses the JSON string in the response
  };

  rp(options)
    .then(function (res) {
      cb(null, res)
    }, function (err) {
      cb(err, null)
    });

}

// get the list of all countries in the world
export function matchCountryToString(stringArray, cb){
  let strings = ["New Macedonia", "Northaustria", "North Korea", "Unitedmontenegro", "greeceFreek", "zambiatoday" ];
  let apiUrl = config.api_endpoints.all_countries;
  let name = 'name';

  let options = {
    method: 'GET',
    uri: apiUrl,
    qs: {
      fields: name,
    },
    json: true // Automatically parses the JSON string in the response
  };

  rp(options)
    .then(function (countries) {
      let result = [];
      let tempResults = [];
      countries.forEach(function(country) {
        tempResults = [];
        tempResults = strings.filter(s => s.toUpperCase().indexOf( country.name.toUpperCase() ) !== -1);
        console.log("Lenght of temp: ", tempResults);
        if(tempResults.length > 0) {
          result.push(country.name);
        }
      });
      cb(null, result);
    }, function (err) {
      cb(err, null)
    });

}
