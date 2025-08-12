//
// 📂 app/(dashboard)/[locale]/devora/page.tsx
// This is the main page component for the Devora Team Hub.
// It's a client component to allow for state management and data fetching.
//
"use client";

import { useState, useEffect } from "react";
import { ITask } from "@/lib/models/Task";

// A simple component for the task card
function TaskCard({ task }: { task: ITask }) {
  return (
    <div className="p-4 mb-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg text-foreground">
      <h3 className="font-bold">{task.title}</h3>
      {task.description && (
        <p className="text-sm text-foreground/80 mt-1">{task.description}</p>
      )}
      <div className="text-xs mt-3 text-foreground/60">
        Assigned to: {task.assignee || "Unassigned"}
      </div>
    </div>
  );
}

// A component for the form to add new tasks
function AddTaskForm({ onTaskAdded }: { onTaskAdded: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!title) {
      setError("Title is required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status: "To Do" }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to create task");
      }

      setTitle("");
      setDescription("");
      onTaskAdded(); // Callback to refresh the task list
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 mb-8"
    >
      <h2 className="text-lg font-semibold mb-4 text-foreground">
        Add New Task
      </h2>
      {error && (
        <div className="bg-red-500/50 text-white p-2 rounded-md mb-4">
          {error}
        </div>
      )}
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="w-full p-2 rounded bg-black/30 border border-white/20 text-foreground placeholder:text-foreground/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="mb-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description (Optional)"
          className="w-full p-2 rounded bg-black/30 border border-white/20 text-foreground placeholder:text-foreground/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={3}
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-500 transition-colors disabled:bg-gray-500"
      >
        {isSubmitting ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}

// The main page component
export default function DevoraPage() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/tasks");
      const data = await res.json();
      if (data.success) {
        setTasks(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const columns: ITask["status"][] = ["To Do", "In Progress", "Done"];

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">
        Devora Team Task Board
      </h1>

      <AddTaskForm onTaskAdded={fetchTasks} />

      {isLoading ? (
        <div className="text-center text-foreground/80">Loading tasks...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((status) => (
            <div key={status} className="p-4 bg-black/30 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-foreground border-b-2 border-indigo-500 pb-2">
                {status}
              </h2>
              <div>
                {tasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <TaskCard key={task._id as string} task={task} />
                  ))}
                {tasks.filter((task) => task.status === status).length ===
                  0 && (
                  <p className="text-sm text-foreground/60">
                    No tasks in this column.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
