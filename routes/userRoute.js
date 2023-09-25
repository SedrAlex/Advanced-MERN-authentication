const express = require("express");
const router = express.Router()
const { loginUser, sendLoginCode, loginWithCode } = require("../controllers/userController")
const { getUser } = require("../controllers/userController");
const { 
     protect, 
    adminOnly, 
    supervisorOnly } = 
    require("../middlewares/authMiddleware");
const { 
    registerUser, 
    logoutUser, 
    updateUser, 
    deleteUser, 
    getUsers, 
    loginStatus, 
    upgradeUser, 
    sendAutomatedEmail,
    SendVerificationEmail,
    verifyUser,
    forgotPassword,
    resetPassword,
    changePassword
} = require("../controllers/userController");


router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",logoutUser);
router.get("/getUser", protect, getUser);
router.patch("/updateUser", protect, updateUser);

router.delete("/:id", protect,adminOnly, deleteUser);
router.get("/getUsers", protect,supervisorOnly, getUsers);
router.get("/loginStatus", loginStatus);
router.post("/upgradeUser", protect, adminOnly,upgradeUser);
router.post("/sendAutomatedEmail", protect,sendAutomatedEmail);

router.post("/sendVerificationEmail", protect,SendVerificationEmail);
router.patch("/verifyUser/:verificationToken", protect,verifyUser);
router.post("/forgotPassword",forgotPassword);
router.patch("/resetPassword/:resetToken",resetPassword);
router.patch("/changePassword",protect,changePassword);
router.post("/sendLoginCode/:email", sendLoginCode);
router.post("/loginWithCode/:email", loginWithCode);


module.exports = router