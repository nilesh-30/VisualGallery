// Imports
import express from "express";
import cors from "cors";
import visual from "./src/visualRoute.js"

import { connectDb } from "./db.js";

const app = express();
const PORT = 8000;

// Connect to database
connectDb();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/visuals", visual)

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});