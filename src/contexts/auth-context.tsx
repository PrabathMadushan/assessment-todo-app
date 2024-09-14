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
const C_USER_KEY = "c_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedUser, setLoggedUser] = useState<User>();
  const [users, setUsers] = useState<User[]>([]);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const usersString = localStorage.getItem(USERS_KEY);
    const cUserString = localStorage.getItem(C_USER_KEY);
    setUsers([]);
    if (usersString) {
      const users = JSON.parse(usersString);
      setUsers(users);
    }
    if(cUserString){
      const user = JSON.parse(cUserString);
      setLoggedUser(user);
      setIsAuth(true)
    }
  }, []);

  useEffect(() => {
    if(users.length>0){
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  }, [users]);

  const login = (email: string, password: string) => {
    const [user] = users.filter(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setLoggedUser(user);
      localStorage.setItem(C_USER_KEY,JSON.stringify(user))
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
    localStorage.setItem(C_USER_KEY,"")
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
