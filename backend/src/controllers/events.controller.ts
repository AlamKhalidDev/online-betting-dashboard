import { NextFunction, Request, Response } from "express";
import * as eventService from "../services/events.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await eventService.getAllEvents();
    res.json(events);
  } catch (error) {
    next(error);
  }
};

export const getEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const event = await eventService.getEventById(Number(req.params.id));
    event
      ? res.json(event)
      : res.status(404).json({ message: "Event not found" });
  } catch (error) {
    next(error);
  }
};

export const addEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newEvent = await eventService.createEvent(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};

export const modifyEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedEvent = await eventService.updateEvent(
      Number(req.params.id),
      req.body
    );
    res.json(updatedEvent);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.status(404).json({ message: "Event not found" });
        return;
      }
    }
    next(error);
  }
};

export const removeEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await eventService.deleteEvent(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        res.status(404).json({ message: "Event not found" });
        return;
      }
    }
    next(error);
  }
};
