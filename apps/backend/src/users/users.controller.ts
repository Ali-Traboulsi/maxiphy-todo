import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { User } from 'generated/prisma';
import { UserCreateDto, UserUpdateDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(id: User['id']) {
    return this.usersService.findById(id);
  }

  @Get('email/:email')
  async findByEmail(email: User['email']) {
    return this.usersService.findByEmail(email);
  }

  @Post()
  async create(@Body() userData: UserCreateDto) {
    return this.usersService.create(userData);
  }

  @Put(':id')
  async update(@Body() userData: UserUpdateDto, id: User['id']) {
    return this.usersService.update(id, userData);
  }

  @Get(':id/todos/sorted')
  async findAllUserTodosSorted(
    @Param('id') id: User['id'],
    @Query('sortBy') sortBy: 'priority' | 'date' | 'completed' = 'date',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    return this.usersService.findAllUserTodosSorted(id, sortBy, sortOrder);
  }

  @Get(':id/todos/completion')
  async findAllUserTodosByCompletion(
    @Param('id') id: User['id'],
    @Query('completed') completed: string,
  ) {
    // Convert query param to boolean
    const completedBool = completed === 'true';
    return this.usersService.findAllUserTodosByCompletion(id, completedBool);
  }

  @Get(':id/todos')
  async findAllUserTodos(@Param('id') id: User['id']) {
    return this.usersService.findAllUserTodos(id);
  }
}
