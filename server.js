const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const controllers = require("./controllers");

const app = express();

const PORT = 4001;

app.set("view engine", "ejs"); 
/* ==== Middleware ==== */

// server public as static files
// express.static(directory location absolute)
app.use(express.static(__dirname + '/public'));

// body data middleware
app.use(express.urlencoded({ extended: true }));
// method override middleware
app.use(methodOverride("_method"));

// Session
app.use(
  session(
    {
      // set the store to the MongoStore we required
      store: new MongoStore({
        url: "mongodb://localhost:27017/seenit"
      }),
      // our secret is a signature in our sessions to verify that it is valid
      secret: "Lamsauce the Great",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // two weeks
      }
    }
  )
);

app.use(function(req,res,next){
 
  req.session.test = "Test 1234"
  console.log(req.session);
  next();
});

  //auth function

app.use(function(req,res,next){
  app.locals.user =  req.session.currentUser;
  next();
})
  
  
  

app.get("/", function(req, res){
    // .render(file,context)
    // const context = { user: req.session.currentUser }
    res.render("home");
});
  
  // Auth controller
app.use("/", controllers.auth);

//app.use("/authors", controllers.authors);

// article controller
app.use("/posts", controllers.posts);

/* ==== Server Listener  ==== */
app.listen(PORT, function(){
  console.log(`Blog Application is live at http://localhost:${PORT}/`)
});
  