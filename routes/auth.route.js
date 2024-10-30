const express = require("express");
const router = express.Router();

const {
  signin,
  signup,
  checkToken,
} = require("../controllers/auth.controller");

router.route("/register").post(signup);
router.route("/check-token").post(checkToken);
router.route("/login").post(signin);

module.exports = router;
