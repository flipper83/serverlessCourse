const AWS = require("aws-sdk");

const tableName = process.env.getTogethersTableName;

exports.handler = async (event, context) => {
    AWS.config.region = "eu-west-1";
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const req = {
        TableName: tableName,
        Limit: 8
    };

    const resp = await dynamodb.scan(req).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify(resp.Items)
    };
    return response;
};