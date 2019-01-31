const express = require('express');
const router = express.Router();

const person = require('./person.js');

router.use('/', person);

module.exports = router;