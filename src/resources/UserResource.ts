import { User } from "../models/User";

export interface IUserResource {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}

export default class UserResource {
  private id: string;
  private email: string;
  private firstname: string;
  private lastname: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
    };
  }
}
