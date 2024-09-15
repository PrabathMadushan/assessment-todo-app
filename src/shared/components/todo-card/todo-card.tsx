import { Button, Checkbox, Col, Flex, Row } from "antd";
import { TodoItem } from "../../interfaces";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import styles from './todo-card.module.css'

interface IProps {
  data: TodoItem;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
  onComplete:(id:string,value:boolean)=>void;
}

const TodoCard = (props: IProps) => {
  return (
    <Row align={"middle"} justify={"space-between"} className={styles.todoCard}>
      <Col xs={4}><strong>{props.data.title}</strong></Col>
      <Col xs={14}>{props.data.description}</Col>
      <Col>
        <Flex gap="small">
          <Checkbox checked={props.data.complete} onChange={e=>{
            props.onComplete(props.data.id,e.target.checked);
          }}></Checkbox>
          <Button
            type="primary"
            onClick={() => {
              props.onUpdate(props.data.id);
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
    </Row>
  );
};

export default TodoCard;
