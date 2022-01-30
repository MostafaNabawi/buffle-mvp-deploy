import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import '../styles/task.css';
import TaskManagement from "../components/taskMnagement/TaskManagement";
import { Card, Row, Col } from "react-bootstrap";
import ProjectManagement from "../components/taskMnagement/project/projectManagement";
const TaskManage = () => {
    const [value, setValue] = useState('');
    const handleChange = (value) => {
        setValue(value)
    }
    return (
        <Card className="secondary-color taskManage ">
            <Row className="task-management-filter-row">
                <Col>
                    <div className="task-management-filter">
                        <span>Date filter</span>
                    </div>
                </Col>
            </Row>
            <DndProvider backend={HTML5Backend}>
                <TaskManagement handleGet={handleChange} val={value} />
                <ProjectManagement value={value} handleReload={handleChange} />
            </DndProvider>

        </Card>
    )
}

export default TaskManage;
