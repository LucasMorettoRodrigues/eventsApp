import app from "../src/app";
import request from "supertest";

const user = {
  name: "John Test",
};

const editedUser = {
  name: "John Test Edited",
};

let userId = "";

describe("POST /users", () => {
  it("should return 201 when create user", async () => {
    const response = await request(app).post("/users").send(user).expect(201);
    userId = response.body.id;
  });

  it("should return 400 if user already exists", async () => {
    await request(app).post("/users").send(user).expect(400);
  });
  it("should return 400 if request body is missing fields", async () => {
    await request(app).post("/users").send({}).expect(400);
  });
});

describe("GET /users", () => {
  it("should return 200 when get users", async () => {
    await request(app).get("/users").expect(200);
  });
  it("should return 200 when get users by name query", async () => {
    await request(app).get("/users").query({ name: "John Test" }).expect(200);
  });
  it("should return 200 when get user by id", async () => {
    await request(app).get(`/users/${userId}`).expect(200);
  });
});

describe("UPDATE /users", () => {
  it("should return 400 when user does not exists", async () => {
    await request(app).put(`/users/invalidUserId`).send(editedUser).expect(400);
  });
  it("should return 200 when user is updates", async () => {
    await request(app).put(`/users/${userId}`).send(editedUser).expect(200);
  });
  it("should return 400 if request body is missing fields", async () => {
    await request(app).put(`/users/${userId}`).send({}).expect(400);
  });
});

describe("DELETE /users", () => {
  it("should return 400 when user does not exists", async () => {
    await request(app).delete(`/users/invalidUserId`).expect(400);
  });
  it("should return 200 when delete user by id", async () => {
    await request(app).delete(`/users/${userId}`).expect(200);
  });
});
