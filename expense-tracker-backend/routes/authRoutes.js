const express = require("express");
const {registerUser, loginUser, logoutUser, verifyToken, verifyAuth} = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/protected", verifyToken, (req, res)=> {
    res.status(200).json({message: "Access granted", userId: req.userId});
});


module.exports = router;