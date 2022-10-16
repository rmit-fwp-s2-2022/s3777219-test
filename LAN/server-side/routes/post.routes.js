const app = require("express")();
const {
  AuthenticateToken,
  AttachUser,
  AttachEmail,
} = require("../utils/functions");

const {
  createPost,
  allPost,
  deleteAllPost,
  allComments,
  createComment,
  createReaction,
} = require("../Queries/PostQueries");
console.log("Post Routes is working");
app.post("/createpost", AttachEmail, createPost);
app.post("/createcomment", AttachEmail, createComment);
app.post("/createreaction", AttachEmail, createReaction);
app.post("/allposts", AttachEmail, allPost);
app.post("/comments", AttachEmail, allComments);
app.post("/deleteallposts", AuthenticateToken, deleteAllPost);
module.exports = app;
