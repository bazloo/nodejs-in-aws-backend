function selectAllProducts () {
    return `SELECT * FROM products 
            JOIN stock ON id = product_id`
}

function selectProductById(id) {
    return `SELECT id, title, description, price, count 
    FROM products 
    JOIN stock ON id = product_id WHERE id='${id}'`
}

function insertProduct (title, description, price, count) {
    return `INSERT INTO products (title, description, price)
            VALUES ('${title}', '${description}', ${price});
            INSERT INTO stock (product_id, count)
            VALUES ((SELECT id FROM products WHERE title='${title}'), ${count});`
}

module.exports = {
    selectAllProducts,
    selectProductById,
    insertProduct
}