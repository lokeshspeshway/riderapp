const express = require('express');
const router = express.Router();
const {
  exportRidesCSV,
  exportTransactionsCSV,
  exportUserPDF
} = require('../controllers/reportController');

router.get('/rides/csv', exportRidesCSV);
router.get('/transactions/csv', exportTransactionsCSV);
router.get('/users/pdf', exportUserPDF);

module.exports = router;
