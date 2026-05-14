const request = require("supertest");
const createApp = require("../setup/app");
const { createAuthenticatedUser } = require("../setup/authHelper");
const {
  getTaskById,
  createListAndTaskAfterSignIn,
} = require("../setup/tasksHelper");

const app = createApp();

describe("Tasks - Get By Id", () => {
  test("It should return a single task by id", async () => {
    const { agent } = await createAuthenticatedUser();

    const createListAndTask = await createListAndTaskAfterSignIn({
      listName: "my-list",
      taskOverrides: { title: "my-task" },
      agent,
    });

    const taskId = createListAndTask.task.body.data.task.id;

    const response = await getTaskById({ taskId, agent });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.task).toEqual(
      expect.objectContaining({
        id: taskId,
        title: "my-task",
      }),
    );
  });

  test("It should return 404 if task does not exist", async () => {
    const { agent } = await createAuthenticatedUser();

    const response = await getTaskById({ taskId: 100, agent });

    expect(response.statusCode).toBe(404);
  });

  test("It should not allow access to another user's task", async () => {
    const { agent: agentA } = await createAuthenticatedUser();
    const { agent: agentB } = await createAuthenticatedUser();

    const createListAndTask = await createListAndTaskAfterSignIn({
      agent: agentA,
    });

    const taskId = createListAndTask.task.body.data.task.id;

    const response = await getTaskById({ taskId, agent: agentB });

    expect(response.statusCode).toBe(404);
  });

  test("It should return 401 if no authenticated user", async () => {
    const response = await request(app).get(`/api/tasks/1`);

    expect(response.statusCode).toBe(401);
  });
});
