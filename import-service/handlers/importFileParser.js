const AWS = require('aws-sdk');
const s3 = new AWS.S3({region: 'eu-west-1'});
const CSV = require('csv-parser');
const Bucket = 'vedro-for-import-practice';

module.exports.fileParser = async (event) => {
    console.log('EventInfo:', event);
    const Key = event.Records[0].s3.object.key;
    console.log('Key:', Key);
    const params = {
        Bucket,
        Key: Key
    };
    console.log('Params:', params);
    try {
        const readFileStream = await new Promise((resolve, reject) => {
            const s3Stream = s3.getObject(params).createReadStream();
            s3Stream
                .pipe(CSV())
                .on('data', (data) => {
                    console.log('Parsed-data:', JSON.stringify(data));
                })
                .on('error', (error) => {
                    reject('error');
                    throw error;
                })
                .on('end', async () => {
                    await s3.copyObject({
                        Bucket: Bucket,
                        CopySource: `${Bucket}/${Key}`,
                        Key: Key.replace('uploaded', 'parsed')
                    }).promise();

                    console.log('Object removed to "parsed" folder: DONE');

                    await s3.deleteObject({
                        Bucket: Bucket,
                        Key: key,
                    }).promise();

                    console.log('Object deleted from "uploaded" folder: DONE');

                    resolve('FILE RECEIVED');
                });
        });
        console.log(readFileStream);
    } catch (e) {
        console.error(e);
    }
};
