// Not need callbacks because this have asyn/away node 10
exports.handler = async (event, context) => {
    
    // const {name} = event.queryStringParameters;
    const {name} = event.pathParameters;
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(`Hello ${name}`),
    };
    return response;
};

exports.handlerpost = async (event, context) => {
    
    const {name} = JSON.parse(event.body);
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(`Hello ${name}`),
    };
    return response;
};