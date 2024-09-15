import { Form as AntForm, Button, Flex, Input, Modal } from "antd";
import { ErrorMessage, Field, Formik } from "formik";
import { AddTodoRequestDto, TodoItem } from "../../interfaces";
import * as Yup from "yup";
import { useTodoContext } from "../../../contexts/todo-context";
import { useEffect } from "react";

interface IProps {
  open: boolean;
  onCancel: () => void;
  data?: TodoItem;
}

const AddTodoModal = (props: IProps) => {
  const initialValues: Omit<AddTodoRequestDto, "complete"> = {
    title: props.data?.title || "",
    description: props.data?.description || "",
  };
  const { addTodo, updateTodo } = useTodoContext();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });

  const onSubmit = (values: AddTodoRequestDto, resetForm: () => void) => {
    if (props.data) {
      updateTodo({ ...props.data, ...values });
    } else {
      addTodo(values);
    }
    resetForm();
    props.onCancel();
  };

  return (
    <Modal
      title={props.data ? "Update Todo" : "Add Todo"}
      open={props.open}
      onCancel={props.onCancel}
      footer={null}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit({ ...values, complete: false }, resetForm);
        }}
      >
        {({ handleSubmit, setValues }) => {
          useEffect(() => {
            setValues({
              title: props.data?.title || "",
              description: props.data?.description || "",
            });
          }, [props.data]);

          return (
            <AntForm onFinish={handleSubmit} layout={"vertical"}>
              <AntForm.Item
                label="Title"
                name="title"
                style={{ marginBottom: "8px" }}
              >
                <Field name="title">
                  {({ field }: any) => (
                    <Input {...field} placeholder="Enter your title" />
                  )}
                </Field>
                <ErrorMessage name="title" component="div" className="error" />
              </AntForm.Item>

              <AntForm.Item label="Description" name="description">
                <Field name="description">
                  {({ field }: any) => (
                    <Input {...field} placeholder="Enter your description" />
                  )}
                </Field>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error"
                />
              </AntForm.Item>

              <AntForm.Item style={{ marginBottom: "8px" }}>
                <Flex justify="end">
                  <Button
                    type="default"
                    htmlType="button"
                    style={{ marginRight: "5px" }}
                    onClick={props.onCancel}
                  >
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    {props.data ? "Update" : "Add"}
                  </Button>
                </Flex>
              </AntForm.Item>
            </AntForm>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default AddTodoModal;
