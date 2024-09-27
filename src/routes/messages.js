const { Router } = require("express");
const router = Router();
const messagesController = require("../controllers/messages");

router.get("/create-message", messagesController.createMessageFormGet);
router.post("/create-message", messagesController.createMessagePut);
module.exports = router;
