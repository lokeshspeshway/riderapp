const express = require('express');
const router = express.Router();
const { updateLocation, getUserLocation } = require('../controllers/locationController');

router.post('/update', updateLocation);
router.get('/:userId', getUserLocation);

module.exports = router;
