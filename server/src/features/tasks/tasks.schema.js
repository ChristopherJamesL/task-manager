const z = require("zod");

const zodRequestQueryBoolean = (val) => {
  if (val === undefined) return undefined;
  return val === "true";
};

const cursorId = z.coerce.number();
const cursorValue = z.iso.datetime();
const description = z.string();
const dueAfter = z.iso.datetime();
const dueBefore = z.iso.datetime();
const dueDate = z.iso.datetime({ offset: true });
const id = z.coerce.number().min(1);
const isCompleted = z.string().transform(zodRequestQueryBoolean);
const limit = z.coerce.number().min(1).max(50);
const listId = z.coerce.number().min(1);
const order = z.enum(["asc", "desc"]).default("desc");
const priority = z.enum(["low", "medium", "high"]);
const sortBy = z.enum(["createdAt", "dueDate"]).default("createdAt");
const title = z.string().min(1).max(255);
const isCompletedPatch = z.boolean();

const getTasksQuerySchema = z.object({
  cursorId: cursorId.optional(),
  cursorValue: cursorValue.optional(),
  dueAfter: dueAfter.optional(),
  dueBefore: dueBefore.optional(),
  isCompleted: isCompleted.optional(),
  limit: limit.default(10),
  listId: listId.optional(),
  order,
  priority: priority.optional(),
  sortBy,
});

const createTaskSchema = z.object({
  description: description.optional(),
  dueDate: dueDate.optional(),
  listId,
  priority: priority.optional(),
  title,
});

const updateTaskSchema = z
  .object({
    description: description.optional(),
    dueDate: dueDate.optional(),
    isCompleted: isCompletedPatch.optional(),
    priority: priority.optional(),
    title: title.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provideddddd",
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
