const passport = require("passport");

const checkAuth = {
  jwt: (req, res, next) =>
    passport.authenticate("jwt", {session: false}, async (err, user) => {
      if (err || !user) {
        return new Error("404");
      }
      req.user = user;
      return next();
    })(req, res, next),
};

module.exports = checkAuth;
