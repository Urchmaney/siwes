const { Schema, model, Types } = require('mongoose');

const placementRequest = new Schema({
  student: { type: Types.ObjectId, ref: 'students', required: true },
  year: { type: Number, required: true },
  department: { type: String, required: true },
  state: { type: String, required: true },
}, { timestamps: true });
placementRequest.index({ year: 1, student: 1 }, { unique: true });

module.exports = model('placementRequests', placementRequest);