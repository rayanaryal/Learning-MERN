const mongoose = require("mongoose");
require("dotenv").config();
const URI = process.env.MONGODB_URI; // the first one is copied from mongosh and last one mern_admin is name of the  file.
// mongoose.connect(URI);

const connectDb = async()=>{
    try{
        await mongoose.connect(URI);
        console.log("hey rajan, you are connected with database");
    } catch (error){
        console.error("database connection failed, we typed ourself", error.message);
        process.exit(0);
    }
};
module.exports = connectDb;
// RESPONSE GIVEN BY CHATGPT
/*
const mongoose = require('mongoose');
const URI = 'mongodb+srv://Aryal:aryal123@cluster0.obwnhrh.mongodb.net/myNewDatabase?retryWrites=true&w=majority&appName=Cluster0';

async function connectDb() {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Failed to connect to MongoDB Atlas:', error.message);
        process.exit(1); // Exit process with failure
    }
}
module.exports = connectDb;
*/