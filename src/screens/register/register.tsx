import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form as AntForm, Input, Button, Card, Flex } from "antd";
import styles from './register.module.css'

// Define types for form values
interface RegisterFormValues {
  email: string;
  password: string;
}

const Register = () => {
  const initialValues: RegisterFormValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = (values: RegisterFormValues) => {
    console.log("Login data:", values);
    // Implement login logic here
  };

  return (
    <Flex align="center" justify="center" className={styles.container}>
      <Card title="Register" style={{ width: "400px" }}>
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
                <ErrorMessage name="email" component="div" className="error" />
              </AntForm.Item>

              <AntForm.Item label="Password" name="password">
                <Field name="password" type="password">
                  {({ field }: any) => (
                    <Input.Password
                      {...field}
                      placeholder="Enter your password"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </AntForm.Item>
              <AntForm.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Login
                </Button>
              </AntForm.Item>
            </AntForm>
          )}
        </Formik>
      </Card>
    </Flex>
  );
};

export default Register;
