import { Body, Controller, Param } from '@nestjs/common';
import { Priority } from 'generated/prisma';
import { CurrentUser } from 'src/decorators/getters/currentUser.decorator';
import { CreateTodoBodyDto } from './dto/todos.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  async getTodos() {
    return this.todosService.getTodos();
  }

  async getTodoById(@Param('id') id: string) {
    return this.todosService.getTodoById(id);
  }

  async createTodo(@Body() data: CreateTodoBodyDto) {
    return this.todosService.createTodo(data);
  }

  async updateTodo(@Param('id') id: string, @Body() data: CreateTodoBodyDto) {
    return this.todosService.updateTodo(id, data);
  }

  async deleteTodo(@Param('id') id: string) {
    return this.todosService.deleteTodo(id);
  }

  async pinTodo(@Param('id') id: string) {
    return this.todosService.pinTodo(id);
  }

  async unpinTodo(@Param('id') id: string) {
    return this.todosService.unpinTodo(id);
  }

  async completeTodo(@Param('id') id: string) {
    return this.todosService.completeTodo(id);
  }

  async uncompleteTodo(@Param('id') id: string) {
    return this.todosService.uncompleteTodo(id);
  }

  async getPinnedTodos() {
    return this.todosService.getPinnedTodos();
  }
  async getCompletedTodos() {
    return this.todosService.getCompletedTodos();
  }

  async getTodosByUserId(@CurrentUser() userId: string) {
    return this.todosService.getTodosByUserId(userId);
  }

  async getTodosByPriority(@Param('priority') priority: Priority) {
    return this.todosService.getTodosByPriority(priority);
  }

  async getTodosByCompletionStatus(@Param('completed') completed: boolean) {
    return this.todosService.getTodosByCompletionStatus(completed);
  }

  async getTodosByPinnedStatus(@Param('pinned') pinned: boolean) {
    return this.todosService.getTodosByPinnedStatus(pinned);
  }

  async getTodosByUserIdAndPriority(
    @CurrentUser() userId: string,
    @Param('priority') priority: Priority,
  ) {
    return this.todosService.getTodosByUserIdAndPriority(userId, priority);
  }
}
