const request = require("supertest");
const createApp = require("../setup/app");
const { createAuthenticatedUser } = require("../setup/authHelper");
const { createList } = require("../setup/listsHelper");

const app = createApp();

describe("Lists - Create", () => {
  test("It should create a new list", async () => {
    const { agent } = await createAuthenticatedUser();

    const response = await createList({ name: "list1", agent });

    expect(response.statusCode).toBe(201);
    expect(response.body.data.list).toEqual(
      expect.objectContaining({
        name: "list1",
      }),
    );
  });

  test("It should normalize list name and trim it", async () => {
    const { agent } = await createAuthenticatedUser();

    const response = await createList({ name: "  LiSt NaMe  ", agent });

    expect(response.statusCode).toBe(201);
    expect(response.body.data.list.name).toBe("list name");
  });

  test("It should return 409 if list name already exists", async () => {
    const { agent } = await createAuthenticatedUser();

    await createList({ name: "duplicate", agent });

    const response = await createList({ name: "duplicate", agent });

    expect(response.statusCode).toBe(409);
  });

  test("It should return 401 if no user has been authenticated", async () => {
    const response = await request(app)
      .post("/api/lists")
      .send({ name: "noauth" });

    expect(response.statusCode).toBe(401);
  });
});
