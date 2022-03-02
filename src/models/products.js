const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    title: { type: String, required: true },
    photos: { type: Array, required: true },
    description: { type: String, required: false },
    price: { type: 'Number', required: true },
    activeEvent : {type: String, required:false},
    disable: { type: Boolean, default: false }
},
    { timestamps: true });


module.exports = model('Product', ProductSchema);