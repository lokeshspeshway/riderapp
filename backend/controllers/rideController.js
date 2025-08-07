// controllers/rideController.js
const { Ride, User } = require('../models');
const { Op } = require('sequelize');

exports.bookRide = async (req, res) => {
  try {
    const { riderId, pickupLocation, dropLocation, vehicleType } = req.body;

    if (!riderId || !pickupLocation || !dropLocation || !vehicleType) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Assign first available driver - example assumes you have 'isAvailable' flag
    const driver = await User.findOne({
      where: {
        role: 'driver',
        isAvailable: true,  // adjust this based on your model
      },
    });

    if (!driver) return res.status(400).json({ error: "No driver available" });

    const baseFare = 50;
    const distanceMultiplier = 10; // mock distance factor
    const surge = Math.random() < 0.3 ? 1.5 : 1.0; // mock surge pricing

    const fare = baseFare + (distanceMultiplier * 1) * surge;

    const ride = await Ride.create({
      riderId,
      driverId: driver.id,
      pickupLocation,
      dropLocation,
      vehicleType,
      estimatedTime: '15 min',
      fare,
      surgeMultiplier: surge,
    });

    res.json({ message: "Ride booked", ride });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Booking failed" });
  }
};

exports.updateRideStatus = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['requested', 'accepted', 'in_progress', 'completed', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }

    const ride = await Ride.findByPk(rideId);
    if (!ride) return res.status(404).json({ error: "Ride not found" });

    ride.status = status;
    await ride.save();

    res.json({ message: "Ride status updated", ride });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Status update failed" });
  }
};

exports.getActiveRides = async (req, res) => {
  try {
    const { userId } = req.params;
    const rides = await Ride.findAll({
      where: {
        riderId: userId,
        status: {
          [Op.in]: ['requested', 'accepted', 'in_progress']
        }
      }
    });
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve active rides." });
  }
};
