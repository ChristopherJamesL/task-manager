const { createListName } = require("../setup/factory");
const { createAuthenticatedUser } = require("../setup/authHelper");
const { createList, getAllLists } = require("../setup/listsHelper");

describe("Lists - Get All Lists", () => {
  test("It should return empty array when no list exists", async () => {
    const { token } = await createAuthenticatedUser();

    const response = await getAllLists({ token: token });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.lists).toEqual([]);
  });

  test("It should return only the users lists", async () => {
    const userA = await createAuthenticatedUser();
    const userB = await createAuthenticatedUser();

    await createList({ name: "a1", token: userA.token });
    await createList({ name: "b1", token: userB.token });
    await createList({ name: "a2", token: userA.token });

    const response = await getAllLists({ token: userA.token });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.lists).toHaveLength(2);
    expect(response.body.data.lists).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "a1" }),
        expect.objectContaining({ name: "a2" }),
      ]),
    );
  });

  test("It should return lists sorted by created_at DESC", async () => {
    const user = await createAuthenticatedUser();

    for (let i = 0; i < 5; i++) {
      await createList({ name: createListName(), token: user.token });
    }

    const response = await getAllLists({ token: user.token });

    const lists = response.body.data.lists;
    const timestamps = lists.map((l) => new Date(l.created_at).getTime());
    const sorted = [...timestamps].sort((a, b) => b - a);

    expect(response.statusCode).toBe(200);
    expect(response.body.data.lists).toHaveLength(5);
    expect(timestamps).toEqual(sorted);
  });

  test("It should return 401 if no token provided", async () => {
    const response = await getAllLists();

    expect(response.statusCode).toBe(401);
  });
});
