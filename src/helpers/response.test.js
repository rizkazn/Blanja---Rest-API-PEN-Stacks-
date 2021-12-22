const response = require("./response")

const res = {
    obj : {},
    statusCode : 0,
    status(code) {
        this.statusCode = code
        return this
    },
    json(data) {
        this.obj = data
        return this
    }
}

describe("helpers/response", () => {
    test("should return array of object", () => {
        const check = response(res, 200, {msg : "Hello World"})
        const { result } = check.obj
        // console.log(check)
        expect(result).toHaveLength(1)
    })
    test("should return DESC OK when status 200", () => {
        const check = response(res, 200, {msg : "Hello World"})
        expect(check.obj.description).toBe("OK")
    })
})