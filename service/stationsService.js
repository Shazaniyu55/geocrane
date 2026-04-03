// services/stationService.js
const Station = require("../model/stationModel");

const stationService = {
  getNearbyStations: async (lng, lat, type = null, distance = 5000) => {
    const query = {
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: distance,
        },
      },
      isActive: true,
    };

    if (type) {
      query.type = type;
    }

    return await Station.find(query);
  },
};

module.exports = stationService;