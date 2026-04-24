const { createAuthenticatedUser } = require("../setup/authHelper");
const {
  getTaskById,
  createListAndTaskAfterSignIn,
} = require("../setup/tasksHelper");

describe("Tasks - Get By Id", () => {
  test("It should return a single task by id", async () => {
    const { token } = await createAuthenticatedUser();

    const createListAndTask = await createListAndTaskAfterSignIn({
      listName: "my-list",
      taskOverrides: { title: "my-task" },
      token,
    });

    const taskId = createListAndTask.task.body.data.task.id;

    const response = await getTaskById({ taskId, token });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.task).toEqual(
      expect.objectContaining({
        id: taskId,
        title: "my-task",
      }),
    );
  });

  test("It should return 404 if task does not exist", async () => {
    const { token } = await createAuthenticatedUser();

    const response = await getTaskById({ taskId: 100, token });

    expect(response.statusCode).toBe(404);
  });

  test("It should not allow access to another user's task", async () => {
    const userA = await createAuthenticatedUser();
    const userB = await createAuthenticatedUser();

    const createListAndTask = await createListAndTaskAfterSignIn({
      token: userA.token,
    });

    const taskId = createListAndTask.task.body.data.task.id;

    const response = await getTaskById({ taskId, token: userB.token });

    expect(response.statusCode).toBe(404);
  });

  test("It should return 401 if no token", async () => {
    const response = await getTaskById({ taskId: 1 });

    expect(response.statusCode).toBe(401);
  });
});
