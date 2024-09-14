import "./App.css";
import { AuthProvider } from "./contexts/auth-context";
import AppRoutes from "./screens/routes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
