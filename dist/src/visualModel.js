// Imports
import mongoose, { Schema } from "mongoose";
// Schema
const visualSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    imagePath: {
        type: String,
        required: true
    },
    workspacePath: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    }
});
// Model
const Visual = mongoose.model("charts", visualSchema);
// Export
export { Visual };
