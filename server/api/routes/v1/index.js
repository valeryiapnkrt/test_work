const express = require("express");
const router = express.Router();

const register = require("./register");
const auth = require("./auth");
const user = require("./user");

const {jwt} = require("../../middleware/auth");

router.use("/register", register);
router.use("/auth", auth);
router.use("/user", jwt, user);

module.exports = router;
