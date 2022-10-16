const { where } = require("sequelize");
const { reaction: Reaction } = require("../sequelize/models");

const createReaction = (req, res, next) => {
  Reaction.create({
    img: req.body.img,
    text: req.body.text,
    userId: req.body.userId,
    updatedAt: new Date(),
    createdAt: new Date(),
  })
    .then((data) => {
      res.status(200).json({ message: "Reaction Created", data: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(505).json({ message: err });
    });
};

const allReaction = (req, res, next) => {
  Reaction.findAll()
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json({ message: "Reaction Found", data: data });
      } else {
        res.status(400).json({ message: "Reaction Not Found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

module.exports = {
  createReaction,
  allReaction,
};
