import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserCreateDto, UserUpdateDto } from './dto/user.dto';

@Injectable()
export class UsersClient {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves a user from the database by their email address.
   *
   * @param email - The email address of the user to find.
   * @returns A promise that resolves to the user object if found, or `null` if no user exists with the given email.
   */
  async findByEmail(email: User['email']) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Creates a new user in the database using the provided user data.
   *
   * @param userData - The data required to create a new user.
   * @returns A promise that resolves to the newly created user.
   */
  async create(userData: UserCreateDto) {
    return this.prisma.user.create({
      data: userData,
    });
  }

  /**
   * Updates a user record in the database with the specified data.
   *
   * @param id - The unique identifier of the user to update.
   * @param userData - An object containing the fields to update for the user.
   * @returns A promise that resolves to the updated user record.
   */
  async update(id: User['id'], userData: UserUpdateDto) {
    return this.prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  async delete(id: User['id']) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: User['id']) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Retrieves a user by their unique ID along with all associated todos.
   *
   * @param id - The unique identifier of the user.
   * @returns A promise that resolves to the user object including their todos.
   * @throws If no user with the specified ID is found.
   */
  async findAllUserTodos(id: User['id']) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
      include: { todos: true },
    });
  }

  /**
   * Find all todos for a user, sorted by a given field and order.
   * @param id User ID
   * @param sortBy Field to sort by ('priority', 'date', 'completed')
   * @param sortOrder 'asc' or 'desc'
   */
  async findAllUserTodosSorted(
    id: User['id'],
    sortBy: 'priority' | 'date' | 'completed' = 'date',
    sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
      include: {
        todos: {
          orderBy: { [sortBy]: sortOrder },
        },
      },
    });
  }

  /**
   * Find all todos for a user filtered by completion status.
   * @param id User ID
   * @param completed true or false
   */
  async findAllUserTodosByCompletion(id: User['id'], completed: boolean) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
      include: {
        todos: {
          where: { completed },
        },
      },
    });
  }
}
