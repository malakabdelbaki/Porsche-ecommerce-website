const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = Schema({
    //  AdminId: Number,
     name: {type: String,required: true},
     price: {type: Number,required: true},
     description:{type:String},
     category:{type:String},
     production_year: {type:Date},
     quantity: {type: Number},
    })

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product