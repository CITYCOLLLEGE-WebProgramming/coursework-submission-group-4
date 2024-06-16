// backend/models/Item.js
const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  owner: String,//to-do: change to userid when schema is complete
  createdAt: { type: Date, default: Date.now },
  photo: String,//save filename or path. The photo is uploaded in the uploads folder
  condition: {
    type: String,
    required: true,
    enum: ['new', 'lightly used', 'used', 'damaged'],
    default: 'used'
  },
  category: {
    type: String,
    required: true,
    enum: ['technology', 'hobby', 'home_garden', 'health_beauty', 'prof_b2b', 'books', 'fashion', 'babies_newborns', 'automotive']
  }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
