const express = require("express");
const app = express();
require("dotenv").config();
const { connectDB } = require("./db/connection");
app.use(require("cookie-parser")());
const cors = require("cors");
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8080;
connectDB();
app.post("api/post/comments", (req, res) => {
  console.log("req.body", req.body);
  res.send("hello");
});
app.use("/api", require("./routes"));
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
