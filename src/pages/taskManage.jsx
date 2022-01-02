import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskManagement from '../components/taskMnagement/TaskManagement';
import '../styles/task.css'
import { Card } from 'react-bootstrap';
const TaskManage = () => {
    return (
        <Card className="secondary-color taskManage ">
            <DndProvider backend={HTML5Backend}>
                <TaskManagement />
            </DndProvider>
        </Card>
    )
}

export default TaskManage;