import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

// Mock database - stored in memory
const mockDatabase = {
  users: [
    {
      _id: "1",
      name: "Demo Teacher",
      email: "teacher@test.com",
      password: "test@123",
      role: "teacher"
    },
    {
      _id: "2",
      name: "Demo Student", 
      email: "student@test.com",
      password: "test@123",
      role: "student"
    }
  ]
};

// Login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const user = mockDatabase.users.find(u => u.email === email);
  
  if (user && user.password === password) {
    generateToken(res, user._id);
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      message: "User Successfully login with role: " + user.role,
    });
  }
  
  res.status(401);
  throw new Error("Invalid email or password");
});

// Register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  
  const userExists = mockDatabase.users.find(u => u.email === email);
  
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  
  const newUser = {
    _id: Date.now().toString(),
    name,
    email,
    password,
    role
  };
  
  mockDatabase.users.push(newUser);
  generateToken(res, newUser._id);
  
  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    message: "User Successfully created with role: " + newUser.role,
  });
});

// Logout
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

// Get profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  };
  res.status(200).json(user);
});

// Update profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = mockDatabase.users.find(u => u._id === req.user._id);
  
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    
    if (req.body.password) {
      user.password = req.body.password;
    }
    
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};

