import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form as AntForm, Input, Button, Card, Flex } from "antd";
import styles from "./register.module.css";
import { useAuthContext } from "../../contexts/auth-context";
import { RegisterRequestDto } from "../../shared/interfaces";
import { useNavigate } from "react-router-dom";
import { PublicPages } from "../routes";

// Define types for form values

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  firstName: Yup.string().required("Fist Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phone: Yup.string().required("Phone is required"),
});

const Register = () => {
  const initialValues: RegisterRequestDto = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  };

  const authContext = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = (values: RegisterRequestDto) => {
    authContext.register(values)
    navigate(PublicPages.login);
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

              <AntForm.Item label="First Name" name="firstName">
                <Field name="firstName">
                  {({ field }: any) => (
                    <Input
                      {...field}
                      placeholder="Enter your first name"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error"
                />
              </AntForm.Item>
              
              <AntForm.Item label="Last Name" name="lastName">
                <Field name="lastName">
                  {({ field }: any) => (
                    <Input
                      {...field}
                      placeholder="Enter your last name"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error"
                />
              </AntForm.Item>
              <AntForm.Item label="Phone" name="phone">
                <Field name="phone">
                  {({ field }: any) => (
                    <Input
                      {...field}
                      placeholder="Enter your phone number"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="phone"
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
                  Register
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
