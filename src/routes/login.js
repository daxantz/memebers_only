const { Router } = require("express");
const loginController = require("../controllers/loginController");
const validateUser = require("../validators/signUpValidator");
const loginRouter = Router();
const passport = require("passport");
const checkNotAuthenticated =
  require("../validators/authFunctions").checkNotAuthenticated;
const checkAuthenticated =
  require("../validators/authFunctions").checkAuthenticated;

loginRouter.get("/login", checkNotAuthenticated, loginController.loginFormGet);
loginRouter.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

loginRouter.delete("/logout", checkAuthenticated, (req, res) => {
  console.log(`logging ${req.user.first_name} out`);
  if (!req.user) return res.redirect("/");
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    res.redirect("/login");
  });
});

module.exports = loginRouter;
