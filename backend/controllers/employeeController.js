const { Attendance, Leave } = require('../models');

exports.clockAction = async (req, res) => {
  const { userId, type, location } = req.body;
  const time = new Date();

  const entry = await Attendance.create({ userId, type, location, time });
  res.json({ message: 'Attendance recorded', entry });
};

exports.requestLeave = async (req, res) => {
  const { userId, date, reason } = req.body;
  const leave = await Leave.create({ userId, date, reason });
  res.json({ message: 'Leave requested', leave });
};

exports.getMyAttendance = async (req, res) => {
  const { userId } = req.params;
  const logs = await Attendance.findAll({ where: { userId } });
  res.json(logs);
};

exports.getMyLeaves = async (req, res) => {
  const { userId } = req.params;
  const leaves = await Leave.findAll({ where: { userId } });
  res.json(leaves);
};
