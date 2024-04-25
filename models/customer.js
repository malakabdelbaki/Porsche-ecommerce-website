import mongoose from "mongoose"

const { Schema } = mongoose;

const customerSchema = Schema({
    //  customerId: Number,
     username: {type: String,required: true},
     password: {type: String,required: true},
     DOB: Date,
     city:String,
     state:String,
     StreetAddress:String,
     cart: [{productId: Number,quantity: Number}]
})
const Customer = mongoose.model('Customer', customerSchema);

export default Customer;