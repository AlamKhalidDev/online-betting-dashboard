import { Event } from "../types/event";
import EventCard from "./EventCard";
import { Box } from "@mui/material";

interface EventsGridProps {
  events: Event[];
  handlePlaceBet: (event: Event) => void;
}

const EventsGrid = ({ events, handlePlaceBet }: EventsGridProps) => (
  <Box
    display="grid"
    gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
    gap={3}
  >
    {events.map((event) => (
      <EventCard
        key={event.event_id}
        event={event}
        onPlaceBet={() => {
          handlePlaceBet(event);
        }}
      />
    ))}
  </Box>
);

export default EventsGrid;
