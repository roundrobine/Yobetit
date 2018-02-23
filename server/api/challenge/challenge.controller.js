'use strict';

import _ from 'lodash';
var Challenge = require('./challenge.model');
var ChallengeService = require('./challenge.service');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Challenges
export function index(req, res) {
  let printResult = "Pi_";
  let result = ChallengeService.extractNthPIDigit(req.query.digit);
  printResult += result.toString(16);
  console.log("Nth digit in hexadecimal format: ", printResult);
  res.status(200).json(printResult);
}

// Gets Nth digit of Pi in hexadecimal format
export function pi(req, res) {
  let printResult = "";
  let result = ChallengeService.extractNthPIDigit(req.query.digit);
  printResult += result.toString(16);
  res.status(200).json(printResult);
}


// Gets a unique country by its full name
export function country(req, res) {
  let country = "Macedonia";
  ChallengeService.getCountryByFullName(country, function (err, result) {
    if (err) {
      console.log(err.error);
      return res.status(500).send(err.error);
    }
    else{
      console.log("My unique country: ", result);
      return res.status(200).json(result);
    }
  })
}


// Gets a unique country by its full name
export function match(req, res) {
  ChallengeService.matchCountryToString("", function (err, result) {
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
  console.log("Prize won: ", result);
  console.log("Reel 1: ", result.reel1);
  console.log("Reel 2: ", result.reel2);
  console.log("Reel 3: ", result.reel3);
  res.status(200).json(result);
}


// Gets a single Challenge from the DB
export function show(req, res) {
  Challenge.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Challenge in the DB
export function create(req, res) {
  Challenge.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Challenge in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Challenge.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Challenge from the DB
export function destroy(req, res) {
  Challenge.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
