module.exports = (express, app) => {
  const userController = require("../controllers/user.controller.js");
  const router = express.Router();

  // Add routes to server.
  app.use("/api/users", router);

  // router.route("/user").get(userController.all).post(userController.create);
  // Create user
  router.post("/createUser", userController.createUser);

  // Select one user from the database if username and password are a match.
  router.post("/login", userController.login);

  // Select a single user with id.
  router.get("/getUserById/:id", userController.getUserById);
};
