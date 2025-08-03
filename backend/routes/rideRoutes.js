const express = require('express');
const router = express.Router();
const { bookRide, updateRideStatus, getActiveRides } = require('../controllers/rideController');

router.post('/book', bookRide);
router.put('/:rideId/status', updateRideStatus);
router.get('/active/:userId', getActiveRides);

module.exports = router;
