import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { RegisterRequestDto, User } from "../shared/interfaces";
import { v4 as uuidv4 } from 'uuid'

interface AuthContextProps {
  user?: User;
  isAuth: boolean;
  login: (email: string, password: string) => boolean;
  register: (userData: RegisterRequestDto) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

const USERS_KEY = "users";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedUser, setLoggedUser] = useState<User>();
  const [users, setUsers] = useState<User[]>([]);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const usersString = localStorage.getItem(USERS_KEY);
    setUsers([]);
    if (usersString) {
      const users = JSON.parse(usersString);
      setUsers(users);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  const login = (email: string, password: string) => {
    const [user] = users.filter(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setLoggedUser(user);
      setIsAuth(true)
      return true;
    } else {
      return false;
    }
  };
  const register = (userData: RegisterRequestDto) => {
    setUsers((ps) => {
      ps.push({...userData,id:uuidv4()});
      return [...ps];
    });
  };
  const logout = () => {
    setIsAuth(false)
    setLoggedUser(undefined)
  };

  return (
    <AuthContext.Provider
      value={{ user: loggedUser, login, logout, register, isAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
