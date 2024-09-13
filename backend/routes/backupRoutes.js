const express = require('express');
const {
  listBackups,
  backupMySQL,
  backupPostgres,
  restoreMySQL,
  restorePostgres
} = require('../controllers/backupController');

const router = express.Router();

router.post('/backup/mysql', backupMySQL);
router.post('/backup/postgres', backupPostgres);

router.post('/restore/mysql', restoreMySQL);
router.post('/restore/postgres', restorePostgres);

router.get('/backups', listBackups);

module.exports = router;