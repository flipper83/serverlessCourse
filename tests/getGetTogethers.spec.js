const when = require("./steps/when")
const { init } = require("./steps/init");

describe(`When we invoke the GET /getTogethers endpoint`, () => {
    beforeAll(() => {
        init();
    });

    test(`Should return the right values`, async () => {
        res = await when.we_invoke_getTogethers();

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(8);

        for (let i = 0; i < res.body.length; i += 1) {
            const master = res.body[i];
            expect(master).toHaveProperty("id");
            expect(master).toHaveProperty("name");
            expect(master).toHaveProperty("description");
        }
    });
});