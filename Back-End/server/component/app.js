function app() {
  // init public path for server
  // init app
  const cors = require("cors");
  const express = require('express');
  const app = express();
  const path = require('path');
  const publicPath = path.join(__dirname, "../../public/");
  app.use(express.static(publicPath));
  console.log(publicPath);
  // app.use(express.static("."));
  app.use(express.json());
  app.use(cors({
    origin: '*',
  }));
  return app;
}
module.exports = app();