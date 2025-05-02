import { render, screen } from "@testing-library/react";
import EventStatusMessage from "../components/EventStatusMessage";

test("displays title and description", () => {
  render(
    <EventStatusMessage
      title="No events"
      description="Please check back later"
    />
  );
  expect(screen.getByText("No events")).toBeInTheDocument();
  expect(screen.getByText("Please check back later")).toBeInTheDocument();
});
