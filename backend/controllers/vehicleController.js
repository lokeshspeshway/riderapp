const { Vehicle, DriverProfile, User } = require('../models');

exports.registerVehicle = async (req, res) => {
  try {
    const { driverId, type, model, year, seats, trunkSize } = req.body;
    const imageUrl = req.file ? req.file.filename : null;

    const vehicle = await Vehicle.create({ driverId, type, model, year, seats, trunkSize, imageUrl });
    await DriverProfile.create({ userId: driverId, licenseNumber: req.body.licenseNumber, vehicleId: vehicle.id });

    res.json({ message: "Vehicle registered", vehicle });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.getAvailableVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({ include: User });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch vehicles" });
  }
};
