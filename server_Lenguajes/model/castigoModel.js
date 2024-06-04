import mongoose from "mongoose";

const castigoSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

const castigoModel = mongoose.models.castigo || mongoose.model("castigo", castigoSchema);

export default castigoModel;