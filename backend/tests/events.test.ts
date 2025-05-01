import request from "supertest";
import app from "../src/app";
import * as eventService from "../src/services/events.service";

// Mock the service layer
jest.mock("../src/services/events.service");

describe("Events API", () => {
  const mockEvents = [{ event_id: 1, event_name: "Test Event", odds: 1.5 }];

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("GET /api/events", () => {
    it("should return all events", async () => {
      (eventService.getAllEvents as jest.Mock).mockResolvedValue(mockEvents);
      const res = await request(app).get("/api/events");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockEvents);
    });

    it("should handle service errors", async () => {
      (eventService.getAllEvents as jest.Mock).mockRejectedValue(
        new Error("fail")
      );
      const res = await request(app).get("/api/events");
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: "Something went wrong!" });
    });
  });

  describe("GET /api/events/:id", () => {
    it("should return an event by id", async () => {
      (eventService.getEventById as jest.Mock).mockResolvedValue(mockEvents[0]);
      const res = await request(app).get("/api/events/1");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockEvents[0]);
    });

    it("should return 404 if event not found", async () => {
      (eventService.getEventById as jest.Mock).mockResolvedValue(null);
      const res = await request(app).get("/api/events/999");
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: "Event not found" });
    });

    it("should validate id parameter", async () => {
      const res = await request(app).get("/api/events/abc");
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe("POST /api/events", () => {
    it("should create a new event", async () => {
      const newEvent = { event_id: 2, event_name: "New Event", odds: 2.0 };
      (eventService.createEvent as jest.Mock).mockResolvedValue(newEvent);
      const res = await request(app)
        .post("/api/events")
        .send({ event_name: "New Event", odds: 2.0 });
      expect(res.status).toBe(201);
      expect(res.body).toEqual(newEvent);
    });

    it("should validate request body", async () => {
      const res1 = await request(app).post("/api/events").send({ odds: 2.0 });
      expect(res1.status).toBe(400);
      expect(res1.body.errors).toBeDefined();

      const res2 = await request(app)
        .post("/api/events")
        .send({ event_name: "New Event" });
      expect(res2.status).toBe(400);
      expect(res2.body.errors).toBeDefined();
    });

    it("should handle service errors", async () => {
      (eventService.createEvent as jest.Mock).mockRejectedValue(
        new Error("fail")
      );
      const res = await request(app)
        .post("/api/events")
        .send({ event_name: "New Event", odds: 2.0 });
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: "Something went wrong!" });
    });
  });

  describe("PUT /api/events/:id", () => {
    it("should update an existing event", async () => {
      const updatedEvent = {
        event_id: 1,
        event_name: "Updated Event",
        odds: 3.0,
      };
      (eventService.updateEvent as jest.Mock).mockResolvedValue(updatedEvent);
      const res = await request(app)
        .put("/api/events/1")
        .send({ event_name: "Updated Event", odds: 3.0 });
      expect(res.status).toBe(200);
      expect(res.body).toEqual(updatedEvent);
    });

    it("should validate id and request body", async () => {
      const res1 = await request(app)
        .put("/api/events/abc")
        .send({ event_name: "X" });
      expect(res1.status).toBe(400);

      const res2 = await request(app)
        .put("/api/events/1")
        .send({ event_name: 123 });
      expect(res2.status).toBe(400);
    });

    it("should handle service errors", async () => {
      (eventService.updateEvent as jest.Mock).mockRejectedValue(
        new Error("fail")
      );
      const res = await request(app)
        .put("/api/events/1")
        .send({ event_name: "X" });
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: "Something went wrong!" });
    });
  });

  describe("DELETE /api/events/:id", () => {
    it("should delete an event", async () => {
      (eventService.deleteEvent as jest.Mock).mockResolvedValue(undefined);
      const res = await request(app).delete("/api/events/1");
      expect(res.status).toBe(204);
    });

    it("should validate id parameter", async () => {
      const res = await request(app).delete("/api/events/abc");
      expect(res.status).toBe(400);
    });

    it("should handle service errors", async () => {
      (eventService.deleteEvent as jest.Mock).mockRejectedValue(
        new Error("fail")
      );
      const res = await request(app).delete("/api/events/1");
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: "Something went wrong!" });
    });
  });

  describe("Unknown routes", () => {
    it("should return 404 for unsupported routes", async () => {
      const res = await request(app).get("/api/unknown");
      expect(res.status).toBe(404);
      expect(res.body.error).toBe("Route not found");
    });
  });
});
