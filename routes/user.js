const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { verify, verifyAdmin } = require("../auth");

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/details", verify, userController.getProfile);
router.patch("/:id/set-as-admin", verify, verifyAdmin, userController.setAsAdmin);
router.patch("/update-password", verify, userController.updatePassword);

module.exports = router;

