// Imports
import connectDb from "./db.js";
import { Db } from "mongodb";

// Variables
const db = await connectDb() as Db;

// Functions
function createItem(): void {
	db.collection("charts").insertOne({
        id: "likert",
        name: "Likert",
        description: "It is a likert chart."
    });
    console.log("Item is successfully created.");
}

async function readItem(): Promise<void> {
    const data = await db.collection("charts").find().toArray();
    console.log(data);
}

function updateItem(): void {
    db.collection("charts").updateOne({id: "likert"}, {$set: {name: "LIKERT"}});
    console.log("Item is successfully updated.");
}

function deleteItem(): void {
    db.collection("charts").deleteOne({id: "likert"});
    console.log("Item is successfully deleted.");
}

// Function Calls
createItem();
readItem();
updateItem();
deleteItem();
