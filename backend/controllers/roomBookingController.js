const Room = require("../models/room");
const Booking = require("../models/booking");
const AvailabilitySlot = require("../models/availabilitySlot");

/**
 * @swagger
 * tags:
 *   - name: Room Booking
 *     description: Operations related to room booking
 */

/**
 * @swagger
 * /api/room/check-availability:
 *   post:
 *     tags:
 *       - Room Booking
 *     summary: Check room availability
 *     description: Check if a room is available for a specific time slot.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: integer
 *                 description: The ID of the room to check availability for.
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: The start time for the booking.
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: The end time for the booking.
 *     responses:
 *       200:
 *         description: The room is available for booking.
 *       400:
 *         description: The room is not available during the requested time slot.
 *       500:
 *         description: Internal server error.
 */
exports.checkRoomAvailability = async (req, res) => {
  const { roomId, startTime, endTime } = req.body;

  try {
    const availableSlot = await AvailabilitySlot.findOne({
      where: {
        RoomId: roomId,
        StartTime: { [Sequelize.Op.lte]: endTime },
        EndTime: { [Sequelize.Op.gte]: startTime },
        IsAvailable: true,
      },
    });

    if (availableSlot) {
      res.status(200).json({ message: "Room is available for booking" });
    } else {
      res.status(400).json({ message: "Room is not available during this time" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error checking availability" });
  }
};