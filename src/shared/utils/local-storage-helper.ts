import { TodoItem, User } from "../interfaces";

export default class StorageHelper {
  private static _instance: StorageHelper;
  

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public addUser(user: User) {}

  public checkUser(email: string, password: string) {}

  public updateUser(user: User) {}

  public addTodo(todo: TodoItem) {}

  public updateTodo(todo: TodoItem) {}

  public deleteTodo(todoId: string) {}
}
