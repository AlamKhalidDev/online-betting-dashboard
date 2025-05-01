import prisma from "../config/prisma";
import { Event } from "@prisma/client";

export const getAllEvents = async (): Promise<Event[]> => {
  return prisma.event.findMany();
};

export const getEventById = async (id: number): Promise<Event | null> => {
  return prisma.event.findUnique({ where: { event_id: id } });
};

export const createEvent = async (
  eventData: Omit<Event, "event_id">
): Promise<Event> => {
  return prisma.event.create({ data: eventData });
};

export const updateEvent = async (
  id: number,
  eventData: Partial<Event>
): Promise<Event> => {
  return prisma.event.update({
    where: { event_id: id },
    data: eventData,
  });
};

export const deleteEvent = async (id: number): Promise<Event> => {
  return prisma.event.delete({ where: { event_id: id } });
};
