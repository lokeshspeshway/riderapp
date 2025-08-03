const express = require('express');
const router = express.Router();
const multer = require('multer');
const { registerVehicle, getAvailableVehicles } = require('../controllers/vehicleController');

// File upload config
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post('/register', upload.single('image'), registerVehicle);
router.get('/available', getAvailableVehicles);

module.exports = router;
