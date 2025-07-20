const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notificationController');
const { protect } = require('../middleware/auth');

router.get('/', protect, notificationController.getNotifications);
router.get('/unread-count', protect, notificationController.getUnreadCount);
router.put('/:id/read', protect, notificationController.markAsRead);

module.exports = router;