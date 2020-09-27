const passport = require("passport");
const {Strategy: JwtStrategy, ExtractJwt} = require("passport-jwt");
const {User} = require("../models");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findOne({login: payload.login});
        if (user) done(null, user);
        else done(null, false);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
