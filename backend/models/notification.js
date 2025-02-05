const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    userId: String, // The user receiving the notification
    description: String, // Description of the notification
    isRead: { type: Boolean, default: false }, // Whether the notification has been read
}, { timestamps: true });

const Notification = mongoose.model('notification', notificationSchema);

module.exports = Notification;
