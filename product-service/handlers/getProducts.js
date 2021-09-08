'use strict';
const { Client } = require('pg');
// const fetchProducts = require('../helpers/fetchProducts');
const { headers } = require('../config.json');
const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
const dbOptions = {
  host:PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
};

module.exports.getProducts = async (event) => {
  const client = new Client(dbOptions);
  await client.connect();
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
