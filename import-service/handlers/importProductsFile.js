const AWS = require('aws-sdk');
const s3 = new AWS.S3({region: 'eu-west-1'});
const BUCKET = 'vedro-for-import-practice';

module.exports.importProducts = async (event) => {
    console.log(event.pathParameters);
    const {fileName} = event.pathParameters || '';
    const uploadParams = {
        Bucket: BUCKET,
        Key: `uploaded/${fileName}`,
        Expires: 60,
        ContentType: 'text/csv'
    };
    let signedUrl;
    try {
        signedUrl = await new Promise((resolve, reject) => {
            return s3.getSignedUrl('putObject', uploadParams, (error, url) => {
                if (error) {
                    reject(error);
                }
                resolve(url);
            });
        })
    } catch (e) {
        return {
            statusCode: 200,
            body: JSON.stringify(
                {
                    error: e || 'Can not get signet url'
                },
                null,
                2
            ),
        };
    }
    console.log(signedUrl);
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(
            {
                url: signedUrl
            },
            null,
            2
        ),
    };
};
