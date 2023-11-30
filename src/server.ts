import "dotenv/config";
import mongoose from "mongoose";

import app from "./app";
import env from "./utils/validateEnv";


const DB = env.DATABASE.replace("<PASSWORD>", env.DATABASE_PASSWORD);

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await mongoose.connect(DB);
    console.log("connecting to DB");
    app.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
})();
