import mongoose from "mongoose"

const { Schema } = mongoose;

const AdminSchema = Schema({
    //  AdminId: Number,
     username: {type: String,required: true},
     password: {type: String,required: true},
     department:{type: String},
})

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;