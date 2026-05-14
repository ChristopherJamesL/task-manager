const request = require("supertest");
const createApp = require("../setup/app");
const { createAuthenticatedUser } = require("../setup/authHelper");
const {
  createListAndTaskAfterSignIn,
  deleteTask,
} = require("../setup/tasksHelper");

const app = createApp();

describe("Tasks - Delete", () => {
  test("It should successfully delete the task", async () => {
    const { agent } = await createAuthenticatedUser();
    const listAndTask = await createListAndTaskAfterSignIn({ agent });
    const taskId = listAndTask.task.body.data.task.id;

    const response = await deleteTask({ taskId, agent });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.task).toEqual(
      expect.objectContaining({
        id: taskId,
      }),
    );
  });

  test("It should return 404 if no task found", async () => {
    const { agent } = await createAuthenticatedUser();

    const response = await deleteTask({ taskId: 100000, agent });

    expect(response.statusCode).toBe(404);
  });

  test("It should return 401 if no authenticated user", async () => {
    const response = await request(app).delete("/api/tasks/1");

    expect(response.statusCode).toBe(401);
  });
});
