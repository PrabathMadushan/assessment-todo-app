import { Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import NavBar from "../shared/components/nav-bar/nav-bar";

const PrivateRoutesLayout = () => {
  return (
    <Layout>
      <NavBar/>
      <Content style={{ padding: "0 48px" }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default PrivateRoutesLayout;
