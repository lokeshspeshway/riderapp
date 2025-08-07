const Location = require('../models/Location');

// POST - Create pickup + drop in same record
exports.createLocation = async (req, res) => {
  try {
    const {
      pickupName,
      pickupLatitude,
      pickupLongitude,
      dropName,
      dropLatitude,
      dropLongitude
    } = req.body;

    const location = await Location.create({
      pickupName,
      pickupLatitude,
      pickupLongitude,
      dropName,
      dropLatitude,
      dropLongitude
    });

    res.status(201).json(location);
  } catch (error) {
    console.error('Error creating location:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET all
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
};

// GET one
exports.getLocationById = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) return res.status(404).json({ error: 'Location not found' });
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch location' });
  }
};

// PUT update
exports.updateLocation = async (req, res) => {
  try {
    const id = req.params.id;
    const location = await Location.findByPk(id);
    if (!location) return res.status(404).json({ error: 'Location not found' });

    const {
      pickupName,
      pickupLatitude,
      pickupLongitude,
      dropName,
      dropLatitude,
      dropLongitude
    } = req.body;

    await location.update({
      pickupName: pickupName || location.pickupName,
      pickupLatitude: pickupLatitude ?? location.pickupLatitude,
      pickupLongitude: pickupLongitude ?? location.pickupLongitude,
      dropName: dropName || location.dropName,
      dropLatitude: dropLatitude ?? location.dropLatitude,
      dropLongitude: dropLongitude ?? location.dropLongitude
    });

    res.json(location);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update location' });
  }
};

// DELETE
exports.deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) return res.status(404).json({ error: 'Location not found' });

    await location.destroy();
    res.json({ message: 'Location deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete location' });
  }
};
