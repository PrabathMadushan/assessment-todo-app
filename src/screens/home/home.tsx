import { Button, Card, Col, Flex, Row } from "antd";
import AddTodoModal from "../../shared/components/add-todo-modal/add-todo-modal";
import { useState } from "react";
import { useTodoContext } from "../../contexts/todo-context";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const { todos,deleteToto } = useTodoContext();
  return (
    <div style={{padding:"10px"}}>
      <Row justify={"space-between"}>
        <Col>
          <Button onClick={() => setOpenModal(true)}>Add Todo</Button>
        </Col>
      </Row>
      <Row>
        {todos.map((todo, index) => (
          <Col xs={24} key={index}>
            <Card title={null} style={{ width: "100%" }}>
              <Row
                style={{ width: "100%" }}
                align={"middle"}
                justify={"space-between"}
              >
                <Col xs={6}>{todo.title}</Col>
                <Col xs={12}>{todo.description  }</Col>
                <Col>
                  <Button type="dashed" onClick={()=>{
                    deleteToto(todo.id);
                  }}>Delete</Button>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
      <AddTodoModal open={openModal} onCancel={() => setOpenModal(false)} />
    </div>
  );
};

export default Home;
