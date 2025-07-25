"use client";
import { authService } from "@/app/lib/api/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export interface Todo {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  date: string;
}
export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  // Redirect if not authenticated and fetch todos with pagination
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.replace("/login");
      return;
    }
    const fetchTodos = async () => {
      setLoading(true);
      setError("");
      try {
        const token = authService.getToken();
        const res = await axios.get(`${API_URL}/todos`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { page, limit },
        });
        setTodos(res.data.todos || res.data); // support both { todos, total } and array
        setTotal(res.data.total || 0);
      } catch (err: any) {
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [page, limit, router]);

  // Add new todo
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setAdding(true);
    setError("");
    try {
      const token = authService.getToken();

      if (!token) {
        setError("User not authenticated");
        setAdding(false);
        return;
      }
      const userProfile = await authService.getProfile(token);
      const res = await axios.post(
        `${API_URL}/todos`,
        {
          title: input,
          description: input,
          priority: "MEDIUM",
          completed: false,
          pinned: false,
          userId: userProfile.id, // Optional userId if needed
        }, // Default priority
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos([res.data, ...todos]);
      setInput("");
    } catch (err: any) {
      setError("Failed to add todo");
    } finally {
      setAdding(false);
    }
  };

  // Mark todo as completed
  const handleComplete = async (id: string) => {
    try {
      const token = authService.getToken();
      await axios.patch(
        `${API_URL}/todos/${id}`,
        { completed: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: true } : todo
        )
      );
    } catch {
      setError("Failed to update todo");
    }
  };

  return (
    <main className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
        My TODOs
      </h1>
      <form className="flex gap-2 mb-6" onSubmit={handleAdd}>
        <input
          className="border px-2 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
          disabled={adding}
        />
        <button
          className="bg-purple-600 text-white px-4 py-1 rounded font-semibold hover:bg-purple-700 transition"
          type="submit"
          disabled={adding}
        >
          {adding ? "Adding..." : "Add"}
        </button>
      </form>
      {error && (
        <div className="text-red-600 text-sm text-center mb-4">{error}</div>
      )}
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <>
          <ul className="space-y-3">
            {todos.length === 0 ? (
              <li className="text-gray-500 text-center">No todos yet!</li>
            ) : (
              todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`flex items-center justify-between p-3 rounded shadow ${
                    todo.completed
                      ? "bg-green-100 line-through text-gray-400"
                      : "bg-white"
                  }`}
                >
                  <span>
                    {todo.description}
                    <span
                      className={`ml-2 px-2 py-1 rounded text-xs font-bold ${
                        todo.priority === "HIGH"
                          ? "bg-red-200 text-red-700"
                          : todo.priority === "MEDIUM"
                            ? "bg-yellow-200 text-yellow-700"
                            : "bg-blue-200 text-blue-700"
                      }`}
                    >
                      {todo.priority}
                    </span>
                  </span>
                  {!todo.completed && (
                    <button
                      className="ml-4 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      onClick={() => handleComplete(todo.id)}
                    >
                      Complete
                    </button>
                  )}
                </li>
              ))
            )}
          </ul>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {page}
              {total > 0 && ` of ${Math.ceil(total / limit)}`}
            </span>
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => setPage((p) => p + 1)}
              disabled={
                todos.length < limit ||
                (total > 0 && page >= Math.ceil(total / limit))
              }
            >
              Next
            </button>
            <select
              className="ml-4 px-2 py-1 border rounded"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n} per page
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </main>
  );
}
