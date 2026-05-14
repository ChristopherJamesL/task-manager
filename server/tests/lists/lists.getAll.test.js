const request = require("supertest");
const createApp = require("../setup/app");
const { createListName } = require("../setup/factory");
const { createAuthenticatedUser } = require("../setup/authHelper");
const { createList, getAllLists } = require("../setup/listsHelper");

const app = createApp();

describe("Lists - Get All Lists", () => {
  test("It should return empty array when no list exists", async () => {
    const { agent } = await createAuthenticatedUser();

    const response = await getAllLists({ agent });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.lists).toEqual([]);
  });

  test("It should return only the users lists", async () => {
    const { agent: agentA } = await createAuthenticatedUser();
    const { agent: agentB } = await createAuthenticatedUser();

    await createList({ name: "a1", agent: agentA });
    await createList({ name: "b1", agent: agentB });
    await createList({ name: "a2", agent: agentA });

    const response = await getAllLists({ agent: agentA });

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
    const { agent } = await createAuthenticatedUser();

    for (let i = 0; i < 5; i++) {
      await createList({ name: createListName(), agent });
    }

    const response = await getAllLists({ agent });

    const lists = response.body.data.lists;
    const timestamps = lists.map((l) => new Date(l.created_at).getTime());
    const sorted = [...timestamps].sort((a, b) => b - a);

    expect(response.statusCode).toBe(200);
    expect(response.body.data.lists).toHaveLength(5);
    expect(timestamps).toEqual(sorted);
  });

  test("It should return 401 if user not authenticated", async () => {
    const response = await request(app).get("/api/lists");

    expect(response.statusCode).toBe(401);
  });
});
