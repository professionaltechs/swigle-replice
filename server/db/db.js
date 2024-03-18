const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // const conn = await mongoose.connect(
    //   `mongodb+srv://swipdle:swipdle@cluster0.dhj37rz.mongodb.net/swipdle?retryWrites=true&w=majority&appName=Cluster0`
    // );
    const conn = await mongoose.connect(
      `mongodb://swipdle:swipdle@ac-3ry9xeu-shard-00-00.dhj37rz.mongodb.net:27017,ac-3ry9xeu-shard-00-01.dhj37rz.mongodb.net:27017,ac-3ry9xeu-shard-00-02.dhj37rz.mongodb.net:27017/swipdle?ssl=true&replicaSet=atlas-nesiis-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

connectDB();

module.exports = connectDB;
