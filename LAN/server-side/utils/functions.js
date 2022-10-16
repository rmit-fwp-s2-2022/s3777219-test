const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ValidateError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};
const HashPassword = (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  next();
};
const AuthenticatePassword = async (data, hashed) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(data, hashed, (err, same) => {
      if (same) {
        resolve();
      } else {
        reject("Incorrect Password");
      }
    });
  });
};
const GenerateToken = (email, user, userId) => {
  return new Promise((resolve, reject) => {
    try {
      const token = jwt.sign(
        { userId: userId, email: email, role: user },
        process.env.SECRET_KEY,
        { expiresIn: "3h" }
      );
      resolve(token);
    } catch {
      reject("Server Error");
    }
  });
};
const AuthenticateToken = (req, res, next) => {
  if (req.cookies.session_token) {
    jwt.verify(
      req.cookies.session_token,
      process.env.SECRET_KEY,
      (err, decrypted) => {
        if (!err && decrypted.user === req.user) {
          res.status(200).json({ message: "User Authenticated" });
        } else {
          res.status(400).json({ message: "Authentication Failed" });
        }
      }
    );
  } else {
    res.status(400).json({ message: "Authentication Failed" });
  }
};
const AttachUser = (req, res, next) => {
  req.user = "user";
  next();
};
const AttachAdmin = (req, res, next) => {
  req.user = "admin";
  next();
};
const AttachEmail = (req, res, next) => {
  const decoded = jwt.decode(req.cookies.session_token);
  if (decoded) {
    req.userId = decoded.userId;
    req.email = decoded.email;
    next();
  } else {
    res.status(400).json({ message: "Authentication Failed" });
  }
};
module.exports = {
  ValidateError,
  HashPassword,
  AuthenticatePassword,
  GenerateToken,
  AuthenticateToken,
  AttachUser,
  AttachAdmin,
  AttachEmail,
};
