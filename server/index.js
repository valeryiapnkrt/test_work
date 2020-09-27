require('dotenv').config()

const express = require('express');
const app = express();
const db = require("./api/db");

(async () => {
  await db.connect();
  require("./api/middleware")(app, express);
  app.listen(process.env.PORT, async () => {
    console.log(`TestAPI is up and listening ${process.env.PORT} port.`);
  });
})();

module.exports = app;