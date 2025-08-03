const razorpay = require('../config/razorpay');
const { Wallet, Transaction } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', userId } = req.body;

    const options = {
      amount: Math.round(amount * 100), // in paise
      currency,
      receipt: `rcptid_${userId}_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    res.json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
};

exports.handlePaymentSuccess = async (req, res) => {
  try {
    const { userId, amount, rideId } = req.body;

    await Wallet.increment({ balance: -amount }, { where: { userId } });
    await Transaction.update({ status: 'success' }, { where: { rideId, userId } });

    res.json({ message: 'Payment processed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update payment status' });
  }
};

exports.getWalletBalance = async (req, res) => {
  const { userId } = req.params;
  const wallet = await Wallet.findOne({ where: { userId } });
  res.json({ balance: wallet?.balance || 0 });
};
