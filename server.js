require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router/auth-router");
const connectDb = require("./utils/db");

// Middleware to parse JSON requests
app.use(express.json());

app.use("/api/auth", router);

app.get("/", (req, res) => {
    res.status(200).send("Welcome to the world's best MERN series by Thapa Technical.");
});

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit with failure
});
