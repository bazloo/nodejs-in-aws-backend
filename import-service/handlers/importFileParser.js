const AWS = require('aws-sdk');
const s3 = new AWS.S3({region: 'eu-west-1'});
const CSV = require('csv-parser');
const Bucket = 'vedro-for-import-practice';

module.exports.fileParser = async (event) => {
    console.log('EventInfo:', event);
    const Key = event.Records[0].s3.object.key;
    console.log('Key:', event);
    const params = {
        Bucket,
        Key: Key
    };
    console.log('Params:', params);
    await new Promise((resolve, reject) => {
        const s3Stream = s3.getObject(params).createReadStream();
        s3Stream
            .on('data', (chunk) => {
                console.log(chunk);
            })
            .on('error', (error) => {
                reject('error');
                throw error;
            })
            .on('end', () => {
                console.log('END')
            });
    });


};
