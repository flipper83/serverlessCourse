const chance = require("chance").Chance();
const sns = require("../lib/snsClient");
const middy = require("middy");
const captureCorrelationId = require("../middleware/captureCorrelationId");

const handler = async (event, context) => {

    const body = JSON.parse(event.body);
    const getTogetherId = body.getTogetherId;
    const userEmail = body.getTogetherEmail;

    const orderId = chance.guid();
    console.log(`user ${userEmail} joining gettogether ${getTogetherId}`);

    const data = {
        orderId,
        getTogetherId,
        userEmail
    };

    const params = {
        Message: JSON.stringify(data),
        TopicArn: process.env.joinGetTogetherSnsTopic
    };

    await sns.publish(params).promise();

    console.log("published 'join_getTogether' event");

    const response = {
        statusCode: 200,
        body: JSON.stringify({ orderId })
    };

    return response;
};

module.exports.handler = middy(handler).use(captureCorrelationId());