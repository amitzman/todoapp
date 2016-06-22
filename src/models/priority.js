
/* eslint-disable func-names */
/* eslint-disable no-console */
const priorities = require('../../data/priorities');
function Priority(name, color, value) {
  this.name = name;
  this.color = color;
  this.value = value;
}

Priority.find = function (value) {
  if (!value) {
    return priorities;
  }
  const filteredPriorities = priorities.filter(v => (v.value * 1) === value)[0];
  return filteredPriorities;
};
module.exports = Priority;
