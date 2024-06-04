import userModel from "../model/userModel.js";

const addUser = async (req, res) => {
    const { name, imageLink, region } = req.body;
    const defaultMissions = ["Misión secreta", "Misión 2"];  

    try {
        const newUser = new userModel({
            name,
            imageLink,
            region,
            castigos: [],
            missions: defaultMissions  
        });
        const savedUser = await newUser.save();
        res.status(201).json({ success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error al registrar" });
    }
}


const getUsersEuropa = async (req, res) => {
    try {
        
        const users = await userModel.find({ region: "europa" }, '_id name imageLink castigos missions').lean();
        const results = users.map(user => ({
            _id: user._id,
            name: user.name,
            imageLink: user.imageLink,
            hasCastigos: user.castigos.length > 0,
            missions: user.missions  
        }));
        console.log("Users from Europa returned successfully");
        res.status(200).json(results);
    } catch (error) {
        console.error("Error retrieving users from Europa:", error);
        res.status(500).json({ success: false, message: "Error retrieving users" });
    }
};

const getUsersAmerica = async (req, res) => {
    try {
        const users = await userModel.find({ region: "america" }, '_id name imageLink castigos missions').lean();
        const results = users.map(user => ({
            _id: user._id,
            name: user.name,
            imageLink: user.imageLink,
            hasCastigos: user.castigos.length > 0,
            missions: user.missions
        }));
        console.log("Users from America returned successfully");
        res.status(200).json(results);
    } catch (error) {
        console.error("Error retrieving users from America:", error);
        res.status(500).json({ success: false, message: "Error retrieving users" });
    }
};

const addCastigo = async (req, res) => {

    const { userIDs, castigoDescription } = req.body;

    if (!userIDs || userIDs.length === 0 || !castigoDescription) {
        return res.status(400).json({ message: "Missing user IDs or castigo description." });
    }

    const castigo = {
        date: new Date(), 
        description: castigoDescription
    };

    try {
        
        const updateResult = await userModel.updateMany(
            { _id: { $in: userIDs } },
            { $push: { castigos: castigo } }
        );

        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ message: "No users found with the provided IDs." });
        }

        if (updateResult.modifiedCount === 0) {
            return res.status(404).json({ message: "No users were updated. Check if the user IDs are correct and they need updating." });
        }

        res.status(200).json({
            message: "Castigo successfully added to selected users.",
            details: updateResult
        });
    } catch (error) {
        console.error("Failed to add castigo:", error);
        res.status(500).json({ message: "Error adding castigo", error: error.message });
    }

}

const getCastigos = async (req, res) => {
    try {
        const users = await userModel.find({}, 'name imageLink castigos'); 
        
        let allCastigos = [];
        users.forEach(user => {
            user.castigos.forEach(castigo => {
                allCastigos.push({
                    userName: user.name,
                    userImageLink: user.imageLink, 
                    castigoDate: castigo.date,
                    castigoDescription: castigo.description,
                    castigoId: castigo._id
                });
            });
        });

        res.status(200).json(allCastigos);
    } catch (error) {
        console.error("Failed to retrieve castigos:", error);
        res.status(500).json({ message: "Error retrieving castigos", error: error.message });
    }
}

export { addUser, getUsersEuropa, getUsersAmerica, addCastigo, getCastigos };

