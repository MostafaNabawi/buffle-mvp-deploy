import { React } from "react";
import { Container, Row, Col, Card, ListGroup, Button, Form } from "react-bootstrap";
import { Icon } from '@iconify/react';
import style from "./style.module.css"

const Setting = () => {
    return (
        <Col xl="8" className="pt-5">
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item className="pb-3">
                        <h4>Invite Link</h4>
                        <i>https://join.weekrise.com/Fjabaakoiuhliuhsp51C72m8</i>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button className={style.btn}><Icon icon="akar-icons:copy" /> Copy to clipboard</Button>
                        <Button className={style.btn}>Regeneration</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item className="pb-3">
                        <h4>Invite Email</h4>
                    </ListGroup.Item>
                    <ListGroup.Item className="pb-3">
                        <Form>
                            <Form.Group className="input-group mb-3 mt-3" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter email" />
                                <Button variant="primary" type="submit">
                                    Send
                                </Button>
                            </Form.Group>

                        </Form>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    );
};

export default Setting;