const log = require("../lib/log");

exports.handler = async (event, context) => {
    const orderPlaced = JSON.parse(event.Records[0].Sns.Message);

    log.info(`published a new message event`, orderPlaced);


    return orderPlaced.userEmail;
};