const { Router } = require("express");
const router = Router();
const checkAuthenticated =
  require("../validators/authFunctions").checkAuthenticated;
router.get("/", checkAuthenticated, (req, res) => {
  console.log(req.user);
  res.render("index", { name: req.user.first_name, id: req.user.id });
});

module.exports = router;
