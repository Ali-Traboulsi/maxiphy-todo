"use client";
import React, { useState, useEffect } from "react";
import { Todo, Priority, UpdateTodoRequest } from "@/app/lib/api/todo";
import { Modal } from "@/components/ui/modal";

interface EditTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo | null;
  onSave: (id: string, data: UpdateTodoRequest) => Promise<void>;
  loading?: boolean;
}

export const EditTodoModal: React.FC<EditTodoModalProps> = ({
  isOpen,
  onClose,
  todo,
  onSave,
  loading = false,
}) => {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  // Reset form when todo changes or modal opens
  useEffect(() => {
    if (todo && isOpen) {
      setDescription(todo.description || "");
      setPriority(todo.priority || Priority.MEDIUM);
      setDate(todo.date ? new Date(todo.date).toISOString().split("T")[0] : "");
      setError("");
    }
  }, [todo, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo) return;

    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    setError("");

    try {
      const updateData: UpdateTodoRequest = {
        description: description.trim(),
        priority,
        date: date ? new Date(date).toISOString() : undefined,
      };

      await onSave(todo.id, updateData);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update todo");
    }
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  if (!todo) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Todo">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description *
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            rows={3}
            placeholder="Enter todo description..."
            disabled={loading}
            required
          />
        </div>

        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            disabled={loading}
          >
            <option value={Priority.LOW}>Low</option>
            <option value={Priority.MEDIUM}>Medium</option>
            <option value={Priority.HIGH}>High</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Due Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            disabled={loading}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
