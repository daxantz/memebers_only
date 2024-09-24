const { Router } = require("express");
const loginController = require("../controllers/loginController");
const validateUser = require("../validators/signUpValidator");
const loginRouter = Router();
const passport = require("passport");

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

loginRouter.delete("/logout", (req, res) => {
  console.log(`logging ${req.user.first_name} out`);
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    res.redirect("/login");
  });
});

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

module.exports = loginRouter;
