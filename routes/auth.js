const express = require("express");
const router = express.Router();
const authentucateUser = require("../middleware/authentication");
const testUser = require("../middleware/testUser");
const { register, login, updateUser } = require("../controllers/auth");

const rateLimitter = require("express-rate-limit");

const apiLimiter = rateLimitter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: "Too many requests for this IP, please try again after 15 minutes",
  },
});

router.post("/register", apiLimiter, register);
router.post("/login", apiLimiter, login);
router.patch("/updateUser", authentucateUser, testUser, updateUser);
module.exports = router;
