// Imports
import { Request, Response } from "express";
import { Visual } from "./visualModel.js";

// Interface
interface VisualDataInterface {
    name: string;
    id: string;
    imagePath: string;
    workspacePath?: string;
    description: string;
}

const addVisualData = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, id, imagePath, description }: VisualDataInterface = req.body;
    
        if (!name || !id || !imagePath || !description) {
            return res.status(400).json({message: "All fields are required"});
        };
    
        await Visual.create({
            name,
            id,
            imagePath,
            description
        });
    
        return res.status(201).json({ message: "Visual create successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const editVisualData = async (req: Request, res: Response): Promise<Response> => {
    try {
        const visualId: string = req.params.id;
        const { name, id, imagePath, description }: VisualDataInterface = req.body;

        await Visual.findOneAndUpdate(
            { id: visualId },
            {
                name,
                id,
                imagePath,
                description
            }
        );

        return res.status(200).json({ message: 'User updated successfully.' });
        
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const getAllVisualData = async (req: Request, res: Response): Promise<Response> => {
    try {
        const visualData: VisualDataInterface[] = await Visual.find();

        if (!visualData) {
            return res.status(200).json({ message: "No data found." });
        }

        return res.status(200).json(visualData);
        
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteVisualData = async (req: Request, res: Response): Promise<Response> => {
    try {
        const visualId: string = req.params.id;
        const deletedVisual: VisualDataInterface = await Visual.findOneAndDelete({id: visualId});

        if (!deletedVisual) {
            return res.status(400).json({ message: "Visual not found." })
        }

        return res.status(200).json({ message: "Visual deleted successfully." })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export {
    addVisualData,
    editVisualData,
    getAllVisualData,
    deleteVisualData
};