import { Event } from "../types/event";
const API_URL = import.meta.env.VITE_API_URL;

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetch(`${API_URL}/events`);
    const data = await response.json();

    const processedEvents = data.map((event: Event) => ({
      ...event,
      sport: detectSportType(event.event_name),
    }));

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return processedEvents;
  } catch {
    throw new Error("Failed to fetch events");
  }
};

const detectSportType = (eventName: string): string => {
  return eventName.split(":")[0].trim();
};
