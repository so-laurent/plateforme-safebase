const express = require('express');
const router = express.Router();
const { addDatabase } = require('../controllers/databaseController');
const { backupDatabase } = require('../controllers/backupController');

router.post('/add', addDatabase);
router.post('/backup', backupDatabase);

module.exports = router;