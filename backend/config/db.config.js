const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://demouser:TsX27HjjnlnMQMcl@demo-project.nis5m.mongodb.net/?retryWrites=true&w=majority&appName=demo-project"
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
};
