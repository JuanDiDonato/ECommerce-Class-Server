const { Schema, model } = require('mongoose');

const ColorSchema = new Schema({
    product : { type: String, required: true},
    color : { type: String, required: true },
    waist_s : { type: Number },
    waist_m : { type: Number },
    waist_l : { type: Number },
    waist_xl : { type: Number },
    waist_xxl : { type: Number }
},
    { timestamps: true });


module.exports = model('Color', ColorSchema);