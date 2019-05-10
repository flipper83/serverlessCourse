const AWS = require("aws-sdk");
const middy = require("middy");
const { ssm } = require("middy/middlewares");
const log = require("../lib/log");
const captureCorrelationId = require("../middleware/captureCorrelationId");

const tableName = process.env.getTogethersTableName;

const handler = async (event, context) => {
    AWS.config.region = "eu-west-1";
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    log.info("executing getGetTogethers");

    const req = {
        TableName: context.tableName,
        Limit: 8
    };

    const resp = await dynamodb.scan(req).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify(resp.Items)
    };
    return response;
};

module.exports.handler = middy(handler).use(
    ssm({
      cache: true,
      cacheExpiryInMillis: 3 * 60 * 1000,
      setToContext: true,
      names: {
        tableName: `${process.env.getTogethersTableName}`
      }
    })
  ).use(captureCorrelationId());