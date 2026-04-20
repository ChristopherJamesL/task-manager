const { createAuthenticatedUser } = require("../setup/authHelper");
const { createList, deleteList } = require("../setup/listsHelper");

describe("Lists - Delete", () => {
  test("It should delete a list", async () => {
    const { token } = await createAuthenticatedUser();

    const created = await createList({ name: "list1", token });

    const listId = created.body.data.list.id;

    const response = await deleteList({ listId, token });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.list).toEqual(
      expect.objectContaining({
        id: listId,
        name: "list1",
      }),
    );
  });

  test("It should return 404 if list does not exist", async () => {
    const { token } = await createAuthenticatedUser();

    const response = await deleteList({ listId: 100, token });

    expect(response.statusCode).toBe(404);
  });

  test("It should not allow deleting another user's list", async () => {
    const userA = await createAuthenticatedUser();
    const userB = await createAuthenticatedUser();

    const createListResponse = await createList({
      name: "list-a",
      token: userA.token,
    });

    const listId = createListResponse.body.data.list.id;

    const response = await deleteList({ listId, token: userB.token });

    expect(response.statusCode).toBe(404);
  });

  test("It should return 401 if no token provided", async () => {
    const response = await deleteList({ listId: 1 });

    expect(response.statusCode).toBe(401);
  });
});
