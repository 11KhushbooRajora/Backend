const mongoose = require("mongoose")

const youtube =  new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
        content:{
        type: String,
    },
        category:{
        type: String,
       enum:['Personal', 'Work', 'Study', 'Ideas', 'Journal', 'Other']
    },
        tag:[{
        type: String,
    }],
     
},
{
    timestamps: true,
});

const youtuber = mongoose.model("Youtuber", youtube);
module.exports = youtuber;