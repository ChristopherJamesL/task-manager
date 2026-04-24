const { createAuthenticatedUser } = require("../setup/authHelper");
const {
  createListAndTaskAfterSignIn,
  updateTask,
} = require("../setup/tasksHelper");
const { createTaskUpdateData } = require("../setup/factory");

describe("Tasks - Update", () => {
  test("It should successfully update a single field", async () => {
    const { token } = await createAuthenticatedUser();
    const listAndTask = await createListAndTaskAfterSignIn({ token });

    const taskId = listAndTask.task.body.data.task.id;

    const newTaskData = createTaskUpdateData({ title: "new-title" });

    const response = await updateTask({
      taskId,
      token,
      taskUpdateData: newTaskData,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.task.title).toBe("new-title");
  });

  test("It should successfully update multiple fields", async () => {
    const { token } = await createAuthenticatedUser();
    const listAndTask = await createListAndTaskAfterSignIn({ token });
    const taskId = listAndTask.task.body.data.task.id;

    const newTaskData = createTaskUpdateData({
      title: "updated-title",
      priority: "high",
      isCompleted: "true",
    });

    const response = await updateTask({
      taskId,
      token,
      taskUpdateData: newTaskData,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.task).toEqual(
      expect.objectContaining({
        title: "updated-title",
        priority: "high",
        is_completed: true,
      }),
    );
  });

  test("It should return 400 when no update fields are provided", async () => {
    const { token } = await createAuthenticatedUser();
    const listAndTask = await createListAndTaskAfterSignIn({ token });
    const taskId = listAndTask.task.body.data.task.id;

    const response = await updateTask({ taskId, token });

    expect(response.statusCode).toBe(400);
  });

  test("It should return 400 with invalid update field", async () => {
    const { token } = await createAuthenticatedUser();
    const listAndTask = await createListAndTaskAfterSignIn({ token });
    const taskId = listAndTask.task.body.data.task.id;

    const newTaskData = createTaskUpdateData({ priority: "yesterday" });
    const response = await updateTask({
      taskId,
      token,
      taskUpdateData: newTaskData,
    });

    expect(response.statusCode).toBe(400);
  });

  test("It should return 404 when task does not exist", async () => {
    const { token } = await createAuthenticatedUser();

    const newTaskData = createTaskUpdateData({ title: "non-existant-task" });
    const response = await updateTask({
      taskId: 100,
      token,
      taskUpdateData: newTaskData,
    });

    expect(response.statusCode).toBe(404);
  });

  test("It should return 404 when user does not own the task", async () => {
    const userA = await createAuthenticatedUser();
    const userB = await createAuthenticatedUser();

    const listAndTask = await createListAndTaskAfterSignIn({
      token: userA.token,
    });
    const taskId = listAndTask.task.body.data.task.id;

    const newTaskData = createTaskUpdateData({ title: "not-my-task" });

    const response = await updateTask({
      taskId,
      token: userB.token,
      taskUpdateData: newTaskData,
    });

    expect(response.statusCode).toBe(404);
  });

  test("It should return 400 with invalid zod task id", async () => {
    const { token } = await createAuthenticatedUser();

    const response = await updateTask({
      taskId: "not-a-number",
      token,
      taskUpdateData: { title: "can-I-reach-the-controller?" },
    });

    expect(response.statusCode).toBe(400);
  });
});
