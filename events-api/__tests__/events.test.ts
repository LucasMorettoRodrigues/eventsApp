import app from "../src/app";
import request from "supertest";

const event = {
  description: "Event Test",
  date: "2022-10-08T13:00:00.000Z",
  userIds: [],
};

const editedEvent = {
  description: "Event Test Edited",
  date: "2022-10-08T13:00:00.000Z",
  userIds: [],
};

let eventId = "";

describe("POST /events", () => {
  it("should return 201 when create event", async () => {
    const response = await request(app).post("/events").send(event).expect(201);
    eventId = response.body.id;
  });
  it("should return 400 request body is missing fields", async () => {
    const response = await request(app)
      .post("/events")
      .send({ description: "Test" })
      .expect(400);
  });
});

describe("GET /events", () => {
  it("should return 200 when get events", async () => {
    await request(app).get("/events").expect(200);
  });
  it("should return 200 when get events by description query", async () => {
    await request(app)
      .get("/events")
      .query({ description: "Event Test" })
      .expect(200);
  });
});

describe("UPDATE /events", () => {
  it("should return 400 when event does not exists", async () => {
    await request(app)
      .put(`/events/invalidUserId`)
      .send(editedEvent)
      .expect(400);
  });
  it("should return 400 when request body is missing fields", async () => {
    await request(app)
      .put(`/events/${eventId}`)
      .send({ description: "Test" })
      .expect(400);
  });
  it("should return 200 when event is updated", async () => {
    await request(app).put(`/events/${eventId}`).send(editedEvent).expect(200);
  });
});

describe("DELETE /events", () => {
  it("should return 400 when event does not exists", async () => {
    await request(app).delete(`/events/invalidUserId`).expect(400);
  });
  it("should return 200 when delete event by id", async () => {
    await request(app).delete(`/events/${eventId}`).expect(200);
  });
});
