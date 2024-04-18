const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const { Resend } = require("resend");

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password, pic, location } = req.body;

  // Check if any required field is missing
  if (!name || !email || !password || !username) {
    res.status(400).json({ message: "Please enter all the fields" });
    return;
  }

  // Check if user with provided email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    username,
    pic,
    location,
  });

  // Return user details and token upon successful registration
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      pic: user.pic,
      location: user.location,
      token: generateToken(user._id),
    });
  } else {
    res.status(500).json({ message: "Failed to create user" });
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  // Check if user exists and password is correct
  if (!user || !(await user.matchPassword(password))) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  // Return user details and token upon successful authentication
  res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    pic: user.pic,
    location: user.location,
    token: generateToken(user._id),
  });
});

const setProfile = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const { updatedProfile } = req.body;
  try {
    // Find user by ID
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Update user's profile picture and location
    user.pic = updatedProfile.pic;
    user.location = updatedProfile.location;
    const updatedUser = await user.save();

    // Return updated user details
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      location: updatedUser.location,
      pic: updatedUser.pic,
    });
  } catch (error) {
    console.error("Error setting profile picture:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  // Find user by ID
  const user = await User.findById(userId);

  // Check if user exists
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  // Return user profile data
  res.status(200).json({
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    pic: user.pic,
    location: user.location,
  });
});

const sendEmail = asyncHandler(async (req, res) => {
  // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = req.params.userId;
  // const userId = userInfo._id;
  const email = req.params.email;
  const userEmail = "iamyug111@gmail.com"; // User's email address
  const confirmationLink = `http://localhost:3000/confirm/${userId}`; // Replace with actual confirmation link

  const htmlContent = `
    <p><strong>Thank You!</strong></p>
    <p>We appreciate you choosing Dribbble and look forward to providing you with an exceptional experience.</p>
    <p>If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:support@example.com">support@example.com</a>.</p>
    <p>Best regards,<br/>The Dribbble Team</p>
`;

  try {
    const resend = new Resend("re_13bd1LSs_BZvwjb6rYnaADd4DgDUi1jeh");
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "iamyug111@gmail.com",
      subject: "Thank You for signing up to Dribbble",
      html: htmlContent,
    });
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
});
const getUsername = asyncHandler(async (req, res) => {
  const { username } = req.params;
  // Check if the username exists in the database
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    res.json({ available: false });// Username isn't available
  } else {
    res.json({ available: true }); // Username is available
  }
});

module.exports = {
  registerUser,
  authUser,
  setProfile,
  getUserProfile,
  sendEmail,
  getUsername,
};
