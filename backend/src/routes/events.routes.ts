import express from "express";
import * as eventController from "../controllers/events.controller";

const router = express.Router();

router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEvent);
router.post("/", eventController.addEvent);
router.put("/:id", eventController.modifyEvent);
router.delete("/:id", eventController.removeEvent);

export default router;
