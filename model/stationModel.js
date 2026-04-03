// models/stationModel.js
const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["police", "fire", "hospital"],
      required: true,
    },

    phone: String,

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
      address: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

stationSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Station", stationSchema);