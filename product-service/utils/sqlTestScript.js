const { Client } = require('pg');
async function fillDatabaseWithTestProducts (productsAmount) {
    const title = 'title';
    const description = 'description';
    const price = Math.floor(Math.random() * 11);
    const count = Math.floor(Math.random() * 11);

    const queries = []

    for (let i = 0; i < productsAmount; i++) {
        let dbQuery = client.query(
                `INSERT INTO products (title, description, price)
                VALUES ('title #${i}', 'description #${i}', ${price});
                INSERT INTO stock (product_id, count)
                VALUES ((SELECT id FROM products WHERE title='title #${i}'), ${count});`
        )
        queries.push(dbQuery);
    }
    client.connect();
    Promise.all(queries)
        .then(res => console.log('DATABASE WAS FILLED...'))
        .catch(err => console.error(err.message))

}

