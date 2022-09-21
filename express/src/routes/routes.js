module.exports = (express, app) => {
  const userController = require("../controllers/user.controller.js");
  const router = express.Router();

  // Add routes to server.
  app.use("/api/posts", router);

  app.route("/user").get(userController.all).post(userController.create);

  // Select a single user with id.
  app.get("/user/select/:id", userController.one);

  // Select one user from the database if username and password are a match.
  app.get("/user/login", userController.login);
};
