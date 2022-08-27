import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { User } from "../models/User";

export interface IDetailedUserResource {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  deviceType: string;
}

export default class DetailedUserResource extends TimeStamps {
  private id?: string;
  private email: string;
  private firstname: string;
  private lastname: string;
  private deviceType: string;

  constructor(user: User) {
    super();
    this.id = (user as any)?._id;
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.deviceType = user.deviceType;
    this.createdAt = user.createdAt;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      deviceType: this.deviceType,
      createdAt: this.createdAt?.toISOString(),
    };
  }
}
