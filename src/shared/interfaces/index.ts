export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export type RegisterRequestDto = Omit<User, "id">;

export interface TodoItem {
  id: string;
  title: string;
  description: string;
}

export type AddTodoRequestDto = Omit<TodoItem, "id">;