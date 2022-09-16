import { Events, IRequest, Roles, RouteHandler } from "../types";
import argon2 from "argon2";
import fs from "fs";
import { UploadedFile } from "express-fileupload";
import UserModel from "../models/User";
import { Response } from "express";
import validateEmail from "../validation/validateEmail";
import validateName from "../validation/validateName";
import AuthResource from "../resources/AuthResource";
import UserResource from "../resources/UserResource";
import ErrorResource from "../resources/ErrorResource";
import OkResource from "../resources/OkResource";
import SignUpRequest from "../requests/SignUpRequest";
import SignInRequest from "../requests/SignInRequest";
import UpdateUserRequest from "../requests/UpdateUserRequest";
import ValidateEmailRequest from "../requests/ValidateEmailRequest";
import ChangePasswordRequest from "../requests/ChangePasswordRequest";
import SocketManager from "../managers/SocketManager";

const signup: RouteHandler = async (
  req: IRequest<SignUpRequest>,
  res: Response
) => {
  const email = req.body.email.trim().toLowerCase();
  const firstname = req.body.firstname.trim();
  const lastname = req.body.lastname.trim();
  const password = req.body.password.trim();
  const deviceType = req.body.deviceType;

  if (!validateEmail(email)) {
    return res
      .status(400)
      .json(new ErrorResource("Email is invalid", 400).toJSON());
  }
  if (!validateName(firstname)) {
    return res
      .status(400)
      .json(new ErrorResource("First name is invalid", 400));
  }
  if (!validateName(lastname)) {
    return res
      .status(400)
      .json(new ErrorResource("Last name is invalid", 400).toJSON());
  }
  const isEmailTaken = await UserModel.findOne({ email });

  if (isEmailTaken) {
    return res
      .status(409)
      .json(new ErrorResource("Email is already in use", 409).toJSON());
  }
  try {
    const hashedPassword = await argon2.hash(password);

    const user = await UserModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      deviceType,
      activeAddressId: "",
      role: Roles.USER,
    });

    return res.status(200).json(new AuthResource(user, deviceType).toJSON());
  } catch (err) {
    // console.log({ err });
    return res
      .status(500)
      .json(new ErrorResource("User creation unsuccessfully", 500).toJSON());
  }
};

const signin: RouteHandler = async (req: IRequest<SignInRequest>, res) => {
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password.trim();
  const deviceType = req.body.deviceType;
  if (!validateEmail(email)) {
    return res
      .status(400)
      .json(new ErrorResource("Email is invalid", 400).toJSON());
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json(new ErrorResource("User not found", 404).toJSON());
  }

  try {
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json(new ErrorResource("Password is invalid", 400));
    }
    return res.status(200).json(new AuthResource(user, deviceType).toJSON());
  } catch {
    return res
      .status(500)
      .json(new ErrorResource("Login unsuccessful", 500).toJSON());
  }
};

const uploadProfileImage: RouteHandler = async (req: IRequest<any>, res) => {
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

export const user: RouteHandler = async (req: IRequest<any>, res) => {
  const user = await UserModel.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(new UserResource(user).toJSON());
};

export const signout: RouteHandler = async (req: IRequest<any>, res) => {
  const user = await UserModel.findById(req.userId);
  if (!user) {
    return res
      .status(404)
      .json(new ErrorResource("User not found", 404).toJSON());
  }
  // destroy session TODO:
  return res.status(200).json(new OkResource().toJSON());
};

const updateUser: RouteHandler = async (
  req: IRequest<UpdateUserRequest>,
  res
) => {
  const user = await UserModel.findById(req.userId);
  if (!user) {
    return res
      .status(404)
      .json(new ErrorResource("User not found", 404).toJSON());
  }
  const checkEmail = await UserModel.findOne({
    email: req.body.email.trim().toLowerCase(),
  });

  if (
    checkEmail &&
    req.body.email.trim().toLowerCase() !== user.email.toLowerCase()
  ) {
    return res
      .status(409)
      .json(new ErrorResource("Email already taken", 409).toJSON());
  }

  user.email = req.body.email.trim().toLowerCase();
  user.firstname = req.body.firstname.trim();
  user.lastname = req.body.lastname.trim();
  user.activeAddressId = req.body.activeAddressId.trim();

  await user.save();

  // await UserModel.updateOne(
  //   { _id: req.userId },
  //   {
  //     email: req.body.email.trim().toLowerCase(),
  //     firstname: req.body.firstname.trim(),
  //     lastname: req.body.lastname.trim(),
  //   }
  // );
  SocketManager.emitMessage(
    Events.USER_PROFILE_UPDATE,
    user.id,
    new UserResource(user).toJSON()
  );

  return res.status(200).json(new UserResource(user).toJSON());
};

const changePassword: RouteHandler = async (
  req: IRequest<ChangePasswordRequest>,
  res
) => {
  const user = await UserModel.findById(req.userId);
  if (!user) {
    return res
      .status(404)
      .json(new ErrorResource("User not found", 404).toJSON());
  }

  try {
    const isPasswordValid = await argon2.verify(
      user.password,
      req.body.oldPassword
    );

    if (!isPasswordValid) {
      return res
        .status(401)
        .json(new ErrorResource("Password incorrect", 401).toJSON());
    }

    const hashedPassword = await argon2.hash(req.body.newPassword);

    await UserModel.updateOne(
      { _id: req.userId },
      {
        password: hashedPassword,
      }
    );
    return res.status(200).json(new OkResource().toJSON());
  } catch (e) {
    return res
      .status(500)
      .json(new ErrorResource("There was an issue with the server", 500));
  }
};

const validateUserEmail: RouteHandler = async (
  req: IRequest<ValidateEmailRequest>,
  res
) => {
  const user = await UserModel.findOne({
    email: req.body.email.trim().toLowerCase(),
  });

  if (user) {
    return res
      .status(400)
      .json(new ErrorResource("Email is taken", 400).toJSON());
  }
  return res.status(200).json(new OkResource().toJSON());
};

const UserController = {
  signup,
  signin,
  uploadProfileImage,
  user,
  signout,
  updateUser,
  validateUserEmail,
  changePassword,
};

export default UserController;
