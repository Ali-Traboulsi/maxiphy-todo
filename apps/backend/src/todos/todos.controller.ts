import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Priority } from '@prisma/client';
import { CurrentUser } from 'src/decorators/getters/currentUser.decorator';
import { CreateTodoBodyDto, TodosQueryParamsDto } from './dto/todos.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async getTodos(@Query() query: TodosQueryParamsDto) {
    return {
      todos: await this.todosService.getTodos(query),
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
    };
  }

  @Get(':id')
  async getTodoById(@Param('id') id: string) {
    return this.todosService.getTodoById(id);
  }

  @Post()
  async createTodo(@Body() data: CreateTodoBodyDto) {
    return this.todosService.createTodo(data);
  }

  @Put(':id')
  async updateTodo(@Param('id') id: string, @Body() data: CreateTodoBodyDto) {
    return this.todosService.updateTodo(id, data);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    return this.todosService.deleteTodo(id);
  }

  @Put(':id/pin')
  async pinTodo(@Param('id') id: string) {
    return this.todosService.pinTodo(id);
  }

  @Put(':id/unpin')
  async unpinTodo(@Param('id') id: string) {
    return this.todosService.unpinTodo(id);
  }

  @Put(':id/complete')
  async completeTodo(@Param('id') id: string) {
    return this.todosService.completeTodo(id);
  }

  @Put(':id/uncomplete')
  async uncompleteTodo(@Param('id') id: string) {
    return this.todosService.uncompleteTodo(id);
  }

  @Get('pinned')
  async getPinnedTodos() {
    return this.todosService.getPinnedTodos();
  }

  @Get('completed')
  async getCompletedTodos() {
    return this.todosService.getCompletedTodos();
  }

  @Get('user/:userId')
  async getTodosByUserId(@CurrentUser() userId: string) {
    return this.todosService.getTodosByUserId(userId);
  }

  @Get('priority/:priority')
  async getTodosByPriority(@Param('priority') priority: Priority) {
    return this.todosService.getTodosByPriority(priority);
  }

  @Get('completion/:completed')
  async getTodosByCompletionStatus(@Param('completed') completed: boolean) {
    return this.todosService.getTodosByCompletionStatus(completed);
  }

  @Get('pinned/:pinned')
  async getTodosByPinnedStatus(@Param('pinned') pinned: boolean) {
    return this.todosService.getTodosByPinnedStatus(pinned);
  }

  @Get('user/:userId/priority/:priority')
  async getTodosByUserIdAndPriority(
    @CurrentUser() userId: string,
    @Param('priority') priority: Priority,
  ) {
    return this.todosService.getTodosByUserIdAndPriority(userId, priority);
  }
}
