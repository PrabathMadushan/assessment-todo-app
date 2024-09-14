import "./App.css";
import { AuthProvider } from "./contexts/auth-context";
import { TodoProvider } from "./contexts/todo-context";
import AppRoutes from "./screens/routes";

function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <AppRoutes />
      </TodoProvider>
    </AuthProvider>
  );
}

export default App;
