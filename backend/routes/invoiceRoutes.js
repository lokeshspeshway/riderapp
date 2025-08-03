const express = require('express');
const router = express.Router();
const { generateInvoice, getUserInvoices } = require('../controllers/invoiceController');

router.post('/generate', generateInvoice);
router.get('/:userId', getUserInvoices);

module.exports = router;
