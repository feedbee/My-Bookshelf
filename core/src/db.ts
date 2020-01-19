import mongoose from "mongoose";

const uri: string = "mongodb+srv://mybookshelf:sjHj3jldwn5gd@mybookshelfcluster-uavwe.mongodb.net/my-bookshelf";

mongoose.connect(uri, (err: any) => {
  if (err) {
    console.log(err.message);
    process.exit(1);
  } else {
    console.log("Successfully Connected!");
  }
});

export default mongoose;