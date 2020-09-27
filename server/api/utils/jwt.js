const jsonwebtoken = require("jsonwebtoken");

const jwt = {
  async generateTokens(user) {
    const payload = {
      id: user.id,
      name: user.name,
      login: user.login,
      role: user.role,
    };

    const accessToken = jsonwebtoken.sign(payload, process.env.JWT_ACCESS_SECRET);
    const refreshToken = jsonwebtoken.sign({id: user.id}, process.env.JWT_REFRESH_SECRET);
    user.refreshToken = refreshToken;
    user.save();
    return {accessToken, refreshToken};
  },
  async verify(token) {
    try {
      return jsonwebtoken.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      return err;
    }
  }
};

module.exports = jwt;
