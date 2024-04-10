const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me/:id", authController.protect, authController.getMe);
router.post(
  "/photo",
  authController.protect,
  authController.uploadUserPhoto,
  authController.updateUserPhoto
);

module.exports = router;
