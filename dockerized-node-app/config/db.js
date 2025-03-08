import mongoose from "mongoose";

// State to store the MongoDB connection
let dbInstance = null;

const connectDB = async () => {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return dbConnection;
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    // process.exit(1); // Exit process on failure
  }
};

const getDbConnection = async () => {
  if (dbInstance === null) {
    dbInstance = await connectDB();
  }
  return dbInstance;
};

export default getDbConnection;
