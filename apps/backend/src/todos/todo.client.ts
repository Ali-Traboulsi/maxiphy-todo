import { Injectable } from '@nestjs/common';
import { Priority } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoBodyDto, UpdateTodoBodyDto } from './dto/todos.dto';

@Injectable()
export class TodosClient {
  constructor(private readonly prisma: PrismaService) {}

  async getTodos({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
    return this.prisma.todo.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit || 10,
      skip: (page - 1) * limit || 0,
    });
  }

  async getTodoById(id: string) {
    return this.prisma.todo.findUnique({
      where: { id },
    });
  }

  async createTodo(data: CreateTodoBodyDto) {
    const { userId, ...todoData } = data;

    return this.prisma.todo.create({
      data: {
        user: {
          connect: { id: data.userId },
        },
        ...todoData,
      },
    });
  }

  async updateTodo(id: string, data: UpdateTodoBodyDto) {
    const { userId, ...todoData } = data;

    return this.prisma.todo.update({
      where: { id },
      data: {
        user: userId ? { connect: { id: userId } } : undefined,
        ...todoData,
      },
    });
  }

  async deleteTodo(id: string) {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
  async pinTodo(id: string) {
    return this.prisma.todo.update({
      where: { id },
      data: { pinned: true },
    });
  }

  async unpinTodo(id: string) {
    return this.prisma.todo.update({
      where: { id },
      data: { pinned: false },
    });
  }

  async completeTodo(id: string) {
    return this.prisma.todo.update({
      where: { id },
      data: { completed: true },
    });
  }

  async uncompleteTodo(id: string) {
    return this.prisma.todo.update({
      where: { id },
      data: { completed: false },
    });
  }

  async getPinnedTodos() {
    return this.prisma.todo.findMany({
      where: { pinned: true },
    });
  }

  async getCompletedTodos() {
    return this.prisma.todo.findMany({
      where: { completed: true },
    });
  }

  async getTodosByUserId(userId: string) {
    return this.prisma.todo.findMany({
      where: { userId },
    });
  }

  async getTodosByPriority(priority: Priority) {
    return this.prisma.todo.findMany({
      where: { priority },
    });
  }

  async getTodosByCompletionStatus(completed: boolean) {
    return this.prisma.todo.findMany({
      where: { completed },
    });
  }

  async getTodosByPinnedStatus(pinned: boolean) {
    return this.prisma.todo.findMany({
      where: { pinned },
    });
  }

  async getTodosByUserIdAndPriority(userId: string, priority: Priority) {
    return this.prisma.todo.findMany({
      where: { userId, priority },
    });
  }

  async getTodosByUserIdAndCompletionStatus(
    userId: string,
    completed: boolean,
  ) {
    return this.prisma.todo.findMany({
      where: { userId, completed },
    });
  }

  async getTodosByUserIdAndPinnedStatus(userId: string, pinned: boolean) {
    return this.prisma.todo.findMany({
      where: { userId, pinned },
    });
  }

  async getTodosByPriorityAndCompletionStatus(
    priority: Priority,
    completed: boolean,
  ) {
    return this.prisma.todo.findMany({
      where: { priority, completed },
    });
  }
  async getTodosByPriorityAndPinnedStatus(priority: Priority, pinned: boolean) {
    return this.prisma.todo.findMany({
      where: { priority, pinned },
    });
  }

  async getTodosByUserIdAndPriorityAndCompletionStatus(
    userId: string,
    priority: Priority,
    completed: boolean,
  ) {
    return this.prisma.todo.findMany({
      where: { userId, priority, completed },
    });
  }

  async getTodosByUserIdAndPriorityAndPinnedStatus(
    userId: string,
    priority: Priority,
    pinned: boolean,
  ) {
    return this.prisma.todo.findMany({
      where: { userId, priority, pinned },
    });
  }
  async getTodosByUserIdAndCompletionStatusAndPinnedStatus(
    userId: string,
    completed: boolean,
    pinned: boolean,
  ) {
    return this.prisma.todo.findMany({
      where: { userId, completed, pinned },
    });
  }
}
