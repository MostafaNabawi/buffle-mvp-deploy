import { React } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const TaskManagement = () => {
    const onBeforeCapture = () => {
        /*...*/
    };

    const onBeforeDragStart = () => {
        /*...*/
    };

    const onDragStart = () => {
        /*...*/
    };
    const onDragUpdate = () => {
        /*...*/
    };
    const onDragEnd = () => {
        // the only one that is required
    };
    return (
        <section className="dnd">
            <DragDropContext
                onBeforeCapture={onBeforeCapture}
                onBeforeDragStart={onBeforeDragStart}
                onDragStart={onDragStart}
                onDragUpdate={onDragUpdate}
                onDragEnd={onDragEnd}
            >
                <div>Hello world</div>
            </DragDropContext>

        </section>
    )
}
export default TaskManagement;