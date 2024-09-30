const { Router } = require("express");
const router = Router();
const messagesController = require("../controllers/messages");
const auth = require("../validators/authFunctions");

router.get("/create-message", messagesController.createMessageFormGet);
router.post("/create-message", messagesController.createMessagePut);
router.delete(
  "/delete/:id",
  auth.checkAuthenticated,
  messagesController.deleteMessage
);
module.exports = router;
