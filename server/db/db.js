const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://swipdle:swipdle@cluster0.dhj37rz.mongodb.net/swipdle?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

connectDB();

module.exports = connectDB;
