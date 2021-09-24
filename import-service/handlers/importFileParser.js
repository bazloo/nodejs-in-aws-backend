const AWS = require('aws-sdk');
const s3 = new AWS.S3({region: 'eu-west-1'});

module.exports.fileParser = async (event) => {
    console.log(event);

    const params = {
        Bucket: 'vedro-for-import-practice',
        Key: ''
    };

    const s3Stream = s3.getObject(params).createReadStream();
    s3Stream
        .on('data', (data) => {})
        .on('error', (error) => {})
        .on('end', () => {});


    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: 'The file successfully uploaded!',
            },
            null,
            2
        ),
    };

};
