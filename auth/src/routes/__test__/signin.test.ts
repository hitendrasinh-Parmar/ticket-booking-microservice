import request from "supertest";
import { app } from "../../app";

it("Fails for invalid email", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "hiten@gmail.com",
      password: "123456",
    })
    .expect(400);
});

it("Fails for invalid password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "hiten@gmail.com",
      password: "123456",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "hiten@gmail.com",
      password: "123456789",
    })
    .expect(400);
});

it("response with a cookie when given valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "hiten@gmail.com",
      password: "123456",
    })
    .expect(201);
  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "hiten@gmail.com",
      password: "123456",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
