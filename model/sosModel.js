// models/sosModel.js
const mongoose = require("mongoose");

const sosSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["robbery", "fire", "accident", "medical", "other"],
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

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

    status: {
      type: String,
      enum: ["pending", "dispatched", "resolved", "cancelled"],
      default: "pending",
    },

    assignedResponder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    media: [String],

    isActive: {
      type: Boolean,
      default: true,
    },

    resolvedAt: Date,
  },
  { timestamps: true }
);

sosSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("SOS", sosSchema);