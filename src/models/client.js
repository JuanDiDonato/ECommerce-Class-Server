const { Schema, model } = require('mongoose');

const ClientSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: false }
},
    { timestamps: true });


module.exports = model('Client', ClientSchema);