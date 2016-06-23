/* eslint-disable no-underscore-dangle */
import Priority from '../models/priority';
const dateFormat = require('dateformat');


function TaskView(jsonObject) {
  const priorityModel = Priority.find(jsonObject.priority);
  this.id = jsonObject._id;
  this.name = jsonObject.name;
  this.dueDate = jsonObject.dueDate;
  this.priority = jsonObject.priority;
  this.category = jsonObject.category;
  this.isComplete = jsonObject.isComplete;
  this.priorityColor = priorityModel.color;
  this.priorityName = priorityModel.name;
  this.creationDate = jsonObject.creationDate;
}

module.exports = TaskView;
