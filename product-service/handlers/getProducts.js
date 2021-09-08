const { headers } = require('../config.json');
const { client } = require('../helpers/databaseConnection');

module.exports.getProducts = async (event) => {
  client.connect();
  let allProducts;
  try {
    allProducts = await client.query('SELECT id, title, description, price, count FROM products JOIN stock ON id = product_id');
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
    body: JSON.stringify(allProducts.rows)
  };
};
