import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// Mock users
const mockUsers = [
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
];

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, "Dhruv@123");
      const user = mockUsers.find(u => u._id === decoded.userId);
      
      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }
      
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, Invalid Token");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, no Token");
  }
});

export { protect };
