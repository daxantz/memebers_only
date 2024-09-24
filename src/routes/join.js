const { Router } = require("express");
const auth = require("../validators/authFunctions");
const router = Router();
const joinContoller = require("../controllers/join");
router.get("/join/:id", auth.checkAuthenticated, joinContoller.joinFormGet);
router.patch(
  "/join/:id",
  auth.checkAuthenticated,
  joinContoller.setMemberStatusPut
);

module.exports = router;
