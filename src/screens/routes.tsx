import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutesLayout from "./private-routes-layout";
import PublicRoutesLayout from "./public-routes-layout";
import Login from "./login/login";
import Register from "./register/register";
import Home from "./home/home";

export enum PublicPages {
  login = "/login",
  register = "/register",
}

export enum PrivatePages {
  home = "/home",
  profile = "/profile",
}

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoutesLayout />}>
          <Route
            path={PublicPages.login.toString().replace("/", "")}
            element={<Login />}
          />
          <Route
            path={PublicPages.register.toString().replace("/", "")}
            element={<Register />}
          />
        </Route>
        <Route path="/" element={<PrivateRoutesLayout />}>
          <Route
            path={PrivatePages.profile.toString().replace("/", "")}
            element={<Login />}
          />
          <Route
            path={PrivatePages.home.toString().replace("/", "")}
            element={<Home />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
