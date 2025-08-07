const { User, OTP } = require('../models');
const { sendOTP } = require('../services/otpServices');
const jwt = require('jsonwebtoken');

exports.sendOTP = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number is required' });

  const code = Math.floor(1000 + Math.random() * 9000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60000);

  try {
    await OTP.create({ phone, code, expiresAt });
    await sendOTP(phone, code);
    res.json({ message: 'OTP sent' });
  } catch (err) {
    console.error('❌ sendOTP Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.verifyOTP = async (req, res) => {
  const { phone, code, role } = req.body;

  try {
    const otpRecord = await OTP.findOne({ where: { phone, code } });

    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    let user = await User.findOne({ where: { phone } });
    if (!user) {
      user = await User.create({ phone, role, verified: true });
    } else {
      user.role = role;
      await user.save();
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ token, user });
  } catch (err) {
    console.error('❌ verifyOTP Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};