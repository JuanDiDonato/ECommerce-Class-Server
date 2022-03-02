const { Schema, model } = require('mongoose');

const EventSchema = new Schema({
    name : {type:String, required:true},
    discount : {type:String, required:true},
    fromDate : {type:Date, required:false},
    toDate: {type:Date, required: false}

},
    { timestamps: true });


module.exports = model('Event', EventSchema);