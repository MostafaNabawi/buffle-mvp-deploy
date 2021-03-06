import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../styles/task.css";
import TaskManagement from "../components/taskMnagement/TaskManagement";
import { Card } from "react-bootstrap";
import ProjectManagement from "../components/taskMnagement/project/projectManagement";
const TaskManage = () => {
  const [value, setValue] = useState("");
  const [changeColor, setChangeColor] = useState("");
  const [drop, setDrop] = useState("");
  const handleChange = (value) => {
    setValue(value);
  };

  const colorChange = (val) => {
    setChangeColor(val);
  };
  const handleDrop = (value) => {
    setDrop(value);
  };
  return (
    <Card className="secondary-color taskManage ">
      {/* <Row className="task-management-filter-row">
                <Col>
                    <div className="task-management-filter">
                        <span>Important today items</span>
                    </div>
                </Col>
            </Row> */}
      <DndProvider backend={HTML5Backend}>
        <TaskManagement
          handleGet={handleChange}
          val={value}
          colChange={changeColor}
          projectDroped={drop}
        />
        <ProjectManagement
          value={value}
          handleGet={handleChange}
          colorChange={colorChange}
          handleDrop={handleDrop}
          pDrope={drop}
        />
      </DndProvider>
    </Card>
  );
};

export default TaskManage;
