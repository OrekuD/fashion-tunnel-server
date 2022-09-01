import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { UserAddress } from "../models/UserAddress";

export default class UserAddressResource extends TimeStamps {
  private id: string;
  private name: string;
  private addressLine: string;
  private postalCode: string;

  constructor(userAddress: UserAddress) {
    super();
    this.id = (userAddress as any)?._id;
    this.name = userAddress.name;
    this.addressLine = userAddress.addressLine;
    this.postalCode = userAddress.postalCode;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      addressLine: this.addressLine,
      postalCode: this.postalCode,
    };
  }
}
