const express = require ("express");
const router = express.Router();
const db = require("../models");


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

  router.get("/:category", async function(req,res){

  
    try {
      const allPosts = await db.Post.find({category: req.params.category}); //regex needed to filter by category?
  
      const context = {post: allPosts}
      return res.render("posts/index", context);
  
    } catch(err) {
      return res.send(err);
    }
  
  });

  router.get("/new", function(req,res){
    res.render("posts/new");
  });

  router.get("/:id", async function(req,res){

    try {
      const foundPost = await db.Post.findById(req.params.id).populate("posts");
  
      const context = { post: foundPost };
      return res.render("posts/show", context);
  
    } catch(err) {
      return res.send(err);
    }
  
  });