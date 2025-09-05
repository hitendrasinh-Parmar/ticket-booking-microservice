import request from "supertest";
import { app } from "../../app";

it("return a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "hiten@gmail.com",
      password: "123456",
    })
    .expect(201);
});

it("return a 400 for invaid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "hitengmail.com",
      password: "123456",
    })
    .expect(400);
});

it("return a 400 for invaid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "hitengmail.com",
      password: "12",
    })
    .expect(400);
});

it("disallow duplicated email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "hiten@gmail.com",
      password: "123456",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "hiten@gmail.com",
      password: "123456",
    })
    .expect(400);
});

it("sets a cookie after successfull signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "hiten@gmail.com",
      password: "123456",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
