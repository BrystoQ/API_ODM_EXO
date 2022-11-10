module.exports = (server) => {
  const userController = require("../controllers/userController");

  server.post("/user/register", userController.userRegister);
  server.post("/user/login", userController.loginRegister);
  server.put("/user/roles/:user_id", userController.roleUser);
  server.get("/users", userController.getUsers);
};
