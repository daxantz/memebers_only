const { connect } = require("../db/pool");
const db = require("../db/queries");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.signUpFrom = (req, res) => {
  res.render("signUpForm");
};

exports.createUserPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("validation error");
      return res.status(400).send({ errors: errors.array() });
    }

    const { first_name, last_name, email, password, isMember } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    await db.insertUser(first_name, last_name, email, hashedPass, isMember);
    console.log(req.body);
    res.redirect("/login");
  } catch (error) {
    res.redirect("/sign-up");
  }
};
