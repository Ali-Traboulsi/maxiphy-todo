import { Injectable } from '@nestjs/common';
import { Priority } from 'generated/prisma';
import { CreateTodoBodyDto, UpdateTodoBodyDto } from './dto/todos.dto';
import { TodosClient } from './todo.client';

@Injectable()
export class TodosService {
  constructor(private readonly todosClient: TodosClient) {}

  async getTodos() {
    return this.todosClient.getTodos();
  }

  async getTodoById(id: string) {
    return this.todosClient.getTodoById(id);
  }

  async createTodo(data: CreateTodoBodyDto) {
    return this.todosClient.createTodo(data);
  }

  async updateTodo(id: string, data: UpdateTodoBodyDto) {
    return this.todosClient.updateTodo(id, data);
  }

  async deleteTodo(id: string) {
    return this.todosClient.deleteTodo(id);
  }

  async pinTodo(id: string) {
    return this.todosClient.pinTodo(id);
  }

  async unpinTodo(id: string) {
    return this.todosClient.unpinTodo(id);
  }

  async completeTodo(id: string) {
    return this.todosClient.completeTodo(id);
  }

  async uncompleteTodo(id: string) {
    return this.todosClient.uncompleteTodo(id);
  }

  async getPinnedTodos() {
    return this.todosClient.getPinnedTodos();
  }

  async getCompletedTodos() {
    return this.todosClient.getCompletedTodos();
  }

  async getTodosByUserId(userId: string) {
    return this.todosClient.getTodosByUserId(userId);
  }

  async getTodosByPriority(priority: Priority) {
    return this.todosClient.getTodosByPriority(priority);
  }

  async getTodosByCompletionStatus(completed: boolean) {
    return this.todosClient.getTodosByCompletionStatus(completed);
  }

  async getTodosByPinnedStatus(pinned: boolean) {
    return this.todosClient.getTodosByPinnedStatus(pinned);
  }

  async getTodosByUserIdAndPriority(userId: string, priority: Priority) {
    return this.todosClient.getTodosByUserIdAndPriority(userId, priority);
  }

  async getTodosByUserIdAndCompletionStatus(
    userId: string,
    completed: boolean,
  ) {
    return this.todosClient.getTodosByUserIdAndCompletionStatus(
      userId,
      completed,
    );
  }

  async getTodosByUserIdAndPinnedStatus(userId: string, pinned: boolean) {
    return this.todosClient.getTodosByUserIdAndPinnedStatus(userId, pinned);
  }

  async getTodosByPriorityAndCompletionStatus(
    priority: Priority,
    completed: boolean,
  ) {
    return this.todosClient.getTodosByPriorityAndCompletionStatus(
      priority,
      completed,
    );
  }

  async getTodosByPriorityAndPinnedStatus(priority: Priority, pinned: boolean) {
    return this.todosClient.getTodosByPriorityAndPinnedStatus(priority, pinned);
  }
}
