const { where } = require("sequelize");
const { post: Post } = require("../sequelize/models");
const { comment: Comment } = require("../sequelize/models");
const { user: User } = require("../sequelize/models");
const { reaction: Reaction } = require("../sequelize/models");

const createPost = (req, res, next) => {
  Post.create({
    img: req.body.img,
    text: req.body.text,
    userId: req.userId,
    updatedAt: new Date(),
    createdAt: new Date(),
  })
    .then((data) => {
      res.status(200).json({ message: "Post Created", data: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ error: err });
    });
};
const createComment = (req, res, next) => {
  console.log(req.body);
  Comment.create({
    text: req.body.text,
    postId: req.body.postId,
    userId: req.userId,
    updatedAt: new Date(),
    createdAt: new Date(),
  })
    .then((data) => {
      res.status(200).json({ message: "Comment Created", data: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ error: err });
    });
};
const createReaction = (req, res, next) => {
  const values = {
    type: req.body.type,
    postId: req.body.postId,
    userId: req.userId,
    updatedAt: new Date(),
    createdAt: new Date(),
  };
  console.log(req.body);
  Reaction.findOne({ where: { userId: req.userId, postId: req.body.postId } })
    .then((data) => {
      if (data) {
        Reaction.update(values, {
          where: { userId: req.userId, postId: req.body.postId },
        })
          .then((data) => {
            res.status(200).json({ message: "Reaction Updated", data: data });
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

const allPost = (req, res, next) => {
  console.log(req.body);
  Post.findAll({
    where: { userId: req.userId },
    include: [
      {
        model: Comment,
        as: "comments",
        attributes: ["text"],
        include: [{ model: User, as: "user", attributes: ["username"] }],
      },
      {
        model: User,
        attributes: ["username"],
        include: [
          {
            model: Reaction,
            as: "reactions",
            attributes: ["type", "postId"],
          },
        ],
      },
    ],
  })
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        res.status(200).json({ message: "Post Found", data: data });
      } else {
        res.status(400).json({ error: "Post Not Found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};
const allComments = (req, res, next) => {
  console.log(req.body);
  Comment.findAll({
    where: { postId: req.body.postId },
  })
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json({ message: "Comment Found", data: data });
      } else {
        res.status(400).json({ error: "Comment Not Found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};
const deleteAllPost = (req, res, next) => {
  Post.destroy({ where: { userId: req.userId } })
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json({ message: "Posts Delted" });
      } else {
        res.status(400).json({ error: "Post Not Found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

module.exports = {
  createPost,
  allPost,
  deleteAllPost,
  allComments,
  createComment,
  createReaction,
};
