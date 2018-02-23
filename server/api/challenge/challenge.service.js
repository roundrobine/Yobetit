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

// match country name with arbitrary string
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


// Slot Machine method
export function spinSlotMachine(){

  function Cherry() {
    this.coefficientForThreeEquals = 50;
    this.coefficientForTwoEquals = 40;
  }

  function Apple() {
    this.coefficientForThreeEquals = 20;
    this.coefficientForTwoEquals = 10;
  }

  function Banana() {
    this.coefficientForThreeEquals = 15;
    this.coefficientForTwoEquals = 5;
  }

  function Lemon() {
    this.coefficientForThreeEquals = 3;
    this.coefficientForTwoEquals = 0;
  }


  let reel1 = [new Cherry(), new Lemon(), new Apple(), new Lemon(), new Banana(), new Banana(), new Lemon(), new Lemon()];
  let reel2 = [new Lemon(), new Apple(), new Lemon(), new Lemon(), new Cherry(), new Apple(), new Banana(), new Lemon()];
  let reel3 = [new Lemon(), new Apple(), new Lemon(), new Apple(), new Cherry(), new Lemon(), new Banana(), new Lemon()];

  const reelItemsTotal = reel1.length;
  let i, randomReel1, randomReel2, randomReel3, initialPrize = 1;
  randomReel1 = reel1[Math.floor(Math.random()*reelItemsTotal)];
  randomReel2 = reel2[Math.floor(Math.random()*reelItemsTotal)];
  randomReel3 = reel3[Math.floor(Math.random()*reelItemsTotal)];

  let response = {
    reel1: randomReel1.constructor.name,
    reel2: randomReel2.constructor.name,
    reel3: randomReel3.constructor.name
  };

  let prize = function () {
    if(_.isEqual(randomReel1, randomReel2) && _.isEqual(randomReel2, randomReel3)){
      initialPrize = initialPrize * randomReel1.coefficientForThreeEquals;
    } else if (_.isEqual(randomReel1, randomReel2) || _.isEqual(randomReel1, randomReel3)) {
      initialPrize = initialPrize * randomReel1.coefficientForTwoEquals;
    } else if(_.isEqual(randomReel2, randomReel3)){
      initialPrize = initialPrize * randomReel2.coefficientForTwoEquals;
    } else {
      initialPrize = 0;
    }
    return initialPrize;
  };

  response.prize = prize();
  return response;

}
