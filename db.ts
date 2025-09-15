// Imports
import { Db, MongoClient } from "mongodb";

// Variables
const client: MongoClient = new MongoClient("mongodb://127.0.0.1:27017/");

// Functions
async function connectDb(): Promise<Db | undefined> {
	try {
		await client.connect();
		const db: Db = client.db("VisualCharts");
		return db;
	} catch (error) {
		console.error("Something went wrong:", error);
	}
}

// Exports
export default connectDb;
