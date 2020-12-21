
const mongoose = require("mongoose");


const dbUrl = "mongodb+srv://Lamsauce:S91183s91183@sei.my3su.mongodb.net/SEI?retryWrites=true&w=majority";


mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true,
  useFindAndModify: false
})
.then(function(){
  console.log("Mongodb connected");
})
.catch(function(error){
  console.log("Mongodb error");
  console.log(error);
});


mongoose.connection.on("disconnected", function(){
  console.log("Mongodb disconnected");
});



module.exports = {
  Author: require("./Author"),
  Post: require("./Post"),
 
};
