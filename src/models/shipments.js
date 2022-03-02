const { Schema, model } = require('mongoose');

const ShipmentSchema = new Schema({
    product : {type:String, required:true},
    quantity : {type:Number, default :1},
    client : {type:String,requided:true},
    status : {type:String,required:false,default:"forthcoming"}
},
{ timestamps: true });


module.exports = model('Shipment', ShipmentSchema);