import mongoose from "mongoose";
import * as dotenv from "dotenv";

import app from "./app";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE?.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD as string
);
mongoose.set("strictQuery", false);
mongoose
  .connect(DB as string)
  .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
