const z = require("zod");

const title = z.string().min(1).max(255);
const description = z.string();
const priority = z.enum(["low", "medium", "high"]);
const isCompleted = z.boolean();
const listId = z.coerce.number();
const dueDate = z.iso.datetime();

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

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
