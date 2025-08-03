const { Transaction, Ride, User } = require('../models');

exports.generateInvoice = async (req, res) => {
  try {
    const { rideId, userId } = req.body;

    const ride = await Ride.findByPk(rideId);
    if (!ride) return res.status(404).json({ error: "Ride not found" });

    const baseFare = 50;
    const distanceFare = 10 * 1.5; // mock distance × rate
    const timeFare = 5 * 2;        // mock time × rate
    const surge = ride.surgeMultiplier || 1;
    const subtotal = baseFare + distanceFare + timeFare;
    const surgedTotal = subtotal * surge;
    const tax = surgedTotal * 0.05;
    const totalFare = surgedTotal + tax;

    const transaction = await Transaction.create({
      rideId,
      userId,
      baseFare,
      distanceFare,
      timeFare,
      surge,
      tax,
      totalFare
    });

    res.json({ message: "Invoice generated", transaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Invoice generation failed" });
  }
};

exports.getUserInvoices = async (req, res) => {
  const { userId } = req.params;
  const invoices = await Transaction.findAll({ where: { userId } });
  res.json(invoices);
};
