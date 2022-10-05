const db = require("../db/connection");
const app = require("../app");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const testData = require("../db/data/test-data/index");

beforeEach(() => seed(testData));
afterAll(() => db.end);

describe("GET /api/", () => {
    test("200:Server responds with running ok message", async () => {
        const { body } = await request(app).get("/api").expect(200);
        expect(body.msg).toBe("Server running ok");
    });
});
