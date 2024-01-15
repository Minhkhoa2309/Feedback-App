const express = require("express");
const routes = require("../routes");
const bodyParser = require('body-parser');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(bodyParser.json());

  routes(app);

  return app;
}

module.exports = createServer;
