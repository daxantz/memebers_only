const { Router } = require("express");
const auth = require("../validators/authFunctions");
const router = Router();
const joinContoller = require("../controllers/join");
router.get("/join", auth.checkAuthenticated, joinContoller.joinFormGet);
router.patch(
  "/join/submit",
  auth.checkAuthenticated,
  joinContoller.setMemberStatusPut
);

module.exports = router;
