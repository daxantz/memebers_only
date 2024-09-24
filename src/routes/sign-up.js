const { Router } = require("express");
const signUpController = require("../controllers/signUpController");
const validateUser = require("../validators/signUpValidator");
const signUpRouter = Router();

signUpRouter.get("/sign-up", signUpController.signUpFrom);

signUpRouter.post(
  "/sign-up",
  validateUser.validateUser, //validateUser contains validation checks for all of the req.body fields
  signUpController.createUserPost
);

module.exports = signUpRouter;
