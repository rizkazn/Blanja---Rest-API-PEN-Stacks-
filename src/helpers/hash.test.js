const hash = require("./hash")

describe("helpers/hash", () => {
    test("should return random character", async () => {
        const result = await hash("ggplot231")
        expect(result).toEqual(expect.stringContaining("$2b$10$"))
    })

    test("should throw error when params not provide", async () => {
        try {
            const result = await hash()
            expect(result).toBe(false)
        } catch (error) {
            // console.log(error.message)
            expect(error.message).toBe("data and salt arguments required")
        }
    })
})