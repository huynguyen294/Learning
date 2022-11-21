import mongoose from "mongoose";

const MONGODB_URL =
  "mongodb+srv://admin:00000000@cluster0.r9esu.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully!!!");
  } catch (error) {
    console.log("Connect failure!!!");
    console.log(error);
  }
}

export default connect;
