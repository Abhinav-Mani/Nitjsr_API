const route = require("express").Router();
const userController = require("../Controller/Users")

route.post("/new",userController.ADD_TEACHER);
route.post("/",userController.SIGN_IN);

module.exports = route;