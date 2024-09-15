import { Button, Col, Row, Space } from "antd";
import AddTodoModal from "../../shared/components/add-todo-modal/add-todo-modal";
import { useState } from "react";
import { useTodoContext } from "../../contexts/todo-context";
import TodoCard from "../../shared/components/todo-card/todo-card";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const { todos, deleteToto, setComplete } = useTodoContext();
  return (
    <Space style={{ padding: "10px", width: "100%" }} direction="vertical">
      <Row justify={"space-between"}>
        <Col>
          <Button onClick={() => setOpenModal(true)}>Add Todo</Button>
        </Col>
      </Row>
      <Row>
        {todos.map((todo, index) => (
          <Col xs={24} key={index} style={{ marginBottom: "10px" }}>
            <TodoCard
              data={todo}
              onDelete={(id) => deleteToto(id)}
              onUpdate={() => {
                
              }}
              onComplete={(id, value) => {
                setComplete(id, value);
              }}
            />
          </Col>
        ))}
      </Row>
      <AddTodoModal open={openModal} onCancel={() => setOpenModal(false)} />
    </Space>
  );
};

export default Home;
