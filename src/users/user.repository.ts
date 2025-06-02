import { User } from './entities/user.entity';

export class UserRepository {
  private users: User[] = [
    {
      id: '114bf43a-d10d-4caa-9a69-1ab7b9f0c297',
      login: 'user1',
      password: 'password1',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: 'fdaf407a-6ff7-4963-a242-b6f5c72967da',
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
