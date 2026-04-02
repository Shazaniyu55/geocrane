const { Notifications, NotificationType } = require("../model/notificationmodel");
const admin = require("../config/firebase");
const  FireNotifications = require("../model/firebaseNotifyModel");

class NotificationService {
  // Create Notification
  static async createNotification(data) {
    try {
      const notification = await Notifications.create(data);
      return notification;
    } catch (error) {
      throw error;
    }
  }




  // Get user notifications
  static async getUserNotifications(userId) {
    try {
      const notifications = await Notifications.find({ userId })
        .sort({ createdAt: -1 });

      return notifications;
    } catch (error) {
      throw error;
    }
  }

    /* ===============================
     FireBase Messaging Code
  ================================= */

  
  // Save or update FCM token
  static async saveToken(userId, fcmToken, deviceType) {
    const existing = await FireNotifications.findOne({ userId });

    if (existing) {
      existing.fcmToken = fcmToken;
      existing.deviceType = deviceType;
      return await existing.save();
    }

    return await FireNotifications.create({ userId, fcmToken, deviceType });
  }

  // Send notification to one user
  static async sendToUser(userId, title, body, data = {}) {
    const tokens = await FireNotifications.find({ userId });

    if (!tokens.length) throw new Error("No device tokens found");

    const messages = tokens.map(t => ({
      notification: { title, body },
      data: data,
      token: t.fcmToken,
    }));

    const results = [];

    for (let msg of messages) {
      try {
        const res = await admin.messaging().send(msg);
        results.push(res);
      } catch (err) {
        console.error("FCM Error:", err.message);
      }
    }

    return results;
  }

  // Send to multiple users
  static async sendBulk(userIds, title, body) {
    const tokens = await FireNotifications.find({ userId: { $in: userIds } });

    const fcmTokens = tokens.map(t => t.fcmToken);

    if (!fcmTokens.length) throw new Error("No tokens found");

    return await admin.messaging().sendMulticast({
      tokens: fcmTokens,
      notification: { title, body },
    });
  }

   static  async sendAlert(userId, title, message) {

    const existingNotification = await Notifications.findOne({
      user: userId,
      type: NotificationType.SOS_ALERT
    });

    if (!existingNotification) {
      await Notifications.create({
        user: userId,
        type: NotificationType.SOS_ALERT,
        title: title,
        message: message
      });
    }
  }



}

module.exports = NotificationService;