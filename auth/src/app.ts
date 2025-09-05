import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@jwt-auth-microsrv/common";

import { CurrentUserRouter } from "./routes/current-user";
import { SigninRouter } from "./routes/signin";
import { SignoutRouter } from "./routes/signout";
import { SignupRouter } from "./routes/signup";

const app = express();

app.set("trust proxy", true);

app.use(json());

app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);

app.use(CurrentUserRouter);
app.use(SigninRouter);
app.use(SignoutRouter);
app.use(SignupRouter);

app.all("/*w", async (req, res, next) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
