const { Schema, model } = require('mongoose');

const Company = new Schema({
  name: { type: String, required: true },
  image: { type: String },
}, { timestamps: true });

module.exports = model('companies', Company);