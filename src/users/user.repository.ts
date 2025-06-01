import { User } from './entities/user.entity';
import { randomUUID } from 'crypto';

export class UserRepository {
  private users: User[] = [
    {
      id: randomUUID(),
      login: 'user1',
      password: 'password1',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: randomUUID(),
      login: 'user2',
      password: 'password2',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(({ id }) => user.id === id);
    if (userIndex === -1) {
      this.users.push(user);
    }
    this.users[userIndex] = user;
    return user;
  }

  async delete(id: string): Promise<boolean> {
    const countUsersBeforeDelete = this.users.length;
    this.users = this.users.filter((user) => user.id !== id);
    return this.users.length < countUsersBeforeDelete;
  }
}
