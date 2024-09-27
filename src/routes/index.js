const { Router } = require("express");
const router = Router();
const db = require("../db/queries");
const checkAuthenticated =
  require("../validators/authFunctions").checkAuthenticated;
router.get("/", checkAuthenticated, async (req, res) => {
  try {
    console.log(req.user);
    const messages = await db.getMemberMessages();

    res.render("index", {
      name: req.user.first_name,
      id: req.user.id,
      messages: messages,
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
