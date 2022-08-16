import { Req, RouteHandler } from "../types";
import argon2 from "argon2";
import fs from "fs";
import { UploadedFile } from "express-fileupload";
import UserModel from "../models/User";
import { Request, Response } from "express";
import validateEmail from "../validation/validateEmail";
import validateName from "../validation/validateName";
import AuthResource from "../resources/AuthResource";
import UserResource from "../resources/UserResource";

const signup: RouteHandler = async (req: Request, res: Response) => {
  const email = req.body.email.trim().toLowerCase();
  const firstname = req.body.firstname.trim();
  const lastname = req.body.lastname.trim();
  const password = req.body.password.trim();
  const deviceType = req.body.deviceType.trim();

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Email is invalid" });
  }
  if (!validateName(firstname)) {
    return res.status(400).json({ message: "First name is invalid" });
  }
  if (!validateName(lastname)) {
    return res.status(400).json({ message: "Last name is invalid" });
  }
  const isEmailTaken = await UserModel.findOne({ email });

  if (isEmailTaken) {
    return res.status(409).json({ message: "Email is already in use" });
  }
  try {
    const hashedPassword = await argon2.hash(password);
    const user = await UserModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    return res.status(200).json(new AuthResource(user, deviceType).toJSON());
  } catch (err) {
    return res.status(500).json({ message: "User creation unsuccessfully" });
  }
};

const signin: RouteHandler = async (req: Req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password.trim();
  const deviceType = req.body.deviceType;
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Email is invalid" });
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password is invalid" });
    }
    return res.status(200).json(new AuthResource(user, deviceType).toJSON());
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

  return res.status(200).json(new UserResource(user).toJSON());
};

const UserController = {
  signup,
  signin,
  uploadProfileImage,
  getUser,
};

export default UserController;
