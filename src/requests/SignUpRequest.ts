import { DeviceTypes } from "../types";

export default interface SignUpRequest {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  deviceType: DeviceTypes;
}
