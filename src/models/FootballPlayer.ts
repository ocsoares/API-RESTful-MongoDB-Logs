import mongoose, { model, Schema } from 'mongoose';

export const FootballPlayerModel = mongoose.model('football_player', new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    current_team: { type: String, required: true },
    height: { type: String, required: true },
    rivals: { type: Array, required: false }
},
    {
        timestamps: true
    }
));