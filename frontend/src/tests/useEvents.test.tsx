import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useEvents } from "../hooks/useEvents";
import * as api from "../services/api";

const mockEvents = [
  {
    event_id: "1",
    event_name: "Football: Team A vs Team B",
    odds: "1.5",
    sport: "Football",
  },
];

describe("useEvents", () => {
  beforeEach(() => {
    vi.spyOn(api, "fetchEvents").mockResolvedValue(mockEvents);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should return loading state then events", async () => {
    const { result } = renderHook(() => useEvents());
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.events).toEqual(mockEvents);
    expect(result.current.error).toBeNull();
  });

  it("should set error on fetch failure", async () => {
    (api.fetchEvents as jest.Mock).mockRejectedValue(new Error("fail"));
    const { result } = renderHook(() => useEvents());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Error loading events");
  });
});
