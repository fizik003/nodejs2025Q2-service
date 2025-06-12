export class User {
  id: string; // UUID v4
  login: string;
  password: string;
  version: number; // Increments on update
  createdAt: number; // Timestamp of creation
  updatedAt: number; // Timestamp of last update
}

export type UserWithoutPassword = Omit<User, 'password'>;

export interface UserUpdateInputI {
  version: number;
  password: string;
}

export interface UserCreateInputI {
  createdAt: number;
  updatedAt: number;
  password: string;
  login: string;
}
