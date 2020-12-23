const express = require ("express");
const router = express.Router();
const db = require("../models");
//const { post } = require("./auth");
const authRequired = require("../middleware/authRequired")




 

// all category index
router.get("/", async function(req,res){

    try {
      const allPosts = await db.Post.find({});
      console.log(allPosts);
      
      console.log(req.session, "post/index")
  
      const context = {post: allPosts}
      return res.render("posts/index", context);
  
    } catch(err) {
      return res.send(err);
    }
  
  });

 
//category index route
 router.get("/category", function(req,res){
  console.log(req.query)
  db.Post.find({category: req.query.category},function(err, foundData){
    console.log(req.query.category)
    if (err) return res.send(err);
      
      const context = { post: foundData};
      return res.render("posts/category/index", context);
  })
})

  router.get("/new", authRequired, function(req,res){
    res.render("posts/new");
  });

  // Article show

  router.get("/:id", authRequired, async function(req,res){

    try {
      const foundPost = await db.Post.findById(req.params.id).populate("comments author").populate("comments.commentauthor");
      console.log(foundPost)
      //const foundComments = await db.Post.
      const context = { post: foundPost };
      return res.render("posts/show", context);
  
    } catch(err) {
      return res.send(err);
    }
  
  });

  router.post("/", authRequired, async function(req,res){
  
  
    try {
      req.body.author = req.session.currentUser.id
      console.log(req.session.currentUser);
      await db.Post.create(req.body);
      return res.redirect("/posts");
    } catch(err){
      console.log(err);
      return res.send(err);
    }
  
  });
// Edit
router.get("/:id/edit", authRequired,  function(req,res){
    db.Post.findById(req.params.id, function (err, foundPost) {
        if (err) return res.send(err);
      
        const context = { post: foundPost };
        return res.render("posts/edit", context);
    });
  
  });

  router.put("/:id", authRequired, function(req,res){
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
        
        return res.redirect(`/posts/${updatedPost._id}`);
      }
    );
  });

  router.delete("/:id", authRequired, async function(req,res){

  
    try {
  
      await db.Post.findByIdAndDelete(req.params.id);
      return res.redirect("/posts");
  
    } catch (err) {
      return res.send(err);
    }
  });

  //comment  routes

  // Create comment

 

  router.get("/:id/comments/new", authRequired, function(req,res){

    db.Post.findById(req.params.id, function (err, foundPost) {
      if (err) return res.send(err);
      const context = { post: foundPost };
      //db.Post.comments.push(foundComment)
      return res.render("posts/newcomment", context);
    });

});

router.post("/:id/comments", authRequired, function(req, res){
  db.Post.findById(req.params.id, function (err, foundPost) {
    req.body.commentauthor = req.session.currentUser.id
    foundPost.comments.push(req.body);
    foundPost.save();
    return res.redirect(`/posts/${foundPost._id}`);
    

  });
  
});

router.put("/:id", authRequired, function(req,res){
  db.Post.findByIdAndUpdate(
    req.params.id, 
    {
      $set: {
        ...req.body
      }
    }, 
    { new: true }, 
    function (err,updatedComment) {

      if (err) return res.send(err);
      
      
      return res.redirect(`/posts/${updatedComment._id}`);
    }
  );
});
  
/*router.get("/new/comments", function(req,res){
  res.render("posts/newcomment");
});
*/
  
  module.exports = router;