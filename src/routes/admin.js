const { Router } = require("express");
const adminRouter = Router();
const auth = require("../validators/authFunctions");
const adminController = require("../controllers/admin");

adminRouter.get(
  "/admin",
  auth.checkAuthenticated,
  adminController.AdminFormGet
);

adminRouter.patch(
  "/admin",
  auth.checkAuthenticated,
  adminController.setAdminStatusPut
);

module.exports = adminRouter;
