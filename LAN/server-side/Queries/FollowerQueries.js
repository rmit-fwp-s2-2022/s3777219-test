const { where } = require("sequelize");
const { comment: Comment } = require("../sequelize/models");

const createComment = (req, res, next) => {
  Comment.create({
    img: req.body.img,
    text: req.body.text,
    userId: req.body.userId,
    updatedAt: new Date(),
    createdAt: new Date(),
  })
    .then((data) => {
      res.status(200).json({ message: "Comment Created", data: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(505).json({ message: err });
    });
};

const allComment = (req, res, next) => {
  Comment.findAll()
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json({ message: "Comment Found", data: data });
      } else {
        res.status(400).json({ message: "Comment Not Found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

module.exports = {
  createComment,
  allComment,
};
