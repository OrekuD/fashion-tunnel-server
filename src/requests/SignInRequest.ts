import { DeviceTypes } from "../types";

export default interface SignInRequest {
  email: string;
  password: string;
  deviceType: DeviceTypes;
}
