// Imports
import connectDb from "./db.js";
// Variables
const db = await connectDb();
// Functions
function createItem() {
    db.collection("charts").insertOne({
        id: "likert",
        name: "Likert",
        description: "It is a likert chart."
    });
    console.log("Item is successfully created.");
}
async function readItem() {
    const data = await db.collection("charts").find().toArray();
    console.log(data);
}
function updateItem() {
    db.collection("charts").updateOne({ id: "likert" }, { $set: { name: "LIKERT" } });
    console.log("Item is successfully updated.");
}
function deleteItem() {
    db.collection("charts").deleteOne({ id: "likert" });
    console.log("Item is successfully deleted.");
}
// Function Calls
createItem();
readItem();
updateItem();
deleteItem();
