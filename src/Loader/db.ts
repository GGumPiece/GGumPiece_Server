import mongoose from "mongoose";
import config from "../config";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log("Mongoose Connected ...");
    // User.createCollection().then(function(collection) {
    //   console.log('User Collection is created!');
    // });
    // Post.createCollection().then(function(collection) {
    //   console.log('Post Collection is created!');
    // });
    // Profile.createCollection().then(function(collection) {
    //   console.log('Profile Collection is created!');
    // });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
