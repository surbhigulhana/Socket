var mongoose = require("mongoose");

const schema3 = new mongoose.Schema({
 
 
  Pname: {
    type: String,   

  },
  Price:{
    type:String
  },
  filename:{
    type:String
  }
  
});

const Product = new mongoose.model("Product", schema3);

module.exports = Product;