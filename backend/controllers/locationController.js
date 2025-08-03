const { Location } = require('../models');

exports.updateLocation = async (req, res) => {
  const { userId, role, lat, lng } = req.body;

  let location = await Location.findOne({ where: { userId } });
  if (location) {
    location.lat = lat;
    location.lng = lng;
    location.lastUpdated = new Date();
    await location.save();
  } else {
    location = await Location.create({ userId, role, lat, lng });
  }

  res.json({ message: "Location updated", location });
};

exports.getUserLocation = async (req, res) => {
  const { userId } = req.params;
  const location = await Location.findOne({ where: { userId } });
  res.json(location);
};
