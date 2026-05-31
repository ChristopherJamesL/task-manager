const request = require("supertest");
const createApp = require("../setup/app");
const { createAuthenticatedUser } = require("../setup/authHelper");
const { createTask, getAllTasks, updateTask } = require("../setup/tasksHelper");
const { createTaskData } = require("../setup/factory");
const { createList } = require("../setup/listsHelper");

const app = createApp();

describe("Tasks - Get All", () => {
  // test("It should return empty array when no tasks exist", async () => {
  //   const { agent } = await createAuthenticatedUser();

  //   const response = await getAllTasks({ agent });

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.data.tasks).toEqual([]);
  //   expect(response.body.meta).toEqual({
  //     nextCursor: null,
  //     hasNextPage: false,
  //   });
  // });

  // test("It should return only the user's tasks", async () => {
  //   const { agent: agentA } = await createAuthenticatedUser();
  //   const { agent: agentB } = await createAuthenticatedUser();

  //   const userAList = await createList({
  //     name: "list - a",
  //     agent: agentA,
  //   });
  //   const userBList = await createList({
  //     name: "list - b",
  //     agent: agentB,
  //   });

  //   const aListId = userAList.body.data.list.id;
  //   const bListId = userBList.body.data.list.id;

  //   await createTask({
  //     taskData: { title: "b1", listId: bListId },
  //     agent: agentB,
  //   });

  //   await createTask({
  //     taskData: { title: "a1", listId: aListId },
  //     agent: agentA,
  //   });

  //   await createTask({
  //     taskData: { title: "a2", listId: aListId },
  //     agent: agentA,
  //   });

  //   const response = await getAllTasks({ agent: agentA });

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.data.tasks).toHaveLength(2);
  //   expect(response.body.data.tasks).toEqual(
  //     expect.arrayContaining([
  //       expect.objectContaining({ title: "a1" }),
  //       expect.objectContaining({ title: "a2" }),
  //     ]),
  //   );
  // });

  // test("It should return tasks sorted by created_at DESC by default", async () => {
  //   const { agent } = await createAuthenticatedUser();

  //   const createListResponse = await createList({ name: "work", agent });

  //   const listId = createListResponse.body.data.list.id;

  //   for (let i = 0; i < 5; i++) {
  //     await createTask({ taskData: createTaskData({ listId }), agent });
  //   }

  //   const response = await getAllTasks({ agent });

  //   const tasks = response.body.data.tasks;
  //   const timestamps = tasks.map((t) => new Date(t.created_at).getTime());
  //   const sorted = [...timestamps].sort((a, b) => b - a);

  //   expect(response.statusCode).toBe(200);
  //   expect(tasks).toHaveLength(5);
  //   expect(timestamps).toEqual(sorted);
  // });

  // test("It should return 401 if no authenticated user", async () => {
  //   const response = await request(app).get("/api/tasks");

  //   expect(response.statusCode).toBe(401);
  // });

  // test("It should paginate tasks using createdAt DESC without duplicates", async () => {
  //   const { agent } = await createAuthenticatedUser();

  //   const createListResponse = await createList({ name: "work", agent });

  //   const listId = createListResponse.body.data.list.id;

  //   // create 5 tasks
  //   for (let i = 0; i < 5; i++) {
  //     await createTask({ taskData: createTaskData({ listId }), agent });
  //   }

  //   // first page (limit 2)
  //   const page1 = await getAllTasks({
  //     query: { limit: 2, sortBy: "createdAt", order: "desc" },
  //     agent,
  //   });

  //   expect(page1.statusCode).toBe(200);
  //   expect(page1.body.data.tasks).toHaveLength(2);

  //   const cursor = page1.body.meta.nextCursor;

  //   // second page
  //   const page2 = await getAllTasks({
  //     query: {
  //       limit: 2,
  //       sortBy: "createdAt",
  //       order: "desc",
  //       cursorValue: cursor.value,
  //       cursorId: cursor.id,
  //     },
  //     agent,
  //   });

  //   expect(page2.statusCode).toBe(200);
  //   expect(page2.body.data.tasks).toHaveLength(2);

  //   // no overlap between pages
  //   const page1Ids = page1.body.data.tasks.map((t) => t.id);
  //   const page2Ids = page2.body.data.tasks.map((t) => t.id);

  //   const intersection = page1Ids.filter((id) => page2Ids.includes(id));
  //   expect(intersection).toHaveLength(0);

  //   // ordering consistency check
  //   const combined = [...page1.body.data.tasks, ...page2.body.data.tasks];

  //   const timestamps = combined.map((t) => new Date(t.created_at).getTime());

  //   const sorted = [...timestamps].sort((a, b) => b - a);

  //   expect(timestamps).toEqual(sorted);
  // });

  test("It should paginate correctly using createdAt ASC without duplicates", async () => {
    const { agent } = await createAuthenticatedUser();

    const createListResponse = await createList({ name: "work", agent });
    const listId = createListResponse.body.data.list.id;

    // create 5 tasks
    for (let i = 0; i < 5; i++) {
      await createTask({ taskData: createTaskData({ listId }), agent });
    }

    // ******************** BUG TESTING, REMOVE THIS AFTER
    const dump = await getAllTasks({
      query: {
        limit: 10,
        sortBy: "createdAt",
        order: "asc",
      },
      agent,
    });

    console.log(
      "FULL ORDER DUMP:",
      dump.body.data.tasks.map((t) => ({
        id: t.id,
        createdAt: t.createdAt,
      })),
    );
    // ******************** END OF BUG TESTING COMPONENT

    // page 1
    const page1 = await getAllTasks({
      query: { limit: 2, sortBy: "createdAt", order: "asc" },
      agent,
    });

    expect(page1.body.data.tasks).toHaveLength(2);

    const cursor = page1.body.meta.nextCursor;

    //page 2
    const page2 = await getAllTasks({
      query: {
        limit: 2,
        sortBy: "createdAt",
        order: "asc",
        cursorValue: cursor.value,
        cursorId: cursor.id,
      },
      agent,
    });

    expect(page2.body.data.tasks).toHaveLength(2);

    const page1Ids = page1.body.data.tasks.map((t) => t.id);
    const page2Ids = page2.body.data.tasks.map((t) => t.id);

    console.log("page 1 id's: ", page1Ids);
    console.log("page 2 id's: ", page2Ids);

    console.log(
      "PAGE 1 RAW ORDER:",
      page1.body.data.tasks.map((t) => ({
        id: t.id,
        created_at: t.createdAt,
      })),
    );

    console.log(
      "PAGE 2 RAW ORDER:",
      page2.body.data.tasks.map((t) => ({
        id: t.id,
        created_at: t.createdAt,
      })),
    );

    const intersection = page1Ids.filter((id) => page2Ids.includes(id));
    expect(intersection).toHaveLength(0);
  });

  // test("It should paginate correctly using dueDate ASC without duplicates", async () => {
  //   const { agent } = await createAuthenticatedUser();

  //   const createListResponse = await createList({ name: "work", agent });
  //   const listId = createListResponse.body.data.list.id;

  //   // create tasks
  //   for (let i = 0; i < 5; i++) {
  //     const task = createTaskData({ listId });

  //     // ensure some have due dates so sorting is meaningful
  //     task.dueDate = new Date(Date.now() + i * 1000 * 60).toISOString();

  //     await createTask({ taskData: task, agent });
  //   }

  //   const page1 = await getAllTasks({
  //     query: { limit: 2, sortBy: "dueDate", order: "asc" },
  //     agent,
  //   });

  //   expect(page1.body.data.tasks).toHaveLength(2);

  //   const cursor = page1.body.meta.nextCursor;

  //   const page2 = await getAllTasks({
  //     query: {
  //       limit: 2,
  //       sortBy: "dueDate",
  //       order: "asc",
  //       cursorValue: cursor.value,
  //       cursorId: cursor.id,
  //     },
  //     agent,
  //   });

  //   expect(page2.body.data.tasks).toHaveLength(2);

  //   const page1Ids = page1.body.data.tasks.map((t) => t.id);
  //   const page2Ids = page2.body.data.tasks.map((t) => t.id);

  //   const intersection = page1Ids.filter((id) => page2Ids.includes(id));
  //   expect(intersection).toHaveLength(0);
  // });

  // test("It should filter by listId and isCompleted and respect sorting", async () => {
  //   const { agent } = await createAuthenticatedUser();

  //   const createListResponse = await createList({ name: "work", agent });
  //   const listId = createListResponse.body.data.list.id;

  //   // create completed and incompleted tasks
  //   await createTask({ taskData: { ...createTaskData({ listId }) }, agent });
  //   await createTask({ taskData: { ...createTaskData({ listId }) }, agent });

  //   // mark one as completed via update
  //   const getResponse = await getAllTasks({ agent });
  //   const taskToComplete = getResponse.body.data.tasks[0];

  //   await updateTask({
  //     taskData: { isCompleted: true },
  //     taskId: taskToComplete.id,
  //     agent,
  //   });

  //   // query only incomplete task
  //   const response = await getAllTasks({
  //     query: { listId, isCompleted: false, sortBy: "createdAt", order: "desc" },
  //     agent,
  //   });

  //   expect(response.statusCode).toBe(200);

  //   const tasks = response.body.data.tasks;

  //   expect(tasks.every((t) => t.isCompleted === false)).toBe(true);

  //   expect(tasks.every((t) => t.listId === listId)).toBe(true);

  //   const timestamps = tasks.map((t) => new Date(t.created_at).getTime());

  //   const sorted = [...timestamps].sort((a, b) => b - a);

  //   expect(timestamps).toEqual(sorted);
  // });
});
