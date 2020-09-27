const apiRoutes = require("./v1");

const routes = app => {
  app.use("/api/v1", apiRoutes);
};

module.exports = routes;