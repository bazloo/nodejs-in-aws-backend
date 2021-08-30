'use strict';

const fetchProducts = require('../helpers/fetchProducts');
const { headers } = require('../config.json');

module.exports.getProducts = async (event) => {
  let allProducts;
  try {
    allProducts = await fetchProducts();
  } catch (e) {
    return {
      statusCode: e.code,
      headers,
      body: JSON.stringify(e.message)
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(allProducts)
  };
};
