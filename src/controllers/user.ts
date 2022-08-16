import { Req, RouteHandler } from "../types";
import argon2 from "argon2";
// import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import config from "../config";
// import { isNameValid, isEmailValid } from "../utils/validation";
// import { uploadFile } from "../utils/uploadFile";
import { UploadedFile } from "express-fileupload";
import UserModel, { User } from "../models/User";
import { Request, Response } from "express";

type IUser = Pick<User, "firstname" | "lastname" | "email">;

const signup: RouteHandler = async (req: Request, res: Response) => {
  const userDetails = req.body;
  const email = (userDetails.email as string).trim().toLowerCase();
  const fullname = (userDetails.fullname as string).trim();
  //   if (!isEmailValid(email)) {
  //     return res.status(400).json({ message: "Email is invalid" });
  //   }
  //   if (!isNameValid(fullname)) {
  //     return res.status(400).json({ message: "Name is invalid" });
  //   }
  const isEmailTaken = await UserModel.findOne({ email });
  if (isEmailTaken) {
    return res.status(409).json({ message: "Email is already in use" });
  }
  try {
    const hashedPassword = await argon2.hash(userDetails.password);
    const newUser = await UserModel.create({
      fullname,
      email,
      password: hashedPassword,
      profileImage: null,
      wishlist: [],
      purchaseHistory: [],
    });
    const token = jwt.sign({ id: newUser.id }, config.JWT_SECRET!);
    const data: any = {
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      id: "",
    };
    return res.status(200).json({
      message: "User created successfully",
      token,
      user: data,
    });
  } catch (err) {
    return res.status(500).json({ message: "User creation unsuccessfully" });
  }
};

const signin: RouteHandler = async (req: Req, res) => {
  const userDetails = req.body;
  const email = (userDetails.email as string).trim().toLowerCase();
  //   if (!isEmailValid(email)) {
  //     return res.status(400).json({ message: "Email is invalid" });
  //   }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const isPasswordValid = await argon2.verify(
      user.password,
      userDetails.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password is invalid" });
    }
    const token = jwt.sign({ id: user.id }, config.JWT_SECRET!);
    const data: IUser = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };
    return res.status(200).json({
      message: "Login successful",
      token,
      user: data,
    });
  } catch {
    return res.status(500).json({ message: "Login unsuccessful" });
  }
};

const uploadProfileImage: RouteHandler = async (req: Req, res: Response) => {
  const user = await UserModel.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (!req.files) {
    return res.status(400).send({ message: "No file provided" });
  }
  try {
    const file = req.files.image as UploadedFile;
    file.mv(`${__dirname}/${file.name}`, async (error) => {
      if (error) {
        return res.status(500).send({ message: "File upload unsuccessful" });
      }

      //   const { url, publicId } = await uploadFile(
      //     path.join(__dirname, file.name),
      //     { access_mode: "public", folder: "/profile_images" }
      //   );
      //   if (user.profileImage?.publicId) {
      //     const __res = await cloudinary.uploader.destroy(
      //       user.profileImage?.publicId
      //     );
      //     console.log({ __res });
      //   }
      //   const _res = await UserModel.updateOne(
      //     { _id: user.id },
      //     { profileImage: { url, publicId } }
      //   );
      try {
        fs.unlinkSync(`${__dirname}/${file.name}`);
        return res
          .status(200)
          .send({ message: "File upload successful", url: "" });
      } catch (error) {
        return res.status(500).send({ message: "File upload unsuccessful" });
      }
    });

    return res.status(500).send({ message: "File upload unsuccessful" });
  } catch (error) {
    return res.status(500).send({ message: "File upload unsuccessful" });
  }
};

export const getUser: RouteHandler = async (req: Req, res) => {
  const user = await UserModel.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const data: IUser = {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  };
  return res.status(200).json({ data });
};

const UserController = {
  signup,
  signin,
  uploadProfileImage,
  getUser,
};

export default UserController;
