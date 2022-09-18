import productsSeeder from "./productsSeeder";
import adminSeeder from "./adminSeeder";
import usersSeeder from "./usersSeeder";

const seeder = async () => {
  await productsSeeder();
  await adminSeeder();
  // await usersSeeder();
};

export default seeder;
