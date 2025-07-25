"use client";
import { authService } from "@/app/lib/api/auth";
import { todoService, Todo, UpdateTodoRequest } from "@/app/lib/api/todo";
import { EditTodoModal } from "@/components/Todo/todo-edit-modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

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
        const response = await todoService.getTodos({ page, limit });
        setTodos(response.todos || []);
        setTotal(response.pagination?.total || 0);
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

    if (!authService.isAuthenticated()) {
      setError("User not authenticated");
      router.replace("/login");
      return;
    }

    setAdding(true);
    setError("");

    try {
      const token = authService.getToken();

      if (!token) {
        setError("Authentication token not found");
        router.replace("/login");
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
          userId: userProfile.id,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setTodos([res.data, ...todos]);
      setInput("");
    } catch (err: any) {
      console.error("Add todo error:", err);
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        router.replace("/login");
      } else {
        setError("Failed to add todo");
      }
    } finally {
      setAdding(false);
    }
  };

  // Mark todo as completed
  const handleComplete = async (id: string) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, { completed: true });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: true } : todo,
        ),
      );
    } catch {
      setError("Failed to update todo");
    }
  };

  // Open edit modal
  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo);
    setEditModalOpen(true);
  };

  // Handle edit save
  const handleEditSave = async (id: string, data: UpdateTodoRequest) => {
    setUpdating(true);
    const token = authService.getToken();
    try {
      if (!authService.isAuthenticated()) {
        setError("User not authenticated");
        router.replace("/login");
        return;
      }

      const updatedTodo = await todoService.updateTodo(id, data);
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedTodo } : todo,
        ),
      );
    } catch (err: any) {
      throw err; // Re-throw to let the modal handle the error
    } finally {
      setUpdating(false);
    }
  };

  // Close edit modal
  const handleEditClose = () => {
    setEditModalOpen(false);
    setEditingTodo(null);
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

                  <div className="flex gap-2">
                    {!todo.completed && (
                      <>
                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
                          onClick={() => handleEditClick(todo)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-sm"
                          onClick={() => handleComplete(todo.id)}
                        >
                          Complete
                        </button>
                      </>
                    )}
                  </div>
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

      {/* Edit Modal */}
      <EditTodoModal
        isOpen={editModalOpen}
        onClose={handleEditClose}
        todo={editingTodo}
        onSave={handleEditSave}
        loading={updating}
      />
    </main>
  );
}
