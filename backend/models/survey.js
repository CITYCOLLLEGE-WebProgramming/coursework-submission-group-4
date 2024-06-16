const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  q1: String,
  q2: String,
  q3: String,
  r1: Boolean,
  r2: Boolean,
  r3: Boolean,
  r4: Boolean,
  feedback: String
});

const Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;
