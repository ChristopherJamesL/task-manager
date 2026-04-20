const { createAuthenticatedUser } = require("../setup/authHelper");
const { createList, getListById } = require("../setup/listsHelper");

describe("Lists - Get By Id", () => {
  test("It should return a single list by id", async () => {
    const { token } = await createAuthenticatedUser();

    const createListResponse = await createList({
      name: "my-list",
      token: token,
    });

    const listId = createListResponse.body.data.list.id;

    const response = await getListById({ listId, token });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.list).toEqual(
      expect.objectContaining({
        id: listId,
        name: "my-list",
      }),
    );
  });

  test("It should return 404 if list does not exist", async () => {
    const { token } = await createAuthenticatedUser();

    const response = await getListById({ listId: "1", token });

    expect(response.statusCode).toBe(404);
  });

  test("It should not allow access to another user's list", async () => {
    const userA = await createAuthenticatedUser();
    const userB = await createAuthenticatedUser();

    const createListResponse = await createList({
      name: "user-a-list",
      token: userA.token,
    });

    const listId = createListResponse.body.data.list.id;

    const response = await getListById({ listId, token: userB.token });

    expect(response.statusCode).toBe(404);
  });

  test("It should return 401 if no token provided", async () => {
    const response = await getListById({ listId: "1" });

    expect(response.statusCode).toBe(401);
  });
});
