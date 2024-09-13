const express = require('express');
const router = express.Router();
const { addDatabase } = require('../controllers/databaseController');

router.post('/add', addDatabase);

module.exports = router;