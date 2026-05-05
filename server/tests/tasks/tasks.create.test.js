const { createAuthenticatedUser } = require("../setup/authHelper");
const { createList } = require("../setup/listsHelper");
const { createTask } = require("../setup/tasksHelper");
const { createTaskData } = require("../setup/factory");

describe("Tasks - Create", () => {
  test("It should create one task successfully", async () => {
    const { token } = await createAuthenticatedUser();

    const list = await createList({ name: "my-list", token });
    const listId = list.body.data.list.id;

    const taskData = createTaskData({
      listId,
      overrides: { title: "my-task" },
    });
    const response = await createTask({ taskData, token });

    expect(response.statusCode).toBe(201);
    expect(response.body.data.task).toEqual(
      expect.objectContaining({
        title: "my-task",
        listId: listId,
        isCompleted: false,
      }),
    );
  });

  test("It should fail when title is missing", async () => {
    const { token } = await createAuthenticatedUser();

    const list = await createList({ name: "my-list", token });
    const listId = list.body.data.list.id;

    const response = await createTask({ taskData: { listId }, token });

    expect(response.statusCode).toBe(400);
  });

  test("It should fail when listId is missing", async () => {
    const { token } = await createAuthenticatedUser();

    const list = await createList({ name: "my-list", token });
    const listId = list.body.data.list.id;

    const response = await createTask({
      taskData: { title: "my-task" },
      token,
    });

    expect(response.statusCode).toBe(400);
  });

  test("It should return 401 if no token is provided", async () => {
    const response = await createTask({
      taskData: { listId: 1, title: "my-task" },
    });

    expect(response.statusCode).toBe(401);
  });

  test("It should apply default values properly", async () => {
    const { token } = await createAuthenticatedUser();

    const list = await createList({ name: "my-list", token });
    const listId = list.body.data.list.id;

    const taskData = createTaskData({ listId });
    const response = await createTask({ taskData, token });

    expect(response.statusCode).toBe(201);
    expect(response.body.data.task).toEqual(
      expect.objectContaining({
        priority: "medium",
        isCompleted: false,
      }),
    );
  });
});
