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

describe("GET /topics/", () => {
    test("200:Server responds with a list of topic objects", async () => {
        const { body } = await request(app).get("/api/topics/").expect(200);
        const { topics } = body;
        expect(topics.length).toBeGreaterThanOrEqual(3);

        topics.forEach((topic) => {
            expect(topic).toEqual(
                expect.objectContaining({
                    slug: expect.any(String),
                    description: expect.any(String),
                })
            );
        });
    });
});

describe("GET /articles/:id", () => {
    test("200:Server responds with a single article object", async () => {
        const { body } = await request(app).get("/api/articles/1").expect(200);
        const { article } = body;
        console.log(body);
        expect(article).toHaveProperty("article_id");
        expect(article).toHaveProperty("title");
        expect(article).toHaveProperty("author");
        expect(article).toHaveProperty("topic");
        expect(article).toHaveProperty("body");
        expect(article).toHaveProperty("created_at");
        expect(article).toHaveProperty("votes");
    });
});
