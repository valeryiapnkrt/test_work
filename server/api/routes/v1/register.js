const express = require("express");
const router = express.Router();
const {check} = require('express-validator')

const Register = require("../../controllers/Register");

router.post("/", [
  check('login','Минимльная длина логина 5 символов').not().isEmpty().isLength({min: 5}),
  check('password', 'Минимальная длина пароля 6 символов').not().isEmpty().isLength({ min: 6 }),
], Register.reg);

module.exports = router;
