import mongoose from "mongoose";
import config from "../config";

// connect with a local MongoDB instance
// const localDBUri = `mongodb://${config.DB_HOST}:${config.DB_PORT}/ecommerce`;
const db = `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@cluster0.p87cqe2.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(db);

export default mongoose;
