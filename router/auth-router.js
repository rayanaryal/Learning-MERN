// this place is where main action and logic is done

const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");

// router.get("/", (req, res)=>{
//     res.status(200).send("Weclome to world best mern series by thapa technical using route");
// })

router.route("/").get(authControllers.home);

router.route("/register").post(authControllers.register);

module.exports = router;