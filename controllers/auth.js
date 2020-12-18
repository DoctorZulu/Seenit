const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../models");






router.get("/register", function(req,res){
  res.render("auth/register");
});




router.post("/register", async function(req,res){
 

  try {

    

    const foundUser = await db.User.findOne({ email: req.body.email });

    if (foundUser) return res.redirect("/login");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt)
    req.body.password = hash;
    const newUser = await db.User.create(req.body);

    return res.redirect("/login");

  } catch(err) {
    return res.send(err);
  }

});


router.get("/login", function(req,res){
  res.render("auth/login", {message: "Welcome!"});
});



router.post("/login", async function(req, res){
  // logic to check if user exists in database

  try {
    const foundUser = await db.User.findOne({ email: req.body.email });

    if(!foundUser) return res.render("auth/login", {message: "Account Not Found. Please try again or register if new."});

    const match = await bcrypt.compare(req.body.password, foundUser.password);

    if(!match) return res.render("auth/login", {message: "Invalid login, please try again"});

    // create our user on the session
    req.session.currentUser = {
      id: foundUser._id,
      username: foundUser.username
    }

    res.redirect("/");

  } catch(err) {
    return res.send(err);
  }


});


// delete to log out of current session

router.delete("/logout", async function(req,res){
  await req.session.destroy();
  res.redirect("/");
});



module.exports = router;