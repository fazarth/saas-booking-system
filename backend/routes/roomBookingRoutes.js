const express = require("express");
const router = express.Router();
const roomBookingController = require("../controllers/roomBookingController");

/**
 * @swagger
 * /api/room/check-availability:
 *   post:
 *     summary: Check availability of a room
 *     description: Check if a room is available for booking at a specific time
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: integer
 *                 example: 1
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-08-02T10:00:00Z"
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-08-02T12:00:00Z"
 *     responses:
 *       200:
 *         description: Room is available
 *       400:
 *         description: Room is not available during the selected time
 *       500:
 *         description: Internal server error
 */
router.post("/check-availability", roomBookingController.checkRoomAvailability);

module.exports = router;