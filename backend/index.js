import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/utils/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
