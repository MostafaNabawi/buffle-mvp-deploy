import { Icon } from "@iconify/react";
import React, { useState } from "react";

import Card from "./../card/Card";
import CardBody from "./../card/CardBody";
import CardHeader from "./../card/CardHeader";
import WaterRepository from "./WaterRepository";
import { Image, Form, Row, Col } from "react-bootstrap";
import Modal from "./../modal/modal";
function HydrationReminderCard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card>
        <CardHeader
          icon={<Image src="/icone/Vector.png" alt="water drop icon" />}
          title="Hydration Reminder"
          action={
            <>
              <Icon icon="vaadin:plus" onClick={handleShow} />
              <Icon icon="vaadin:ellipsis-dots-v" />
            </>
          }
        />
        <CardBody>
          <WaterRepository />
        </CardBody>
      </Card>
      <Modal
        show={show}
        handleClose={handleClose}
        title="Water Reminder"
        body={
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Label </Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Label </Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>
        }
      />
    </>
  );
}

export default HydrationReminderCard;
