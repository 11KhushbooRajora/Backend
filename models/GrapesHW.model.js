const mongoose = require("mongoose");

const grapeSchema = new mongoose.Schema({
    ImageUrl: {
        type: String,
        require: true,
    },
     picture: {
        type: String,
        require: true,
    },
     discription: {
        type: String,
        require: true,
    },
     calories: {
        type: Number,
        require: true,
    },
     carbohydrates: {
        type: Number,
        require: true,
    },
     protein: {
        type: Number,
        require: true,
    },
     fat: {
        type: Number,
        require: true,
    }
})

const grape = mongoose.model("Grape Page", grapeSchema);
module.export = grape;