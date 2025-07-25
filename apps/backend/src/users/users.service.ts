import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserCreateDto, UserUpdateDto } from './dto/user.dto';
import { UsersClient } from './users.client';

@Injectable()
export class UsersService {
  constructor(private readonly userClient: UsersClient) {}

  async findByEmail(email: User['email']) {
    return this.userClient.findByEmail(email);
  }

  async create(userData: UserCreateDto) {
    return this.userClient.create(userData);
  }

  async update(id: User['id'], userData: UserUpdateDto) {
    return this.userClient.update(id, userData);
  }

  async delete(id: User['id']) {
    return this.userClient.delete(id);
  }

  async findAll() {
    return this.userClient.findAll();
  }

  async findById(id: User['id']) {
    return this.userClient.findById(id);
  }

  async findAllUserTodos(id: User['id']) {
    return this.userClient.findAllUserTodos(id);
  }

  async findAllUserTodosSorted(
    id: User['id'],
    sortBy: 'priority' | 'date' | 'completed' = 'date',
    sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    return this.userClient.findAllUserTodosSorted(id, sortBy, sortOrder);
  }

  async findAllUserTodosByCompletion(id: User['id'], completed: boolean) {
    return this.userClient.findAllUserTodosByCompletion(id, completed);
  }
}
