import { User } from "../models/User";

export interface IUserResource {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}

export default class UserResource {
  private email: string;
  private firstname: string;
  private lastname: string;
  private activeAddressId: string;

  constructor(user: User) {
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.activeAddressId = user.activeAddressId;
  }

  toJSON() {
    return {
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      activeAddressId: this.activeAddressId,
    };
  }
}
