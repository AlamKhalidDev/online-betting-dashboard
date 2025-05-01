import express from "express";
import * as eventController from "../controllers/events.controller";
import {
  validateCreateEvent,
  validateEventId,
  validateRequest,
  validateUpdateEvent,
} from "../middleware/validateRequest";

const router = express.Router();

router.get("/", eventController.getEvents);
router.get("/:id", validateEventId, validateRequest, eventController.getEvent);
router.post("/", validateCreateEvent, validateRequest, eventController.addEvent);
router.put("/:id", validateEventId, validateUpdateEvent, validateRequest, eventController.modifyEvent);
router.delete("/:id", validateEventId, validateRequest, eventController.removeEvent);

export default router;
