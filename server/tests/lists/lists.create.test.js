const { createAuthenticatedUser } = require("../setup/authHelper");
const { createList } = require("../setup/listsHelper");

describe("Lists - Create", () => {
  test("It should create a new list", async () => {
    const { token } = await createAuthenticatedUser();

    const response = await createList({ name: "list1", token });

    expect(response.statusCode).toBe(201);
    expect(response.body.data.list).toEqual(
      expect.objectContaining({
        name: "list1",
      }),
    );
  });

  test("It should normalize list name and trim it", async () => {
    const { token } = await createAuthenticatedUser();

    const response = await createList({ name: "  LiSt NaMe  ", token });

    expect(response.statusCode).toBe(201);
    expect(response.body.data.list.name).toBe("list name");
  });

  test("It should return 409 if list name already exists", async () => {
    const { token } = await createAuthenticatedUser();

    await createList({ name: "duplicate", token });

    const response = await createList({ name: "duplicate", token });

    expect(response.statusCode).toBe(409);
  });

  test("It should return 401 if no token provided", async () => {
    const response = await createList({ name: "notoken" });

    expect(response.statusCode).toBe(401);
  });
});
