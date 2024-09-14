import {  Form as AntForm,Button,Flex,Input,Modal } from "antd";
import { ErrorMessage, Field, Formik } from "formik";
import { AddTodoRequestDto } from "../../interfaces";
import * as Yup from "yup";
import { useTodoContext } from "../../../contexts/todo-context";

interface IProps {
  open: boolean;
  onCancel: () => void;
}

const AddTodoModal = (props: IProps) => {
  const initialValues: AddTodoRequestDto = { title: "", description: "" };
  const {addTodo} = useTodoContext();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });


  const onSubmit = (values: AddTodoRequestDto,resetForm:()=>void) => {
    addTodo(values);
    resetForm();
  };

  return (
    <Modal
      title="Add Todo"
      open={props.open}
      onCancel={props.onCancel}
      footer={null}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values,{resetForm})=>{
            onSubmit(values,resetForm);
        }}
      >
        {({ handleSubmit }) => (
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

            <AntForm.Item
              label="Description"
              name="description"
            >
              <Field name="description" >
                {({ field }: any) => (
                  <Input
                    {...field}
                    placeholder="Enter your description"
                  />
                )}
              </Field>
              <ErrorMessage name="description" component="div" className="error" />
            </AntForm.Item>
         
            <AntForm.Item style={{ marginBottom: "8px" }}>
              <Flex justify="end">
              <Button
                type="default"
                htmlType="button"
                style={{marginRight:"5px"}}
                onClick={props.onCancel}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
              >
                Add
              </Button>
              </Flex>
            </AntForm.Item>
          </AntForm>
        )}
      </Formik>
    </Modal>
  );
};

export default AddTodoModal;
