// Imports
import mongoose from "mongoose";
// Connecting to MongoDB using Mongoose.
async function connectDb() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/VisualCharts");
        console.log("Database connected successfully.");
    }
    catch (error) {
        console.log("Something went wrong", error);
    }
}
// Exports
export { connectDb };
