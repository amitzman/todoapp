
/* eslint-disable func-names */
const categories = require('../../data/categories');
function Category(name) {
  this.name = name;
}

Category.find = function () {
  return categories;
};
module.exports = Category;
