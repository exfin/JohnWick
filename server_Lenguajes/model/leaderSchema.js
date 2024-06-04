import mongoose from 'mongoose';

const leaderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    }


})

const leaderModel = mongoose.models.leader || mongoose.model('leader', leaderSchema);
export default leaderModel;