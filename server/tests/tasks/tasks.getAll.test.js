const { createAuthenticatedUser } = require("../setup/authHelper");
const {
  createTask,
  getAllTasks,
  updateTasks,
} = require("../setup/tasksHelper");
const { createTaskData } = require("../setup/factory");
const { createList } = require("../setup/listsHelper");

describe("Tasks - Get All", () => {
  test("It should return empty array when no tasks exist", async () => {
    const { token } = await createAuthenticatedUser();

    const response = await getAllTasks({ token });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.tasks).toEqual([]);
    expect(response.body.meta).toEqual({
      nextCursor: null,
      hasNextPage: false,
    });
  });

  test("It should return only the user's tasks", async () => {
    const userA = await createAuthenticatedUser();
    const userB = await createAuthenticatedUser();

    const userAList = await createList({
      name: "list - a",
      token: userA.token,
    });
    const userBList = await createList({
      name: "list - b",
      token: userB.token,
    });

    const aListId = userAList.body.data.list.id;
    const bListId = userBList.body.data.list.id;

    await createTask({
      taskData: { title: "b1", listId: bListId },
      token: userB.token,
    });

    await createTask({
      taskData: { title: "a1", listId: aListId },
      token: userA.token,
    });

    await createTask({
      taskData: { title: "a2", listId: aListId },
      token: userA.token,
    });

    const response = await getAllTasks({ token: userA.token });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.tasks).toHaveLength(2);
    expect(response.body.data.tasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: "a1" }),
        expect.objectContaining({ title: "a2" }),
      ]),
    );
  });

  test("It should return tasks sorted by created_at DESC by default", async () => {
    const { token } = await createAuthenticatedUser();

    const createListResponse = await createList({ name: "work", token });

    const listId = createListResponse.body.data.list.id;

    for (let i = 0; i < 5; i++) {
      await createTask({ taskData: createTaskData({ listId }), token });
    }

    const response = await getAllTasks({ token });

    const tasks = response.body.data.tasks;
    const timestamps = tasks.map((t) => new Date(t.created_at).getTime());
    const sorted = [...timestamps].sort((a, b) => b - a);

    expect(response.statusCode).toBe(200);
    expect(tasks).toHaveLength(5);
    expect(timestamps).toEqual(sorted);
  });

  test("It should return 401 if no token provided", async () => {
    const response = await getAllTasks();

    expect(response.statusCode).toBe(401);
  });

  test("It should paginate tasks using cursor without duplicates", async () => {
    const { token } = await createAuthenticatedUser();

    const createListResponse = await createList({ name: "work", token });

    const listId = createListResponse.body.data.list.id;

    // create 5 tasks
    for (let i = 0; i < 5; i++) {
      await createTask({ taskData: createTaskData({ listId }), token });
    }

    // first page (limit 2)
    const page1 = await getAllTasks({
      query: { limit: 2, sortBy: "createdAt", order: "desc" },
      token,
    });

    expect(page1.statusCode).toBe(200);
    expect(page1.body.data.tasks).toHaveLength(2);

    const cursor = page1.body.meta.nextCursor;

    // second page
    const page2 = await getAllTasks({
      query: {
        limit: 2,
        sortBy: "createdAt",
        order: "desc",
        cursorValue: cursor.value,
        cursorId: cursor.id,
      },
      token,
    });

    expect(page2.statusCode).toBe(200);
    expect(page2.body.data.tasks).toHaveLength(2);

    // no overlap between pages
    const page1Ids = page1.body.data.tasks.map((t) => t.id);
    const page2Ids = page2.body.data.tasks.map((t) => t.id);

    const intersection = page1Ids.filter((id) => page2Ids.includes(id));
    expect(intersection).toHaveLength(0);

    // ordering consistency check
    const combined = [...page1.body.data.tasks, ...page2.body.data.tasks];

    const timestamps = combined.map((t) => new Date(t.created_at).getTime());

    const sorted = [...timestamps].sort((a, b) => b - a);

    expect(timestamps).toEqual(sorted);
  });

  test("It should filter by listId and isCompleted and respect sorting", async () => {
    const { token } = await createAuthenticatedUser();

    const createListResponse = await createList({ name: "work", token });
    const listId = createListResponse.body.data.list.id;

    // create completed and incompleted tasks
    await createTask({ taskData: { ...createTaskData({ listId }) }, token });
    await createTask({ taskData: { ...createTaskData({ listId }) }, token });

    // mark one as completed via update
    const getResponse = await getAllTasks({ token });
    const taskToComplete = getResponse.body.data.tasks[0];

    await updateTasks({
      taskData: { isCompleted: true },
      taskId: taskToComplete.id,
      token,
    });

    // query only incomplete task
    const response = await getAllTasks({
      query: { listId, isCompleted: false, sortBy: "createdAt", order: "desc" },
      token,
    });

    expect(response.statusCode).toBe(200);

    const tasks = response.body.data.tasks;

    expect(tasks.every((t) => t.isCompleted === false)).toBe(true);

    expect(tasks.every((t) => t.listId === listId)).toBe(true);

    const timestamps = tasks.map((t) => new Date(t.created_at).getTime());

    const sorted = [...timestamps].sort((a, b) => b - a);

    expect(timestamps).toEqual(sorted);
  });
});
