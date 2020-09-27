const response = require('../utils/response');
const models = require('../models');
const {validationResult} = require('express-validator')

const Register = {
  async reg(req, res) {
    console.log(req, 'req')
    try {
      const errors = validationResult(req)
      console.log(errors, 'errors')

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        })
      }
      const {login, password} = req.body;

      const candidate = await models.User.findOne({ login })
      if (candidate) {
        return res.status(400).json({ message: 'Пользователь с таким логином уже существует'})

      }

      await models.User.add(login, password);
      response.message(res, "Пользователь зарегистрирован!");
    } catch (err) {
      response.error(res, "Введите логин и пароль");
    }
  },
}

module.exports = Register;
