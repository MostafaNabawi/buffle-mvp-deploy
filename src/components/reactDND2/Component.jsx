import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT } from "./constants";
import { Form } from 'react-bootstrap';


const Component = ({ data, path }) => {
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        type: COMPONENT,
        item: { id: data.id, path },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const opacity = isDragging ? 0 : 1;
    drag(ref);


    return (
        <div
            ref={ref}
            style={{ opacity }}
            className="component draggable"
        >
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check className="task-check-box" type="checkbox" />
            </Form.Group>
            <span>{data.id}</span>
        </div>
    );
};
export default Component;
