const { Router } = require("express");
const router = Router();

router.get("/", checkAuthenticated, (req, res) => {
  console.log(req.user);
  res.render("index", { name: req.user.first_name });
});
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}
module.exports = router;
