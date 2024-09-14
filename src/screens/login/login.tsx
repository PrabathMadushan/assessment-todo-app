import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Form as AntForm, Input, Button, Card, Flex } from "antd";
import styles from "./login.module.css";
import { useAuthContext } from "../../contexts/auth-context";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PublicPages } from "../routes";

// Define types for form values
interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const initialValues: LoginFormValues = { email: "", password: "" };

  const validationSchema = Yup.object({});

  const authContext = useAuthContext();

  const [error, setError] = useState(false);

  const onSubmit = (values: LoginFormValues) => {
    console.log("Login data:", values);
    const logged = authContext.login(values.email, values.password);
    if (!logged){
      setError(true)
    }else{
      setError(false);
    }
  };

  return (
    <Flex align="center" justify="center" className={styles.container}>
      <Card title="Login" style={{ width: "400px" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <AntForm onFinish={handleSubmit} layout={"vertical"}>
              <AntForm.Item
                label="Email"
                name="email"
                style={{ marginBottom: "8px" }}
              >
                <Field name="email">
                  {({ field }: any) => (
                    <Input {...field} placeholder="Enter your email" />
                  )}
                </Field>
              </AntForm.Item>

              <AntForm.Item
                label="Password"
                name="password"
                style={{ marginBottom: "8px" }}
              >
                <Field name="password" type="password">
                  {({ field }: any) => (
                    <Input.Password
                      {...field}
                      placeholder="Enter your password"
                    />
                  )}
                </Field>
              </AntForm.Item>
              <div style={{ marginBottom: "16px" }} className="error">
                {" "}
                {error && "Email or Password is incorrect"}
              </div>
              <AntForm.Item style={{ marginBottom: "8px" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Login
                </Button>
              </AntForm.Item>
              <AntForm.Item>
                  Don't have a account. Please <Link to={PublicPages.register}>Register</Link>.
              </AntForm.Item>
            </AntForm>
          )}
        </Formik>
      </Card>
    </Flex>
  );
};

export default Login;
