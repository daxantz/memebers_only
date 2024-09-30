const { Router } = require("express");
const router = Router();
const db = require("../db/queries");
const checkAuthenticated =
  require("../validators/authFunctions").checkAuthenticated;
router.get("/", checkAuthenticated, async (req, res) => {
  try {
    console.log(req.user);
    const messages = await db.getMemberMessages();
    //removes '00:00:00 GMT-0400 (Eastern Daylight Time)' from the timestamp string
    const messagesWithDateFormat = messages.map((msg) => {
      const substring = "00:00:00 GMT-0400 (Eastern Daylight Time)";
      const fullTimeStamp = msg.timestamp.toString();
      const subStringIndex = fullTimeStamp.indexOf(substring);

      const formattedStamp = fullTimeStamp.slice(0, subStringIndex);

      return { ...msg, timestamp: formattedStamp };
    });

    res.render("index", {
      name: req.user.first_name,
      id: req.user.id,
      messages: messagesWithDateFormat,
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
