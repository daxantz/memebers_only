const db = require("../db/queries");

exports.loginFormGet = (req, res) => {
  res.render("login");
};

exports.loginPut = (req, res) => {};
