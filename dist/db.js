// Imports
import { MongoClient } from "mongodb";
// Variables
const client = new MongoClient("mongodb://127.0.0.1:27017/");
// Functions
async function connectDb() {
    try {
        await client.connect();
        const db = client.db("VisualCharts");
        return db;
    }
    catch (error) {
        console.error("Something went wrong:", error);
    }
}
// Exports
export default connectDb;
