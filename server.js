// this is the main file we named it sever it could be main.js else
require("dotenv").config();
const express= require("express");
const app = express();
const router = require("./router/auth-router");
const connectDb =require("./utils/db");

app.use(express.json());  // this is middleware, just to work with jason document 
// mount the router: to use the router in your main express app, you cna "mount" it at a specific URL prefix
app.use("/api/auth", router);


app.get("/",(req, res)=>{
    res.status(200).send("welcome to world best mern series by thapa technical.")
})
app.get("/register",(req, res)=>{
    res.status(200).send("welcome to registeration page without any changes in theee codeeeeeeeeeeee.")
})
// set the port before using it
const PORT =5000;
// connect to the database and then start the server
connectDb().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server is runnign in port: ${PORT}`);
    });
}).catch((error)=>{
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit with failure
})


// app.listen(PORT, ()=>{
//     console.log(`server is running at port: ${PORT} `);
// });



