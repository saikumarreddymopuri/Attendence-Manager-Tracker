import dotenv from "dotenv";
import app from "../src/app.js";
import connectDB from "../src/utils/db.js";

dotenv.config();

let isConnected = false;

const connectDatabase = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

export default async function handler(req, res) {
  await connectDatabase();
  return app(req, res);
}
