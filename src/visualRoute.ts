// Imports
import express from "express";

import { addVisualData, editVisualData, getAllVisualData, deleteVisualData } from "../src/visualController.js";

// Variables
const router = express.Router();

// Routes
router.post("/", addVisualData);
router.get("/", getAllVisualData);
router.put("/:id", editVisualData);
router.delete("/:id", deleteVisualData);

// Exports
export default router;