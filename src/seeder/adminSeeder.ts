import argon2 from "argon2";
import { DeviceTypes, Roles } from "../types";
import UserModel from "../models/User";
import { faker } from "@faker-js/faker";

const adminSeeder = async () => {
  const admin = await UserModel.findOne({ role: Roles.SUPER_ADMIN });

  if (admin) {
    console.info("Admin already seeded");
    return;
  }

  console.info("⚡️ Admin seeding started");

  const hashedPassword = await argon2.hash("secret");

  try {
    await UserModel.create({
      firstname: "david",
      lastname: "opoku",
      email: "admin@gmail.com",
      password: hashedPassword,
      deviceType: DeviceTypes.WEB,
      activeAddressId: "",
      role: Roles.SUPER_ADMIN,
      profilePicture: faker.internet.avatar(),
    });
  } catch (error) {
    console.log({ error });
    console.error("There was an issue seeding the admin");
  }

  console.info("⚡️ Admin seeding complete");
};

export default adminSeeder;
