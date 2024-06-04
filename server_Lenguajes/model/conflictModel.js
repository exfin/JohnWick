import mongoose from "mongoose";

const conflictSchema = new mongoose.Schema({
    conflictName: {
        type: String,
        required: true
    },
    conflictDescription: {
        type: String,
        required: true
    },
    solved: {
        type: Boolean,
        required: true,
        default: false
    },
    
    usersGroup1: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }],
    usersGroup2: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }]


})

const conflictModel = mongoose.models.conflict || mongoose.model("conflict", conflictSchema);

export default conflictModel;