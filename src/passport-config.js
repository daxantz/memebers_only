const { authenticate } = require("passport");
const db = require("./db/queries");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = await db.getUserByEmail(email);
    console.log("Trying to authenticate:", email);
    if (user == null) {
      return done(null, false, { message: "no user with that email" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        console.log("Password matched");
        return done(null, user);
      } else {
        console.log("Password incorrect");
        return done(null, false, { message: "Password Incorrect" });
      }
    } catch (error) {
      console.error("Error during password comparison:", error);
      return done(error);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.getUserById(id);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

module.exports = initialize;
