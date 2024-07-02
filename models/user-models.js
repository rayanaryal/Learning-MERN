const mongoose= require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
// secure the password with the bycrypt
userSchema.pre("save", async function (next){
    // console.log("pre method", this);
    const user =this;

    if (!user.isModified("password")){
        next();
    }
    try{
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch(error){
        next(error);
    }
})
//json web taken
userSchema.methods.generateToken = async function(){
    try{
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:"30d",
        }
    );
    } catch (error){
      console.error(error);
    }
};
// define the model name or the collection name
// please bear, name of the collection is capital letter
const User =new mongoose.model("User", userSchema);
 module.exports = User;

