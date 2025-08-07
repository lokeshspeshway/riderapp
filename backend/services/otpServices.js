const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendOTP = async (phone, code) => {
  try {
    await client.messages.create({
      body: `Your OTP is: ${code}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: '+916300143065',
    });
    console.log(`✅ OTP sent to ${phone}`);
  } catch (err) {
    console.error('❌ Twilio error:', err.message);
    throw new Error('Failed to send OTP');
  }
};

module.exports = { sendOTP };