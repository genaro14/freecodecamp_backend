const mongoose = require ('mongoose');
const { Schema } = mongoose;

const personSchema = new Schema({
  name:  String, // String is shorthand for {type: String}
  age: Number,
  favouriteFoods: [String],
});