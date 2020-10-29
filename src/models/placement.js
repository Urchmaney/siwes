const { Schema, model, Types } = require('mongoose');

const Placement = new Schema({
  company: { type: Types.ObjectId, required: true, ref: 'companies'},
  year: { type: Number, required: true },
  students: [{ type:Types.ObjectId }],
});

module.exports = model('placements', Placement);
