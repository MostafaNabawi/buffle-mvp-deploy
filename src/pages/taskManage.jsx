import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import '../styles/task.css';
import TaskManagement from "../components/taskMnagement/TaskManagement";
import { Card, Row, Col } from "react-bootstrap";
import ProjectManagement from "../components/taskMnagement/project/projectManagement";
import CreateProject from "../components/taskMnagement/project/CreateProject";
const TaskManage = () => {
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
                <TaskManagement />
                <CreateProject />
                <ProjectManagement />
            </DndProvider>

        </Card>
    )
}

export default TaskManage;
