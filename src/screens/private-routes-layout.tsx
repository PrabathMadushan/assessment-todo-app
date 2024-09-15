import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import NavBar from "../shared/components/nav-bar/nav-bar";

const PrivateRoutesLayout = () => {
  return (
    <Layout>
      <NavBar/>
      <Content>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Todo ©{new Date().getFullYear()} Created by Prabhath Madhushan
      </Footer>
    </Layout>
  );
};

export default PrivateRoutesLayout;
