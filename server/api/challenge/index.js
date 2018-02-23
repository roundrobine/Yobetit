'use strict';

var express = require('express');
var controller = require('./challenge.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/pi', controller.pi);
router.get('/country', controller.country);
router.get('/match', controller.match);
router.get('/spin', controller.spin);

module.exports = router;
