const request = require("supertest");
const createApp = require("../setup/app");
const { createAuthenticatedUser } = require("../setup/authHelper");
const { createList, deleteList } = require("../setup/listsHelper");

const app = createApp();

describe("Lists - Delete", () => {
  test("It should delete a list", async () => {
    const { agent } = await createAuthenticatedUser();

    const created = await createList({ name: "list1", agent });

    const listId = created.body.data.list.id;

    const response = await deleteList({ listId, agent });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.list).toEqual(
      expect.objectContaining({
        id: listId,
        name: "list1",
      }),
    );
  });

  test("It should return 404 if list does not exist", async () => {
    const { agent } = await createAuthenticatedUser();

    const response = await deleteList({ listId: 100, agent });

    expect(response.statusCode).toBe(404);
  });

  test("It should not allow deleting another user's list", async () => {
    const { agent: agentA } = await createAuthenticatedUser();
    const { agent: agentB } = await createAuthenticatedUser();

    const createListResponse = await createList({
      name: "list-a",
      agent: agentA,
    });

    const listId = createListResponse.body.data.list.id;

    const response = await deleteList({ listId, agent: agentB });

    expect(response.statusCode).toBe(404);
  });

  test("It should return 401 if user not authenticated", async () => {
    const response = await request(app).delete(`/api/lists/1`);

    expect(response.statusCode).toBe(401);
  });
});
