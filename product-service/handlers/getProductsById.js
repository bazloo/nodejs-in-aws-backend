const fetchProducts = require('../helpers/fetchProducts');
const { headers } = require('../config.json');

function findProductsById(products, id){
    return products.filter(product => product.id === id);
}

getProductsById = async (event) => {
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

module.exports = {
    findProductsById,
    getProductsById
};
