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

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

  res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.username);

  if (
    user === null ||
    (await argon2.verify(user.password_hash, req.query.password)) === false
  )
    // Login failed.
    res.json(null);
  else res.json(user);
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
