require("dotenv").config();

const express = require("express");
const path = require("path");
const db = require("./src/db/queries.js");
const app = express();
const initializePassport = require("./src/passport-config.js");
const session = require("express-session");
const methodOverride = require("method-override");

const signUpRouter = require("./src/routes/sign-up.js");
const loginRouter = require("./src/routes/login.js");
const indexRouter = require("./src/routes/index.js");
const passport = require("passport");
const flash = require("express-flash");

initializePassport(passport);
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(signUpRouter);
app.use(loginRouter);
app.use(indexRouter);

app.listen(3000, (req, res) => {
  console.log("Server running on port 3000");
});
