const SOS = require("../model/sosModel");
const stationService = require("./stationsService");
const { getIO } = require("../config/socket");

const sosService = {
  //Create SOS Alert
  createSOS: async (data) => {
    const sos = await SOS.create(data);
    const [lng, lat] = data.location.coordinates;

    const stations = await stationService.getNearbyStations(lng, lat);
    const io = getIO();

     // Emit to all responders
    io.emit("newSOS", {
      message: " New SOS Alert!",
      sos,
      stations,
    });

    // Emit to specific groups
    stations.forEach((station) => {
      io.to(station.type).emit("stationAlert", {
        station,
        sos,
      });
    });



    return sos;
  },

  // Get all SOS alerts
  getAllSOS: async () => {
    return await SOS.find()
      .populate("user", "fullName phone")
      .populate("assignedResponder", "fullName phone")
      .sort({ createdAt: -1 });
  },

  // Get single SOS
  getSOSById: async (id) => {
    return await SOS.findById(id)
      .populate("user", "fullName phone")
      .populate("assignedResponder", "fullName phone");
  },

  //  Find nearby SOS alerts
  getNearbySOS: async (lng, lat, distance = 5000) => {
    return await SOS.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: distance,
        },
      },
    });
  },

  //  Assign responder
  assignResponder: async (sosId, responderId) => {
    return await SOS.findByIdAndUpdate(
      sosId,
      {
        assignedResponder: responderId,
        status: "dispatched",
      },
      { new: true }
    );
  },

  // Update status
  updateStatus: async (sosId, status) => {
    const updateData = { status };

    if (status === "resolved") {
      updateData.resolvedAt = new Date();
      updateData.isActive = false;
    }

    return await SOS.findByIdAndUpdate(sosId, updateData, {
      new: true,
    });
  },

  // Cancel SOS
  cancelSOS: async (sosId) => {
    return await SOS.findByIdAndUpdate(
      sosId,
      { status: "cancelled", isActive: false },
      { new: true }
    );
  },
};

module.exports = sosService;