function findProductsById(products, id){
    return products.filter(product => product.id === id);
}

module.exports = findProductsById;