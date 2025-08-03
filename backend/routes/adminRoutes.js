const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getAllRides,
  getTransactions,
  getDashboardStats
} = require('../controllers/adminController');

router.get('/users', getAllUsers);
router.get('/rides', getAllRides);
router.get('/transactions', getTransactions);
router.get('/stats', getDashboardStats);

module.exports = router;
