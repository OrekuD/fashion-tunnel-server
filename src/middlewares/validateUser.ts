import jwt from "jsonwebtoken";
import { Response } from "express";
import config from "../config";
import { Req } from "../types";

export const validateUser = (req: Req, res: Response, next: () => void) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  return jwt.verify(
    token,
    config.JWT_SECRET as string,
    (err: any, user: any) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      // console.log({ userId: user.userId });
      req.userId = user.userId;
      return next();
    }
  );
};
