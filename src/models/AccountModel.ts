import mongoose, { Schema } from "mongoose";

export const AccountModel = mongoose.model('account', new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},
    {
        timestamps: true
    }
));