const { createAuthenticatedUser } = require("../setup/authHelper");
const { createList, updateList } = require("../setup/listsHelper");

describe("Lists - Update", () => {
  test("It should update a list name", async () => {
    const { token } = await createAuthenticatedUser();

    const createListResponse = await createList({ name: "old list", token });

    const listId = createListResponse.body.data.list.id;

    const response = await updateList({ listId, name: "updated list", token });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.list).toEqual(
      expect.objectContaining({
        name: "updated list",
      }),
    );
  });

  test("It should normalize updated name", async () => {
    const { token } = await createAuthenticatedUser();

    const createdListResponse = await createList({
      name: "name to update",
      token,
    });

    const listId = createdListResponse.body.data.list.id;

    const response = await updateList({
      listId,
      name: "updated list name",
      token,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.list.name).toBe("updated list name");
  });

  test("It should return 404 if list does not exist", async () => {
    const { token } = await createAuthenticatedUser();

    const response = await updateList({
      listId: 100,
      name: "no existing list",
      token,
    });

    expect(response.statusCode).toBe(404);
  });

  test("It should return a 409 if name already exists", async () => {
    const { token } = await createAuthenticatedUser();

    await createList({ name: "unique", token });
    const createListResponse = await createList({
      name: "to-be-the-duplicate",
      token,
    });

    const listId = createListResponse.body.data.list.id;

    const response = await updateList({ listId, name: "unique", token });

    expect(response.statusCode).toBe(409);
  });

  test("It should return 401 if no token provided", async () => {
    const { token } = await createAuthenticatedUser();

    const createListResponse = await createList({ name: "list1", token });

    const listId = createListResponse.body.data.list.id;

    const response = await updateList({ listId, name: "list0" });

    expect(response.statusCode).toBe(401);
  });
});
