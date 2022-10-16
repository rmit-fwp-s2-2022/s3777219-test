const app = require("express")();
const { AuthenticateToken, AttachUser } = require("../utils/functions");

const { createPost, allPost } = require("../Queries/PostQueries");
const { allComment } = require("../Queries/CommentQueries");
app.post("/createreaction", AuthenticateToken, allComment);
app.post("/allreactions", AuthenticateToken, allPost);
module.exports = app;
