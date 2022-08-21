import jwt from "jsonwebtoken";
import config from "../config";
import { User } from "../models/User";
import { DeviceTypes } from "../types";
import UserResource, { IUserResource } from "./UserResource";

export interface IAuthResource {
  accessToken: string;
  deviceType: DeviceTypes;
  user: IUserResource;
}

export default class AuthResource {
  private accessToken: string;
  private deviceType: DeviceTypes;
  private user: User;

  constructor(user: User, deviceType: DeviceTypes) {
    this.accessToken = jwt.sign(
      { userId: (user as any)._id },
      config.JWT_SECRET!
    );
    this.deviceType = deviceType;
    this.user = user;
  }

  toJSON() {
    return {
      accessToken: this.accessToken,
      deviceType: this.deviceType,
      user: new UserResource(this.user).toJSON(),
    };
  }
}
