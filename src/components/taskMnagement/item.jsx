import React, { Fragment, useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Form, Row, Col, Button } from 'react-bootstrap';
import ITEM_TYPE from './data/types'
import Modal from "../modal/modal";


const Item = ({ item, index, moveItem, status }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoverRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });
    const [{ isDragging }, drag] = useDrag({
        type: ITEM_TYPE,
        item: { ...item, index },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    drag(drop(ref));

    return (
        <Fragment>
            <div
                ref={ref}
                style={{ opacity: isDragging ? 0 : 1 }}
                className={"item"}

            >
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check className="task-check-box" type="checkbox" />
                </Form.Group>
                <span className={"item-title"} onClick={handleShow}>{item.content}</span>
                <div class="bt_dhhg2g" style={{ background: "blue" }}></div>
            </div>

            <Modal
                show={show}
                handleClose={handleClose}
                title="Create Project"
                className="create-project-modal"
                body={
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder='Name your project...' />
                            </Form.Group>
                        </Col>
                    </Row>
                }
                footer={
                    <>
                        <Button onClick={handleClose}>Close</Button>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>

                    </>
                }
            />
        </Fragment>
    )
}

export default Item;