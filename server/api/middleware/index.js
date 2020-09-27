const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");

const routes = require("../routes");

const corsOptions = {
  exposedHeaders: ["Content-Disposition", "Filename"],
  preflightContinue: false,
};

const middleware = (app) => {
  app.use(bodyParser.json({limit: "20mb", parameterLimit: 10000}));
  app.use(cookieParser());
  app.use(cors(corsOptions));
  require("./passport");
  app.use(passport.initialize());
  routes(app);
};

module.exports = middleware;
