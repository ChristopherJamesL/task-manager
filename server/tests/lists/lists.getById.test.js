const request = require("supertest");
const createApp = require("../setup/app");
const { createAuthenticatedUser } = require("../setup/authHelper");
const { createList, getListById } = require("../setup/listsHelper");

const app = createApp();

describe("Lists - Get By Id", () => {
  test("It should return a single list by id", async () => {
    const { agent } = await createAuthenticatedUser();

    const createListResponse = await createList({
      name: "my-list",
      agent,
    });

    const listId = createListResponse.body.data.list.id;

    const response = await getListById({ listId, agent });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.list).toEqual(
      expect.objectContaining({
        id: listId,
        name: "my-list",
      }),
    );
  });

  test("It should return 404 if list does not exist", async () => {
    const { agent } = await createAuthenticatedUser();

    const response = await getListById({ listId: "1", agent });

    expect(response.statusCode).toBe(404);
  });

  test("It should not allow access to another user's list", async () => {
    const { agent: agentA } = await createAuthenticatedUser();
    const { agent: agentB } = await createAuthenticatedUser();

    const createListResponse = await createList({
      name: "user-a-list",
      agent: agentA,
    });

    const listId = createListResponse.body.data.list.id;

    const response = await getListById({ listId, agent: agentB });

    expect(response.statusCode).toBe(404);
  });

  test("It should return 401 if no authenticated user", async () => {
    const response = await request(app).get(`/api/lists/1`);

    expect(response.statusCode).toBe(401);
  });
});
