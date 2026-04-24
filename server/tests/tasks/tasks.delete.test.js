const { createAuthenticatedUser } = require("../setup/authHelper");
const {
  createListAndTaskAfterSignIn,
  deleteTask,
} = require("../setup/tasksHelper");

describe("Tasks - Delete", () => {
  test("It should successfully delete the task", async () => {
    const { token } = await createAuthenticatedUser();
    const listAndTask = await createListAndTaskAfterSignIn({ token });
    const taskId = listAndTask.task.body.data.task.id;

    const response = await deleteTask({ taskId, token });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.task).toEqual(
      expect.objectContaining({
        id: taskId,
      }),
    );
  });

  test("It should return 404 if no task found", async () => {
    const { token } = await createAuthenticatedUser();

    const response = await deleteTask({ taskId: 100000, token });

    expect(response.statusCode).toBe(404);
  });

  test("It should return 401 if no token", async () => {
    const { token } = await createAuthenticatedUser();
    const listAndTask = await createListAndTaskAfterSignIn({ token });
    const taskId = listAndTask.task.body.data.task.id;

    const response = await deleteTask({ taskId });

    expect(response.statusCode).toBe(401);
  });
});
