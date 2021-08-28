'use strict';

const fetchProducts = require('../helpers/fetchProducts');

module.exports.getProducts = async (event) => {
  let allProducts;
  try {
    allProducts = await fetchProducts();
  } catch (e) {
    return {
      statusCode: e.code,
      body: JSON.stringify(e.message)
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(allProducts)
  };
};
