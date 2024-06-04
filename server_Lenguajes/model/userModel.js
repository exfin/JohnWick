import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageLink: {
        type: String,
        required: false
    },
    castigos: [{
        date: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }],
    region: {
        type: String,
        required: true
    },
    missions: [{
        type: String
    }]
}, {minimize: false});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);
export default userModel;