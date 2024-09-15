import { Button, Checkbox, Col, Flex, Row } from "antd";
import { TodoItem } from "../../interfaces";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import styles from "./todo-card.module.css";
import AddTodoModal from "../add-todo-modal/add-todo-modal";
import { useState } from "react";

interface IProps {
  data: TodoItem;
  onDelete: (id: string) => void;
  onComplete: (id: string, value: boolean) => void;
}

const TodoCard = (props: IProps) => {
  const [show, setShow] = useState(false);

  return (
    <Row align={"middle"} justify={"space-between"} className={styles.todoCard}>
      <Col xs={4}>
        <strong>{props.data.title}</strong>
      </Col>
      <Col xs={14}>{props.data.description}</Col>
      <Col >
        <Flex gap="small">
          <Checkbox
            checked={props.data.complete}
            onChange={(e) => {
              props.onComplete(props.data.id, e.target.checked);
            }}
          ></Checkbox>
          <Button
            type="primary"
            onClick={() => {
              setShow(true);
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              props.onDelete(props.data.id);
            }}
          >
            <DeleteOutlined />
          </Button>
        </Flex>
      </Col>
      <AddTodoModal
        open={show}
        onCancel={() => setShow(false)}
        data={props.data}
      />
    </Row>
  );
};

export default TodoCard;
