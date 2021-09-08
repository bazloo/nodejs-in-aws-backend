const { headers } = require('../config.json');
const { client } = require('../helpers/databaseConnection');
const LIVR = require('livr');
const { insertProduct } = require('../helpers/queries');

module.exports.postProduct = async (event) => {
    const validator = new LIVR.Validator({
        title: ['required', 'string', { length_between: [ 2, 360 ]}],
        description: ['string', {max_length: 260}],
        price: ['required', 'positive_integer'],
        count: ['required', 'positive_integer'],
    });
    const body = JSON.parse(event.body);
    const validData = validator.validate(body);

    if (validData) {
        const { title, description, price, count } = validData;
        client.connect();
        try {
            await client.query(insertProduct(title, description, price, count));
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
            body: JSON.stringify({
                message: 'The product has been added',
                product: event.body
            })
        };

    } else {
        console.log(validator.getErrors());
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
                message: validator.getErrors(),
            })
        };
    }

};