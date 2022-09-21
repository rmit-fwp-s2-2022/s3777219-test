const db = require("../database");
const argon2 = require("argon2");
const { where } = require("sequelize");

// Select all users from the database.
exports.all = async (req, res) => {
  try {
    let user = null;
    if (req.query.email !== undefined) {
      user = await db.user.findOne({
        where: { email: req.query.email },
      });
    } else {
      user = await db.user.findAll();
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
exports.createUser = async (req, res) => {
  try {
    // Find existing user in the database
    const user = await db.user.findOne({
      where: { email: req.body.email },
    });
    console.log("the user is: ", user);
    if (user) {
      return res
        .status(400)
        .json("Sorry, the credential already exists in the database.");
    } else {
      const hash = await argon2.hash(req.body.password, {
        type: argon2.argon2id,
      });
      const newUser = await db.user.create({
        username: req.body.username,
        password_hash: hash,
        email: req.body.email,
      });
      res.json(newUser);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400).json("error");
  }
};
// Select one user from the database.
exports.getUserById = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.id);

    res.json(user);
  } catch (err) {
    res.sendStatus(400).json("error");
  }
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findOne({ where: { email: req.body.email } });

  if (user) {
    if (await argon2.verify(user.password_hash, req.body.password)) {
      res.json(user);
    } else {
      // Login failed.
      console.log("password does not match");
      res.json(null);
    }
  } else {
    // Login failed.
    console.log("user does not exist");
    res.json(null);
  }
  // if (
  //   user === null ||
  //   (await argon2.verify(user.password_hash, req.body.password)) === false
  // )
};

// Create a user in the database.
exports.create = async (req, res) => {
  try {
    const hash = await argon2.hash(req.body.password, {
      type: argon2.argon2id,
    });

    const user = await db.user.create({
      username: req.body.username,
      password_hash: hash,
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      email: req.body.email,
    });

    res.json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
