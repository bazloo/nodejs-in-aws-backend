'use strict';
const allProducts = require('./fakeDB.json');
module.exports.getAllProducts = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(allProducts)
  };
};
