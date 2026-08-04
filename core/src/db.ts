import mongoose from "mongoose";

import Config from "./config";

mongoose.connect(Config.db.connectionString)
  .then(() => {
    console.log("Successfully Connected!");
  })
  .catch((err: Error) => {
    console.log(err.message);
    process.exit(1);
  });

export default mongoose;
