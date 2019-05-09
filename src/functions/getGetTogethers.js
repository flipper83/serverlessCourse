const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
    AWS.config.region = "eu-west-1";
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const req = {
        TableName: "gettogethers",
        Limit: 8
    };

    const resp = await dynamodb.scan(req).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify(resp.Items)
    };
    return response;
};