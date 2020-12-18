const express = require ("express");
const router = express.Router();
const db = require("../models");
const { post } = require("./auth");
//const authRequired = require("./middleware/authRequired");

// all category index
router.get("/", async function(req,res){

  
    try {
      const allPosts = await db.Post.find({});
  
      const context = {post: allPosts}
      return res.render("posts/index", context);
  
    } catch(err) {
      return res.send(err);
    }
  
  });

  // specific category index page

  router.get("/category/:name", async function(req,res){

  
    try {
      const allPosts = await db.Post.find({category: req.params.name}); //regex needed to filter by category?
  
      const context = {post: allPosts}
      return res.render("posts/category/index", context);
  
    } catch(err) {
      
      return res.send(err);
    }
  
  });

  router.get("/new", function(req,res){
    res.render("posts/new");
  });

  // Article show

  router.get("/:id", async function(req,res){

    try {
      const foundPost = await db.Post.findById(req.params.id).populate("posts");
  
      const context = { post: foundPost };
      return res.render("posts/show", context);
  
    } catch(err) {
      return res.send(err);
    }
  
  });

  router.post("/", async function(req,res){
  
  
    try {
      //req.body.createdBy = req.session.currentUser.id
      await db.Post.create(req.body);
      return res.redirect("/posts");
    } catch(err){
      console.log(err);
      return res.send(err);
    }
  
  });

  router.get("/:id/edit", function(req,res){

    db.Post.findById(req.params.id, function (err, foundPost) {
      if (err) return res.send(err);
      
      const context = { post: foundPost };
      return res.render("posts/edit", context);
    });
  
  });

  router.put("/:id", function(req,res){
    db.Post.findByIdAndUpdate(
      req.params.id, 
      {
        $set: {
          ...req.body
        }
      }, 
      { new: true }, 
      function (err,updatedPost) {
  
        if (err) return res.send(err);
        
        return res.redirect(`/authors/${updatedPost._id}`);
      }
    );
  });

  router.delete("/:id", async function(req,res){

  
    try {
  
      await db.Post.findByIdAndDelete(req.params.id);
      return res.redirect("/authors");
  
    } catch (err) {
      return res.send(err);
    }
  });

  //comment  routes

  // Create comment
  router.post("/:id/comment/new", async function(req,res){
   
  
    try {
      req.body.createdBy = req.session.currentUser.id
      await db.Post.create(req.body);
      return res.redirect("/:id");
    } catch(err){
      return res.send(err);
    }
  
  });

  router.get("/:id/comment/edit", function(req,res){

    db.Post.findById(req.params.id, function (err, foundComment) {
      if (err) return res.send(err);
      
      const context = { comment: foundComment };
      return res.render("posts/edit", context);
    });

});
  
router.get("/new/comments", function(req,res){
  res.render("posts/newcomment");
});
  
  module.exports = router;