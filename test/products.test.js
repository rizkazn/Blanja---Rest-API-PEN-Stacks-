const app = require('../app')
const request = require("supertest")

const standardResponse = {
    status : expect.any(Number),
    description : expect.any(String),
    data : expect.any(Array)
}

describe("service /products", () => {
    describe("GET /products", () => {
        test("should return with standard response method GET", async () => {
            const response = await request(app).get("/products")
            expect(response.body).toEqual(expect.objectContaining(standardResponse))
        })
    })
})