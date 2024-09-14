import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { useAuthContext } from "../../../contexts/auth-context";
import { PrivatePages } from "../../../screens/routes";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={[
          { key:PrivatePages.home, label: "Home" },
          { key:PrivatePages.profile, label: "Profile" },
        ]}
        onClick={(e) => {
          navigate(e.key);
        }}
        style={{ flex: 1, minWidth: 0 }}
      />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        onClick={() => {
          logout();
        }}
        selectable={false}
        items={[{ key: "logout", label: "Logout" }]}
        style={{ flex: 1, minWidth: 0, justifyContent: "flex-end" }}
      />
    </Header>
  );
};

export default NavBar;
