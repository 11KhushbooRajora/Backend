const mongoose = require("mongoose");

const cameraProduct = new mongoose.Schema({
    productUrl:{
        type: String,
        required: true,
    },
     producdescription:{
        type: String,
        required: true,
    },
     Rating:{
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    discountPrice:{
        type:Number,
    },
     producReview:{
        type: String,
        required: true,
    },
       producttitle:{
        type: String,
        required: true,
    },
       productPrice:{
        type: Number,
        required: true,
    },
    stockLeft: {          
    type: Number,
    default: 0,
  },
    
})

const camera =  mongoose.model("Camera", cameraProduct);
module.exports = camera;