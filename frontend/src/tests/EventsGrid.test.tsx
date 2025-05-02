import { render, screen } from "@testing-library/react";
import EventsGrid from "../components/EventsGrid";
import { Event } from "../types/event";

it("renders a grid of EventCard components", () => {
  const events: Event[] = [
    { event_id: "1", event_name: "E1", odds: "1.1" },
    { event_id: "2", event_name: "E2", odds: "2.2" },
  ];
  render(<EventsGrid events={events} handlePlaceBet={() => {}} />);
  expect(screen.getAllByText(/Odds:/i)).toHaveLength(2);
});
