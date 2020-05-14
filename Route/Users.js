const route = require("express").Router();
const userController = require("../Controller/Users");
const AuthCheck = require("../Util/AuthCheck");

route.post("/new", AuthCheck.IS_AUTHENTICATED  , AuthCheck.IS_ADMIN ,userController.ADD_TEACHER);
route.post("/",userController.SIGN_IN);

module.exports = route;