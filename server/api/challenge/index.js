'use strict';

var express = require('express');
var controller = require('./challenge.controller');

var router = express.Router();

router.get('/pi', controller.pi);
router.get('/country', controller.country);
router.post('/match', controller.match);
router.get('/spin', controller.spin);

module.exports = router;
