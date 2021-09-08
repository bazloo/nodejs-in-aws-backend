const { headers } = require('../config.json');
const { client } = require('../helpers/databaseConnection');
const { selectAllProducts } = require('../helpers/queries');
module.exports.getProducts = async (event) => {
    client.connect();
    let allProducts;
    try {
        allProducts = await client.query(selectAllProducts());
    } catch (e) {
        return {
            statusCode: e.code,
            headers,
            body: JSON.stringify(e.message)
        };
    } finally {
        client.end();
    }

    return {
        statusCode: 200,
        headers,
        body: JSON.stringify(allProducts.rows)
    };
};
