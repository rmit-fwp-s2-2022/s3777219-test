const app = require("express")();
const { AuthenticateToken, AttachUser } = require("../utils/functions");

const { createPost, allPost } = require("../Queries/PostQueries");
app.post("/createcomment", AuthenticateToken, createPost);
app.post("/allcomments", AuthenticateToken, allPost);
module.exports = app;
