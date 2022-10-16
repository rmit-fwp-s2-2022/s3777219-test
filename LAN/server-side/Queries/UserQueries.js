const { where } = require("sequelize");
const { user: User } = require("../sequelize/models");
const { AuthenticatePassword, GenerateToken } = require("../utils/functions");
const NewUser = (req, res, next) => {
  console.log(req.body);
  FindUserbyEmail(req.body.email)
    .then(() => {
      res.status(400).json({ message: "Email already exist" });
    })
    .catch((err) => {
      if (err.error) {
        User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          role: "user",
          updatedAt: new Date(),
          createdAt: new Date(),
        })
          .then((data) => {
            res.status(200).json({ message: "User Created", data: data });
          })
          .catch((err) => {
            console.log(err);
            res.status(404).json({ message: err });
          });
      }
    });
};
const FindUserbyAttachedEmail = (req, res, next) => {
  FindUserbyEmail(req.email)
    .then((data) => {
      res.status(200).json({ message: "User Found", data: data });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};
const updateUser = (req, res, next) => {
  const values = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
  };
  console.log(values);
  User.findOne({ where: { id: req.userId } })
    .then((data) => {
      if (data) {
        User.update(values, {
          where: { id: req.userId },
        })
          .then((data) => {
            res.status(200).json({ message: "Profile Updated", data: data });
          })
          .catch((err) => {
            console.log(err);
            res.status(404).json({ error: err });
          });
      } else {
        Reaction.create(values).then((data) => {
          res.status(200).json({ message: "Reaction Created", data: data });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ error: err });
    });
};

const FindUserbyEmail = (email) => {
  return new Promise((resolve, reject) => {
    User.findOne({ where: { email: email } })
      .then((doc) => {
        if (doc) {
          resolve({ ...doc.dataValues });
        } else {
          reject({ error: "User Not Found" });
        }
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
};
const LoginUser = async (req, res, next) => {
  FindUserbyEmail(req.body.email)
    .then((data) => {
      AuthenticatePassword(req.body.password, data.password)
        .then(() => {
          GenerateToken(req.body.email, "user", data.id)
            .then((token) => {
              res
                .status(200)
                .cookie("session_token", token)
                .json({ message: "User logged in successfully" });
            })
            .catch((err) => res.status(400).json({ message: err }));
        })
        .catch((err) => {
          res.status(404).json({ message: err });
        });
    })
    .catch((err) => {
      res.status(505).json({ message: err });
    });
};

module.exports = {
  NewUser,
  LoginUser,
  FindUserbyEmail,
  FindUserbyAttachedEmail,
  updateUser,
};
