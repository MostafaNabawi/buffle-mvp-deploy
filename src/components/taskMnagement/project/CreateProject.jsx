import React, { useState } from 'react';
import { Form, Row, Col } from "react-bootstrap";
import { Icon } from "@iconify/react";
import Modal from "../../modal/modal";


const CreateProject = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Row className="creat-project-row">
            <Col lg="6">project collapse</Col>
            <Col lg="6" className="creat-project-col">
                <div className="creat-project-div">
                    <span className="creat-project-plus"><Icon icon="bi:plus-lg" /></span>
                    <span className="creat-project-btn" onClick={handleShow}>create project</span>
                </div>
            </Col>
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
            />
        </Row>
    )
}
export default CreateProject;