import mongoose from "mongoose";

const uri: string = "mongodb+srv://mybookshelf:sjHj3jldwn5gd@mybookshelfcluster-uavwe.mongodb.net/my-bookshelf";

mongoose.connect(uri)
  .then(() => {
    console.log("Successfully Connected!");
  })
  .catch((err: Error) => {
    console.log(err.message);
    process.exit(1);
  });

export default mongoose;
