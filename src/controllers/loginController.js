const db = require("../db/queries");

exports.loginFormGet = (req, res) => {
  res.render("login");
};

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated) {
    res.redirect("/");
  }
  next();
}

exports.loginPut = (req, res) => {};
