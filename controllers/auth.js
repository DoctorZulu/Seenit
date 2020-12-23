const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../models");

// What is Auth? 
// Authentication - Who you are
// Authorization - What you can access


//  REGISTER - GET - /register - Presentational Form - will return a form for the user to sign up with an account

router.get("/register", function(req,res){
  res.render("auth/register");
});


// REGISTER - POST - /register - Functional - will take in the body data and create an account

router.post("/register", async function(req,res){
  // check if user already exists 
  // if exists -> error and send them to login
  // if not -> create a user with the given info
  // redirect to login

  try {

    // { $or: [{email: req.body.email},{username: req.body.username}]}

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

//  Login - GET - /login - Presentational Form - will return a form for the user to validate their credentials 

router.get("/login", function(req,res){
  res.render("auth/login", {message: ""});
});

// Verify - POST - /login - Functional - will take in the body data and ensure the credentials are valid

router.post("/login", async function(req, res){
  // check if the user exists 
  // if the user exists
    // validate the user if passwords match -> login 
    // if not match send error
  // if not
    // redirect to register

  try {
    const foundUser = await db.User.findOne({ email: req.body.email });
    console.log(foundUser, "User check")

    if(!foundUser) return res.render("auth/login", {message: "Account Not Found. Please register."});

    const match = await bcrypt.compare(req.body.password, foundUser.password);

    if(!match) return res.render("auth/login", {message: "Password or Email invalid."});

    // create our user on the session
    req.session.currentUser = {
      id: foundUser._id,
      username: foundUser.username
    }

    res.redirect("/posts");

  } catch(err) {
    return res.send(err);
  }


});


// /logout - DELETE - destroy the active session

router.delete("/logout", async function(req,res){
  await req.session.destroy();
  res.redirect("/posts");
});



module.exports = router;