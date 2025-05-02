import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import EventCard from "../components/EventCard";
import { Event } from "../types/event";

describe("EventCard", () => {
  const sampleEvent: Event = {
    event_id: "1",
    event_name: "Tennis: Player A vs Player B",
    odds: "2.3",
    sport: "Tennis",
  };
  it("renders event details and fires callback", async () => {
    const onPlaceBet = vi.fn();
    render(<EventCard event={sampleEvent} onPlaceBet={onPlaceBet} />);

    expect(screen.getByText("Tennis")).toBeInTheDocument();
    expect(screen.getByText("Player A vs Player B")).toBeInTheDocument();
    expect(screen.getByText("Odds:")).toBeInTheDocument();
    expect(screen.getByText("2.3")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /place bet/i }));
    expect(onPlaceBet).toHaveBeenCalled();
  });
});
