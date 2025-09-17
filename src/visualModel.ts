// Imports
import mongoose, { Schema } from "mongoose";

// Interface
interface VisualInterface {
    name: string;
    id: string;
    imagePath: string;
    workspacePath?: string;
    description: string;
}

// Schema
const visualSchema = new Schema<VisualInterface>({
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
})

// Model
const Visual = mongoose.model<VisualInterface>("charts", visualSchema);

// Export
export { Visual };