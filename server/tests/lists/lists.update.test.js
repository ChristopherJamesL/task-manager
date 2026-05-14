const request = require("supertest");
const createApp = require("../setup/app");
const { createAuthenticatedUser } = require("../setup/authHelper");
const { createList, updateList } = require("../setup/listsHelper");

const app = createApp();

describe("Lists - Update", () => {
  test("It should update a list name", async () => {
    const { agent } = await createAuthenticatedUser();

    const createListResponse = await createList({ name: "old list", agent });

    const listId = createListResponse.body.data.list.id;

    const response = await updateList({ listId, name: "updated list", agent });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.list).toEqual(
      expect.objectContaining({
        name: "updated list",
      }),
    );
  });

  test("It should normalize updated name", async () => {
    const { agent } = await createAuthenticatedUser();

    const createdListResponse = await createList({
      name: "name to update",
      agent,
    });

    const listId = createdListResponse.body.data.list.id;

    const response = await updateList({
      listId,
      name: "updated list name",
      agent,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.list.name).toBe("updated list name");
  });

  test("It should return 404 if list does not exist", async () => {
    const { agent } = await createAuthenticatedUser();

    const response = await updateList({
      listId: 100,
      name: "no existing list",
      agent,
    });

    expect(response.statusCode).toBe(404);
  });

  test("It should return a 409 if name already exists", async () => {
    const { agent } = await createAuthenticatedUser();

    await createList({ name: "unique", agent });
    const createListResponse = await createList({
      name: "to-be-the-duplicate",
      agent,
    });

    const listId = createListResponse.body.data.list.id;

    const response = await updateList({ listId, name: "unique", agent });

    expect(response.statusCode).toBe(409);
  });

  test("It should return 401 if no authenticated user", async () => {
    const response = await request(app)
      .patch(`/api/lists/1`)
      .send({ name: "list0" });

    expect(response.statusCode).toBe(401);
  });
});
