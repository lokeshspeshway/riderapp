const { User, Ride, Transaction, Wallet } = require('../models');

// View all users
exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

// View all rides
exports.getAllRides = async (req, res) => {
  const rides = await Ride.findAll();
  res.json(rides);
};

// View all transactions
exports.getTransactions = async (req, res) => {
  const transactions = await Transaction.findAll();
  res.json(transactions);
};

// Analytics Summary
exports.getDashboardStats = async (req, res) => {
  const userCount = await User.count();
  const rideCount = await Ride.count();
  const totalRevenue = await Transaction.sum('totalFare');
  const activeDrivers = await User.count({ where: { role: 'driver' } });

  res.json({ userCount, rideCount, totalRevenue, activeDrivers });
};
