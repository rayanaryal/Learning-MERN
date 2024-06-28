const User =require("../models/user-models");
const bcrypt =require("bcryptjs")



// HOME
const home = async (req, res) => {
    try{
        res.status(200).send("Welcome to world best MERN series by thapa technical using route")
    } catch(error){
       console.log(error);
    }
};
// USER REGISTERATION LOGIC
/**  
1. Get registration data: retrieve user data(username, email,phone password).
2. Check Email existence: check if the emial is already registered.
3. hash password: securely has the password
4. create user; create a user with hased password
5. save to db; save user data to the database.
6. respond; respond with "registeration successful" or handle errors.
 */

const register = async(req, res)=>{
    try{
        console.log(req.body);
// 1. Get registration data: retrieve user data(username, email,phone password).
        const { username, email, phone, password }= req.body;

// 2. Check Email existence: check if the emial is already registered.
        const userExist = await User.findOne({ email });

        if(userExist){
            return res.status(400).json({msg:"email already exists"});
        }
// hash the password
        await User.create({username, email, phone, password});


        res.status(200).json({message:req.body});
    }catch (error){
        res.status(400).json({msg:"internal server error we wrote it ourself"})
    }
};

module.exports = { home, register };