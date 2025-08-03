const express = require('express');
const router = express.Router();
const { createOrder, handlePaymentSuccess, getWalletBalance } = require('../controllers/paymentController');

router.post('/order', createOrder);
router.post('/success', handlePaymentSuccess);
router.get('/wallet/:userId', getWalletBalance);

module.exports = router;
