const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  bar: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Foo', schema);
