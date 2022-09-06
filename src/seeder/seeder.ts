import productsSeeder from "./products";
import adminSeeder from "./admin";

const seeder = async () => {
  await productsSeeder();
  await adminSeeder();
};

export default seeder;
