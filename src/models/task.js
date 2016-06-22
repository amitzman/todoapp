/* eslint-disable func-names */
/* eslint-disable no-console */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: String,
  dueDate: Date,
  priority: Number,
  category: String,
  isComplete: { type: Boolean, default: false },
  creationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);
