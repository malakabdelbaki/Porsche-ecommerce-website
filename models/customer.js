const mongoose = require('mongoose');

const { Schema } = mongoose;

const customerSchema = Schema({
    //  customerId: Number,
     username: {type: String,required: true},
     password: {type: String,required: true},
     DOB: {type: Date},
     city:{type: String},
     state:{type: String},
     StreetAddress:{type: String},
     cart: [{type: Schema.Types.ObjectId, ref: 'Product'}],
     type:{type:String,
        default:"customer" },
})
const Customer = mongoose.model('Customer', customerSchema );

module.exports = Customer