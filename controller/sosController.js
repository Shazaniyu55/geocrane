// controllers/sosController.js
const sosService = require("../service/sosService");
const successResponse = require("../utils/successresponse");
const STATUSCODES = require("../constants/statuscode");

const sosController = {
  //Create SOS
  createSOS: async (req, res) => {
    try {
      const { type, description, lng, lat, address } = req.body;

      const sos = await sosService.createSOS({
        user: req.user.userId, // assuming auth middleware
        type,
        description,
        location: {
          type: "Point",
          coordinates: [lng, lat],
          address,
        },
      });


      return res.status(201).json({
        success: true,
        message: "SOS alert created",
        data: sos,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Get all SOS
  getAllSOS: async (req, res) => {
    try {
      const data = await sosService.getAllSOS();
      res.json({ success: true, data });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message });
    }
  },

  //  Get single
  getSOSById: async (req, res) => {
    try {
      const data = await sosService.getSOSById(req.params.id);
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  
  //  Nearby SOS
  getNearbySOS: async (req, res) => {
    try {
      const { lng, lat } = req.query;

      const data = await sosService.getNearbySOS(
        parseFloat(lng),
        parseFloat(lat)
      );

      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Assign responder
  assignResponder: async (req, res) => {
    try {
      const { sosId, responderId } = req.body;

      const data = await sosService.assignResponder(sosId, responderId);

      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update status
  updateStatus: async (req, res) => {
    try {
      const { sosId, status } = req.body;

      const data = await sosService.updateStatus(sosId, status);

      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Cancel SOS
  cancelSOS: async (req, res) => {
    try {
      const { sosId } = req.body;

      const data = await sosService.cancelSOS(sosId);

      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = sosController;