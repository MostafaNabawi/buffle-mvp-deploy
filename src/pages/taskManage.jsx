import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import '../styles/task.css';
import TaskManagement from "../components/taskMnagement/TaskManagement";
import { Card, Collapse, Button } from "react-bootstrap";
import ProjectManagement from "../components/taskMnagement/project/projectManagement";
const TaskManage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <Card className="secondary-color taskManage ">
            <DndProvider backend={HTML5Backend}>
                <TaskManagement />
                <ProjectManagement />
            </DndProvider>

        </Card>
    )
}

export default TaskManage;
