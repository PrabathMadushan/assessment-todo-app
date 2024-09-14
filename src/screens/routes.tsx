import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoutesLayout from "./private-routes-layout";
import PublicRoutesLayout from "./public-routes-layout";
import Login from "./login/login";
import Register from "./register/register";
import Home from "./home/home";
import { useAuthContext } from "../contexts/auth-context";
import Profile from "./profile/profile";

export enum PublicPages {
  login = "/login",
  register = "/register",
}

export enum PrivatePages {
  home = "/home",
  profile = "/profile",
}

const AppRoutes = () => {
  const authContext = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        {!authContext.isAuth && (
          <Route path="/" element={<PublicRoutesLayout />}>
            <Route index element={<Navigate to={PublicPages.login} />} />
            <Route
              path={PublicPages.login.toString().replace("/", "")}
              element={<Login />}
            />
            <Route
              path={PublicPages.register.toString().replace("/", "")}
              element={<Register />}
            />
            <Route path="*" element={<Navigate to={PublicPages.login} />} />
          </Route>
        )}
        {authContext.isAuth && (
          <Route path="/" element={<PrivateRoutesLayout />}>
            <Route index element={<Navigate to={PrivatePages.home} />} />
           
            <Route
              path={PrivatePages.profile.toString().replace("/", "")}
              element={<Profile />}
            />
            <Route
              path={PrivatePages.home.toString().replace("/", "")}
              element={<Home />}
            />
             <Route path="*" element={<Navigate to={PrivatePages.home} />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
