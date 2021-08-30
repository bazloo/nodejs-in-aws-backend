const fetchProducts = require('../helpers/fetchProducts');
const findProductsById = require('../helpers/findProductsById');
const { headers } = require('../config.json');

module.exports.getProductsById = async (event) => {
  const { productId } = event.pathParameters || '';
  let product;
  try {
      const allProducts = await fetchProducts();
      product = findProductsById(allProducts, productId);
  } catch (e) {
      return {
          statusCode: 500,
          headers,
          body: JSON.stringify({
              message: 'Server error'
          })
      }
  };
  if(!product.length){
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
          body: JSON.stringify(product)
      };
  };

};
