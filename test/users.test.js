const app = require('../app')
const request = require("supertest")

const standardResponse = {
    status : expect.any(Number),
    description : expect.any(String),
    data : expect.any(Array)
}

describe("service /users", () => {
    describe("GET /users", () => {
        test("should respond with all users ", async () => {
            const response = await request(app).get("/users")
            expect(response.body).toEqual(expect.objectContaining(standardResponse))
        })
    })
})

describe("service /users", () => {
    describe("POST /users", () => {
        test("should respond with a success message along with a single user that was added", async () => {
            const response = await request(app).post("/users").send({
                name : "Gerald",
                email : "genosetest@gmail.com",
                password : "ggplot231",
            })
            expect(response.body).toEqual(expect.objectContaining(standardResponse))
        })
    })
})
