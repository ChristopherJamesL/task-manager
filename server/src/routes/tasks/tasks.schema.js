const z = require("zod");

const title = z.string().min(1).max(255);
const id = z.coerce.number().min(1);
const description = z.string();
const priority = z.enum(["low", "medium", "high"]);
const isCompleted = z.boolean();
const listId = z.coerce.number();
const dueDate = z.iso.datetime({ offset: true });
const limit = z.coerce.number().min(1).max(50);
const cursorCreatedAt = z.iso.datetime();
const cursorId = z.coerce.number();

const getTasksQuerySchema = z.object({
  listId: listId.optional(),
  limit: limit.default(10),
  cursorCreatedAt: cursorCreatedAt.optional(),
  cursorId: cursorId.optional(),
});

const createTaskSchema = z.object({
  listId,
  title,
  description: description.optional(),
  priority: priority.optional(),
  dueDate: dueDate.optional(),
});

const updateTaskSchema = z
  .object({
    title: title.optional(),
    description: description.optional(),
    priority: priority.optional(),
    isCompleted: isCompleted.optional(),
    dueDate: dueDate.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

const taskIdParamSchema = z.object({
  id,
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  getTasksQuerySchema,
  taskIdParamSchema,
};
