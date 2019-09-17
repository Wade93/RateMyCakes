const mongoose = require('mongoose');

const CakeSchema = new mongoose.Schema({
    baker_name: {type: String, required: [true, "Please enter your name."]},
    image: {type: String, required: [true, "Please include an image of your cake."]},
    ratings: {type: Array},
    comments: {type: Array}
  }, {timestamps: true})

module.exports = mongoose.model('Cake', CakeSchema);