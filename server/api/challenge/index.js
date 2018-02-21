'use strict';

var express = require('express');
var controller = require('./challenge.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/pi/', controller.pi);

module.exports = router;
