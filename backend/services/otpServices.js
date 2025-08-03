const sendOTP = async (phone, otp) => {
  console.log(`Sending OTP ${otp} to ${phone}`); // Integrate Twilio or SMS Gateway here
};
module.exports = { sendOTP };
