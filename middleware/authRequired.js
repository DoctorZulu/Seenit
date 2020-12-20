module.exports = function(req,res,next){
    // if a user sesssion exists continue
    // if not redirect to login
    if(req.session.currentUser){
      next();
    } else {
      res.redirect("/login");
    }
  } 