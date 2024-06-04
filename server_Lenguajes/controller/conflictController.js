import conflictModel from "../model/conflictModel.js";
import userModel from "../model/userModel.js";

const addConflict = async (req, res) => {
    try {
        const { conflictName, conflictDescription } = req.body;

        
        const randomSize = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

        
        const sizeGroup1 = randomSize(2, 5);
        let sizeGroup2 = randomSize(2, 5);

        
        const totalSize = sizeGroup1 + sizeGroup2;
        if (totalSize > 10) {
            sizeGroup2 -= (totalSize - 10); 
        } else if (totalSize < 4) {
            sizeGroup2 += (4 - totalSize); 
        }

        
        const randomUsers = await userModel.aggregate([
            { $sample: { size: sizeGroup1 + sizeGroup2 } }
        ]);

        if (randomUsers.length < sizeGroup1 + sizeGroup2) {
            return res.status(400).send('No existen suficientes usuarios para crear un conflicto');
        }

        
        const newConflict = new conflictModel({
            conflictName,
            conflictDescription,
            usersGroup1: randomUsers.slice(0, sizeGroup1).map(user => user._id),
            usersGroup2: randomUsers.slice(sizeGroup1, sizeGroup1 + sizeGroup2).map(user => user._id),
            solved: false
        });

        
        await newConflict.save();

        res.status(201).send({
            message: 'Conflicto creado exitosamente',
            conflict: newConflict
        });
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
}

const getAllConflicts = async (req, res) => {
    try {
       
        const conflicts = await conflictModel.find({ solved: false }, 'conflictName _id usersGroup1 usersGroup2') 
        .populate({
            path: 'usersGroup1',
            select: 'name _id'  
        })
        .populate({
            path: 'usersGroup2',
            select: 'name _id'  
        });

        res.status(200).json(conflicts);
    } catch (error) {
        console.error("Failed to retrieve conflicts:", error);
        res.status(500).json({ message: "Error retrieving conflicts", error: error.message });
    }
};


const solveConflict = async (req, res) => {
    const { conflictId } = req.body;

    if (!conflictId) {
        return res.status(400).json({ message: "Conflict ID is required." });
    }

    try {
        
        const result = await conflictModel.findByIdAndUpdate(
            conflictId,
            { $set: { solved: true } },
            { new: true } 
        );

        if (!result) {
            return res.status(404).json({ message: "Conflict not found." });
        }

        res.status(200).json({ message: "El conflicto ha sido marcado como resuelto", conflict: result });
    } catch (error) {
        console.error("Failed to mark conflict as solved:", error);
        res.status(500).json({ message: "Error updating conflict", error: error.message });
    }

}

export { addConflict, getAllConflicts, solveConflict };
