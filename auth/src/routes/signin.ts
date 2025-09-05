import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { ValidationRequest, BadRequestError } from "@jwt-auth-microsrv/common";
import { User } from "../models/user";
import { Password } from "../../services/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  ValidationRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (!existingUser) {
      throw new BadRequestError("Invalid Credentials");
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError("Invalid password");
    }

    const usetJWT = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: usetJWT,
    };
    res.status(200).send(existingUser);
  }
);

export { router as SigninRouter };
