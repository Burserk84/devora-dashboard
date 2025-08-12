import mongoose, { Document, Schema, Model } from "mongoose";

// Define the interface for a Task document.
// This gives us strong typing with TypeScript.
export interface ITask extends Document {
  title: string;
  description?: string;
  status: "To Do" | "In Progress" | "Done";
  assignee?: string;
  createdAt: Date;
}

// Define the Mongoose schema for the Task.
const TaskSchema: Schema<ITask> = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for the task."],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
  assignee: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// To prevent model overwrite errors in Next.js's hot-reloading environment,
// we check if the model is already defined before creating it.
const Task: Model<ITask> =
  mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);

export default Task;
