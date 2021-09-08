function selectAllProducts () {
    return `SELECT * FROM products 
            JOIN stock ON id = product_id`
}

function selectProductById(id) {
    return `SELECT id, title, description, price, count 
    FROM products 
    JOIN stock ON id = product_id WHERE id='${id}'`
}

module.exports = {
    selectAllProducts,
    selectProductById
}