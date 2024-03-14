// models/tasks.js
export const TaskSchema = {
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  };
  