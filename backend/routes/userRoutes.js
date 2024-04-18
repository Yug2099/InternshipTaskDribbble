const express = require("express");
const {
  registerUser,
  // authUser,
  setProfile,
  getUserProfile,
  sendEmail,
  getUsername,
} = require("../controllers/userControllers");
const router = express.Router();

// Apply protect middleware to the setProfile route

// Other routes
router.route("/").post(registerUser);
router.put("/setprofile/:userId", setProfile);
router.get("/getprofile/:userId", getUserProfile);
router.post("/sendemail/:userId", sendEmail);

router.get("/getusername/:userId", getUsername);

// router.post("/login", authUser);

module.exports = router;
