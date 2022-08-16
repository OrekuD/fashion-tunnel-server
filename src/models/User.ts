import mongoose, { Document } from "mongoose";

export interface User extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;
