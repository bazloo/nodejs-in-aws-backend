const axios = require('axios');
const { fakeDB } = require('../config.json');

async function fetchProducts() {
    const allProducts = await axios.get(fakeDB);
    return allProducts.data;
}

module.exports = fetchProducts;