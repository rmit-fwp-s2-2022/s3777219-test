const app = require("express")();
const { user: User } = require("../sequelize/models");
const {
  LoginUser,
  NewUser,
  FindUserbyEmail,
  FindUserbyAttachedEmail,
  updateUser,
} = require("../Queries/UserQueries");
const {
  ValidateError,
  HashPassword,
  AuthenticateToken,
  AttachUser,
  AttachEmail,
} = require("../utils/functions");
const {
  LoginValidation,
  SignupValidation,
} = require("../validations/UserValidations");
app.post("/login", LoginValidation, ValidateError, LoginUser);
app.post("/signup", SignupValidation, ValidateError, HashPassword, NewUser);
app.post("/profile", AttachEmail, FindUserbyAttachedEmail);
app.post("/updateprofile", AttachEmail, updateUser);
app.post("/authenticate", AttachUser, AuthenticateToken);

// app.get("/user", AuthenticateToken, (req, res) => {
//   UserModel.findAll({ where: { email: req.user.email } })
//     .then((data) => {
//       if (data.length > 0) {
//         res.status(200).json({ message: "User Found", data: data });
//       } else {
//         res.status(400).json({ message: "User Not Found" });
//       }
//     })
//     .catch((err) => {
//       res.status(400).json({ message: err });
//     });
// });
module.exports = app;
