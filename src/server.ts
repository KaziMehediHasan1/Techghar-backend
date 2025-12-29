import mongoose from "mongoose";
import config from "./config/index.js";
import app from "./app.js";

// Database connection -
const main = async () => {
  await mongoose.connect(config.database_url as string);
  app.listen(config.port, () => {
    console.log(`App listening on http://localhost:${config.port}`);
  });
};

main();
