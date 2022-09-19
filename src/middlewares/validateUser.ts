import jwt from "jsonwebtoken";
import { Response } from "express";
import config from "../config";
import { IRequest } from "../types";
import ErrorResource from "../resources/ErrorResource";
import UserModel from "../models/User";

export const validateUser = (
  req: IRequest<any>,
  res: Response,
  next: () => void
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json(new ErrorResource("Unauthorized", 401));
  }

  return jwt.verify(
    token,
    config.JWT_SECRET as string,
    async (err: any, user: any) => {
      if (err) {
        console.log(err);
        return res.status(403).json(new ErrorResource("Unauthorized", 403));
      }
      const _user = await UserModel.findOne({
        _id: user.userId,
      });
      if (!_user) {
        return res.status(403).json(new ErrorResource("Unauthorized", 403));
      }
      req.userId = user.userId;
      return next();
    }
  );
};
