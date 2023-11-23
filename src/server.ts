import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

async function main() {
  try {
    await mongoose.connect(config.dbURL as string);
    app.listen(config.port, () => {
      console.log(`Port running in ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
