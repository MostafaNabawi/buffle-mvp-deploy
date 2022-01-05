import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Example from "../components/reactDnd/example";
import '../components/reactDnd/styles.css';
// import TaskManagement from "../components/taskMnagement/TaskManagement";
import { Card } from "react-bootstrap";
const TaskManage = () => {
    return (
        <Card className="secondary-color taskManage ">
            <DndProvider backend={HTML5Backend}>
                {/* <TaskManagement /> */}
                <Example />
            </DndProvider>
        </Card>
    )
}

export default TaskManage;
