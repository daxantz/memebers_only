const { Router } = require("express");
const signUpController = require("../controllers/signUpController");
const validateUser = require("../validators/signUpValidator");
const signUpRouter = Router();

signUpRouter.get("/sign-up", signUpController.signUpFrom);
signUpRouter.post(
  "/sign-up",
  validateUser.validateUser,
  signUpController.createUserPost
);

module.exports = signUpRouter;
