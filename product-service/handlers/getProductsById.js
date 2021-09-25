const { client } = require('../helpers/databaseConnection');
const { headers } = require('../config.json');
const { selectProductById } = require('../helpers/queries');

module.exports.getProductsById = async (event) => {
  console.log(event);
  const { productId } = event.pathParameters || '';
  let product;
  client.connect();
  try {
      product = await client.query(selectProductById(productId));
  } catch (e) {
      return {
          statusCode: 500,
          headers,
          body: JSON.stringify({
              message: 'Server error'
          })
      }
  } finally {
      client.end()
  };

  if(!product){
      return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
              message: 'Product not found'
          })
      }
  } else {
      return {
          statusCode: 200,
          headers,
          body: JSON.stringify(product.rows)
      };
  };

};
