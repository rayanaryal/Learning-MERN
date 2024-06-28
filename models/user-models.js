const mongoose= require("mongoose");

// define the schema for the "user" collection
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
});
// define the model name or the collection name
// please bear, name of the collection is capital letter
const User =new mongoose.model("User", userSchema);
 module.exports = User;