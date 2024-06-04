import leaderModel from "../model/leaderSchema.js";

const addLeader = async (req, res) => {
    const { name, region } = req.body;
    
    try {
        const newLeader = new leaderModel({
            name,
            region,
        });
        const savedLeader = await newLeader.save();
        res.status(201).json({ success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error al registrar" });
    }
}

const getAllLeaders = async (req, res) => {
    try {
        const leaders = await leaderModel.find({}).lean();
        const formattedLeaders = leaders.map(leader => ({
            name: leader.name,
            region: leader.region.toLowerCase()  
        }));
        console.log("lideres recibidos");
        res.status(200).json(formattedLeaders);
    } catch (error) {
        console.error("Error retrieving leaders:", error);
        res.status(500).json({ success: false, message: "Error retrieving leaders" });
    }

}


export {addLeader, getAllLeaders};