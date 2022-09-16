import productsSeeder from "./productsSeeder";
import adminSeeder from "./adminSeeder";

const seeder = async () => {
  await productsSeeder();
  await adminSeeder();
};

export default seeder;
