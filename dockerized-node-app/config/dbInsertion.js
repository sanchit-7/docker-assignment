import mongoose from "mongoose";

// Create a Mongoose schema for the test collection
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});

// Create a Mongoose model for the test collection
const UserModel = mongoose.model("Users", userSchema);

// Function to check if the database and collection exist
const checkDbAndCollectionExist = async (dbName, collectionName) => {
  // List all the databases
  const databases = await mongoose.connection.db?.admin()?.listDatabases();
  const dbExists = databases?.databases?.some((db) => db.name === dbName);

  const collections = await mongoose.connection.db
    ?.listCollections()
    ?.toArray();

  const collectionExists = collections?.some(
    (col) => col.name === collectionName
  );

  //   console.log(databases, collections, "here are the values");

  // Check if the collection exists in the database
  if (!dbExists && !collectionExists) {
    const existingCount = await UserModel.countDocuments();
    console.log(existingCount, "existingCount");
    if (existingCount === 0) {
      const dummyData = [
        { name: "John Doe", age: 28, email: "john@example.com" },
        { name: "Jane Smith", age: 34, email: "jane@example.com" },
        { name: "Alice Brown", age: 23, email: "alice@example.com" },
      ];
      await UserModel.insertMany(dummyData);
    }
  }

  return true;
};

export default checkDbAndCollectionExist;
