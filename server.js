const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const controllers = require("./controllers");

const app = express();

const PORT = 4000;
app.set("view engine", "ejs");
app.listen(PORT, function(){
    console.log(`Blog Application is live at http://localhost:${PORT}/`)
  });