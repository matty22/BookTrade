
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define book schema
var bookSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  owner: {
    type: String
  }
});

// Create Book model using book schema
var Books = mongoose.model('Book', bookSchema);

// Make this available outside this module
module.exports = Books;