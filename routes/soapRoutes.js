const userController = require("../controllers/userController");
console.log("entro");
const userService = {
  UserService: {
    UserSoap: {
      AddUser: userController.addUser,
      DeleteUser: userController.deleteUser,
      GetUser: userController.getUser,
    },
  },
};

module.exports = userService;
