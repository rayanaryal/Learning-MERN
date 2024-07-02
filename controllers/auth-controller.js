const User = require("../models/user-models");
const bcrypt = require("bcryptjs");

// HOME
const home = async (_, res) => {
    try {
        res.status(200).send("Welcome to the world's best MERN series by Thapa Technical using route");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
};

// USER REGISTRATION LOGIC
const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        const hash_password = await bcrypt.hash(password, 10);

        const userCreated = await User.create({
            username,
            email,
            phone,
            password: hash_password
        });

        res.status(201).json({
            message: "Registration successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error during registration");
    }
};

// USER LOGIN LOGIC
const login = async (req, res) => {
    try {
        console.log('Headers:', req.headers);
        console.log('Request body:', req.body); // This should show the parsed body if express.json() is working

        const { email, password } = req.body;
        console.log(`Login attempt for email: ${email}`);

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const userExist = await User.findOne({ email });
        console.log(userExist);

        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        console.log(`Comparing password: ${password} with hashed password: ${userExist.password}`);
        const isPasswordCorrect = await bcrypt.compare(password, userExist.password);
        console.log(`Password match: ${isPasswordCorrect}`);

        if (isPasswordCorrect) {
            res.status(200).json({
                msg: "Login successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            res.status(401).json({ message: "Invalid email/password" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error during login");
    }
}