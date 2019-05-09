const when = require("./steps/when")

describe(`When we invoke the GET /helloWorld endpoint`, () => {
    test(`Should return the right greeting`, async () => {
        const name = "Manolito"
        response = await when.we_invoke_helloWorld(name);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe("Hello Manolito");
    });
});