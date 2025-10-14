// controllers/availabilityController.js
const {
  AvailabilitySlot,
  RoomDetail,
  HealthDetail,
  VehicleDetail,
  CourseDetail,
} = require("../models");
const errorResponse = require("../helper/errorResponse");

const detailModelMap = {
  room: RoomDetail,
  health: HealthDetail,
  vehicle: VehicleDetail,
  course: CourseDetail,
};

module.exports = {
  async createSlot(req, res) {
    const userId = req.user.id;
    const {
      resourceId,
      resourceDetailId,
      resourceDetailType,
      dayOfWeek,
      startTime,
      endTime,
      startDate,
      endDate,
      isActive,
    } = req.body;
    const model = detailModelMap[resourceDetailType];
    if (!model)
      return errorResponse(
        res,
        400,
        "invalid_resource_detail_type",
        req.query.lang || "id"
      );

    const detail = await model.findOne({
      where: { Id: resourceDetailId, ResourceId: resourceId },
    });
    if (!detail)
      return errorResponse(
        res,
        404,
        "resource_not_found",
        req.query.lang || "id"
      );

    const slot = await AvailabilitySlot.create({
      ResourceId: resourceId,
      ResourceDetailId: resourceDetailId,
      ResourceDetailType: resourceDetailType,
      DayOfWeek: dayOfWeek,
      StartTime: startTime,
      EndTime: endTime,
      StartDate: startDate,
      EndDate: endDate,
      IsActive: isActive,
    });
    res.status(201).json(slot);
  },

  async updateSlot(req, res) {
    const userId = req.user.id;
    const { id } = req.params;
    const slot = await AvailabilitySlot.findByPk(id);
    if (!slot) return res.status(404).json({ error: "Slot not found" });

    const model = detailModelMap[slot.ResourceDetailType];
    const detail = await model.findOne({
      where: { Id: slot.ResourceDetailId, ResourceId: slot.ResourceId },
    });
    if (!detail)
      return res
        .status(404)
        .json({ error: "Resource detail not found or not owned by user" });

    const { dayOfWeek, startTime, endTime, startDate, endDate, isActive } =
      req.body;
    await slot.update({
      DayOfWeek: dayOfWeek,
      StartTime: startTime,
      EndTime: endTime,
      StartDate: startDate,
      EndDate: endDate,
      IsActive: isActive,
    });
    res.json(slot);
  },

  async deleteSlot(req, res) {
    const userId = req.user.id;
    const { id } = req.params;
    const slot = await AvailabilitySlot.findByPk(id);
    if (!slot) return res.status(404).json({ error: "Slot not found" });

    const model = detailModelMap[slot.ResourceDetailType];
    const detail = await model.findOne({
      where: { Id: slot.ResourceDetailId, ResourceId: slot.ResourceId },
    });
    if (!detail)
      return res
        .status(404)
        .json({ error: "Resource detail not found or not owned by user" });

    await slot.destroy();
    res.json({ message: "Slot deleted" });
  },

  async getSlotsByResourceDetail(req, res) {
    const { resourceId, resourceDetailId } = req.params;
    const slots = await AvailabilitySlot.findAll({
      where: { ResourceId: resourceId, ResourceDetailId: resourceDetailId },
    });
    if (!slots || slots.length === 0) {
      return res.status(404).json({
        error: "Belum ada jadwal tersedia untuk resource detail ini.",
      });
    }
    res.json(slots);
  },
};
