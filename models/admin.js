const mongoose = require('mongoose');

const { Schema } = mongoose;

const AdminSchema = Schema({
    //  AdminId: Number,
     username: {type: String,required: true},
     password: {type: String,required: true},
     department:{type: String},
     type:{type:String,
            default:"admin" },
})

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin