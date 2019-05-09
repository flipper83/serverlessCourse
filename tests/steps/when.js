module.exports.we_invoke_helloWorld = (name) => {
    const mode = process.env.TEST_MODE;
    return mode == "http" ? viaHttp("helloWorld", name) : viaHandler("helloWorld", name);
}

async function viaHttp(functionPath, name) {
    const http = require("superagent-promise")(require("superagent"), Promise);
    const host = `https://f4s25sgz8h.execute-api.eu-west-1.amazonaws.com/dev/api/${functionPath}`
    const path = `${host}/${name}`
    
    try {
        const httpReq = http("GET", path);
        const res = await httpReq;
        
        return {
            statusCode: res.status,
            body: res.body
        }
    }catch (err) {
        return {
            statusCode: err.status
        }
    }
}

async function viaHandler(functionPath, name) {
    const event = { pathParameters: { name: name } };
    const handler = require(`../../src/functions/${functionPath}`);
    const response = await handler.handler(event);
    response.body = JSON.parse(response.body);
    return response;
}