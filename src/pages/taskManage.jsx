import React from 'react';
import Header from '../components/taskMnagement/Header';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskManagement from '../components/taskMnagement/TaskManagement';
import '../styles/task.css'
const TaskManage = () => {
    return (
        <div id="taskManage">
            <DndProvider backend={HTML5Backend}>
                <Header />
                <TaskManagement />
            </DndProvider>
        </div>
    )
}

export default TaskManage;