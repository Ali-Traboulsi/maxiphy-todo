import axios from "axios";
import { authService } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface Todo {
  id: string;
  description: string;
  priority: Priority;
  date: string;
  completed: boolean;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CreateTodoRequest {
  description: string;
  priority?: Priority;
  date?: string;
}

export interface UpdateTodoRequest {
  description?: string;
  priority?: Priority;
  completed?: boolean;
  pinned?: boolean;
}

export interface TodoQuery {
  completed?: boolean;
  page?: number;
  limit?: number;
  sortBy?: "date" | "priority" | "createdAt";
  sortOrder?: "asc" | "desc";
  search?: string;
  priority?: Priority;
}

export interface TodoResponse {
  todos: Todo[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface TodoStats {
  total: number;
  completed: number;
  remaining: number;
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
  pinned: number;
}

class TodoService {
  private baseURL = `${API_URL}/todos`;

  private getAuthHeaders() {
    const token = authService.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async getTodos(query: TodoQuery = {}): Promise<TodoResponse> {
    const response = await axios.get(this.baseURL, {
      headers: this.getAuthHeaders(),
      params: query,
    });
    return response.data;
  }

  async getTodo(id: string): Promise<Todo> {
    const response = await axios.get(`${this.baseURL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return response.data;
  }

  async createTodo(data: CreateTodoRequest): Promise<Todo> {
    const response = await axios.post(this.baseURL, data, {
      headers: this.getAuthHeaders(),
    });
    return response.data;
  }

  async updateTodo(id: string, data: UpdateTodoRequest): Promise<Todo> {
    const response = await axios.put(`${this.baseURL}/${id}`, data, {
      headers: this.getAuthHeaders(),
    });
    return response.data;
  }

  async deleteTodo(id: string): Promise<void> {
    await axios.delete(`${this.baseURL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  async togglePin(id: string): Promise<Todo> {
    const response = await axios.put(
      `${this.baseURL}/${id}/pin`,
      {},
      {
        headers: this.getAuthHeaders(),
      },
    );
    return response.data;
  }

  async getStats(): Promise<TodoStats> {
    const response = await axios.get(`${this.baseURL}/stats`, {
      headers: this.getAuthHeaders(),
    });
    return response.data;
  }
}

export const todoService = new TodoService();
