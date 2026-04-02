const mongoose = require("mongoose");

const NotificationType = {
  EMAIL_VERIFICATION: "email_verification",
  PROMOTION: "promotion",
  SOS_ALERT: "sos_alert",
};

const NotificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    meta: {
      type: Object, // optional extra data
    },
  },
  { timestamps: true }
);

const Notifications = mongoose.model("Notification", NotificationSchema);

module.exports = {
  Notifications,
  NotificationType,
};