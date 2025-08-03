const express = require('express');
const router = express.Router();
const {
  clockAction,
  requestLeave,
  getMyAttendance,
  getMyLeaves
} = require('../controllers/employeeController');

router.post('/clock', clockAction);
router.post('/leave', requestLeave);
router.get('/attendance/:userId', getMyAttendance);
router.get('/leaves/:userId', getMyLeaves);

module.exports = router;
