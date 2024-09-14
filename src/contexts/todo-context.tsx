import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { AddTodoRequestDto, TodoItem } from "../shared/interfaces";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "./auth-context";

interface TodoContextProps {
  todos: TodoItem[];
  addTodo: (item: AddTodoRequestDto) => void;
  updateTodo: (item: TodoItem) => void;
  deleteToto: (id: string) => void;
}

export const TodoContext = createContext<TodoContextProps>(
  {} as TodoContextProps
);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      const todosString = localStorage.getItem(user.id);
      if (todosString) {
        setTodos(JSON.parse(todosString));
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(user.id, JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (item: AddTodoRequestDto) => {
    setTodos((ps) => {
      ps.push({ ...item, id: uuidv4() });
      return [...ps];
    });
  };
  const updateTodo = (item: TodoItem) => {
    setTodos((ps) => {
      const updated = ps.map((td) => {
        if (td.id === item.id) {
          return item;
        }
        return td;
      });

      return [...updated];
    });
  };
  const deleteToto = (id: string) => {
    setTodos((ps) => {
      const deleted = ps.filter((td) => td.id !== id);
      return [...deleted];
    });
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteToto }}>
      {children}
    </TodoContext.Provider>
  );
};

export function useTodoContext() {
  return useContext(TodoContext);
}
