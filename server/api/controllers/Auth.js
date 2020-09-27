const response = require('../utils/response');
const models = require('../models');
const jwt = require('../utils/jwt');

const Auth = {
  async login(req, res) {
    try {
      if (!req.body.login || !req.body.password) {
        return response.error(res, "Нет логина или пароля");
      }

      const user = await models.User.findOne({login: req.body.login}).select("+password");

      if (user) {
        const compare = await user.comparePassword(req.body.password);

        if (compare) {
          const {accessToken, refreshToken} = await jwt.generateTokens(user);
          return response.success(res, {accessToken, refreshToken}, "вход");
        }
      }

      response.unauthorized(res, "Неправильный логин или пароль");
    } catch (err) {
      response.error(res, "Ошибка на сервере.\n" + err.message);
    }
  },
};

module.exports = Auth;
