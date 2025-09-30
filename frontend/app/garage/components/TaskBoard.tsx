"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

type Task = {
  id: string;
  car_id: string;
  title: string;
  completed: boolean;
};

export function TaskBoard({ carId }: { carId: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("car_tasks")
        .select("*")
        .eq("car_id", carId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching tasks:", error.message);
      } else {
        setTasks(data || []);
      }

      setLoading(false);
    };

    fetchTasks();

    // realtime updates
    const channel = supabase
      .channel("car-tasks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "car_tasks", filter: `car_id=eq.${carId}` },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setTasks((prev) => [...prev, payload.new as Task]);
          }
          if (payload.eventType === "UPDATE") {
            setTasks((prev) =>
              prev.map((t) =>
                t.id === (payload.new as Task).id ? (payload.new as Task) : t
              )
            );
          }
          if (payload.eventType === "DELETE") {
            setTasks((prev) =>
              prev.filter((t) => t.id !== (payload.old as Task).id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [carId]);

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const { error } = await supabase.from("car_tasks").insert({
      car_id: carId,
      title: newTask.trim(),
      completed: false,
    });

    if (error) {
      console.error("Error adding task:", error.message);
    } else {
      setNewTask("");
    }
  };

  const toggleTask = async (task: Task) => {
    const { error } = await supabase
      .from("car_tasks")
      .update({ completed: !task.completed })
      .eq("id", task.id);

    if (error) {
      console.error("Error updating task:", error.message);
    }
  };

  return (
    <div className="rounded-lg border bg-black/40 backdrop-blur p-4 shadow-lg shadow-purple-700/30">
      <h2 className="font-semibold mb-4 text-white">Tasks</h2>

      {loading ? (
        <p className="text-neutral-400">Loading tasks...</p>
      ) : (
        <ul className="space-y-2 mb-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between text-sm text-neutral-300"
            >
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task)}
                  className="accent-purple-600"
                />
                <span className={task.completed ? "line-through text-neutral-500" : ""}>
                  {task.title}
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={addTask} className="flex gap-2">
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 rounded border p-2 bg-neutral-800 text-white text-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br text-white text-sm"
        >
          Add
        </button>
      </form>
    </div>
  );
}
