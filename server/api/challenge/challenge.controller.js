'use strict';
var Challenge = require('./challenge.model');
var ChallengeService = require('./challenge.service');

// Gets Nth digit of Pi in hexadecimal format
export function pi(req, res) {
  let printResult = "";
  let result = ChallengeService.extractNthPIDigit(req.query.digit);
  printResult += result.toString(16);
  res.status(200).json(printResult);
}


// Gets a unique country by its full name
export function country(req, res) {
  ChallengeService.getCountryByFullName(req.query.country, function (err, result) {
    if (err) {
      console.log(err.error);
      return res.status(500).send(err.error);
    }
    else{
      return res.status(200).json(result);
    }
  })
}


// Gets a unique country by its full name
export function match(req, res) {
  ChallengeService.matchCountryToString(req.body, function (err, result) {
    if (err) {
      console.log(err.error);
      return res.status(500).send(err.error);
    }
    else{
      return res.status(200).json(result);
    }
  })
}

// Returns prize won after spinning a slot machine
export function spin(req, res) {
  let result = ChallengeService.spinSlotMachine();
  res.status(200).json(result);
}
