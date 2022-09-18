import argon2 from "argon2";
import { DeviceTypes, Roles } from "../types";
import UserModel from "../models/User";
import { faker } from "@faker-js/faker";

const usersSeeder = async () => {
  // const admin = await UserModel.find({ role: Roles.USER });

  // if (admin) {
  //   console.info("Admin already seeded");
  //   return;
  // }

  return;

  console.info("⚡️ Users seeding started");

  const hashedPassword = await argon2.hash("secret");

  for (let i = 0; i < 1000; i++) {
    const userNumber = i + 1;
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();

    await UserModel.create({
      firstname: firstname,
      lastname: lastname,
      email: faker.internet.email(firstname, lastname).toLowerCase(),
      password: hashedPassword,
      deviceType:
        i % 3 === 0
          ? DeviceTypes.WEB
          : i % 2 === 0
          ? DeviceTypes.ANDROID
          : DeviceTypes.IOS,
      activeAddressId: "",
      role: Roles.USER,
    });

    console.log(`User ${userNumber} seeded`);
  }

  console.info("⚡️ Users seeding complete");
};

export default usersSeeder;
