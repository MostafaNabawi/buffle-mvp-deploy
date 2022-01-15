import { Icon } from "@iconify/react";
import React, { useState } from "react";

import Card from "./../card/Card";
import CardBody from "./../card/CardBody";
import CardHeader from "./../card/CardHeader";
import WaterRepository from "./WaterRepository";
import { Image, Form, Row, Col, Button, NavDropdown } from "react-bootstrap";
import Modal from "./../modal/modal";
function HydrationReminderCard() {
  const [mute, setMute] = useState(false);
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
              <Icon className="pr-5" icon="vaadin:plus" onClick={handleShow} />
              {/* <Icon icon="vaadin:ellipsis-dots-v" /> */}
              <NavDropdown
                className="reminderNav"
                title={<Icon color="black" icon="vaadin:ellipsis-dots-v" />}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item className="reminderNavItem">
                  Mute{" "}
                  <i
                    onClick={() => {
                      setMute(!mute);
                    }}
                  >
                    <Icon
                      fontSize={25}
                      icon={mute ? "gg:play-pause-o" : "fa-solid:stop-circle"}
                    />
                  </i>
                </NavDropdown.Item>
              </NavDropdown>
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
        title="Hydration Reminder
        "
        body={
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>new daily goal(2L) </Form.Label>
                <Form.Control type="number" placeholder="2L" />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label> How long do you work(8hr) </Form.Label>
                <Form.Control type="number" placeholder="8hr" />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Set reminder(2hr) </Form.Label>
                <Form.Control type="number" placeholder="2h" />
              </Form.Group>
            </Col>
          </Row>
        }
        footer={
          <>
            <Button variant="outline-dark" onClick={handleClose}>
              Close
            </Button>
            {/* Vacation time btn */}
            <Button variant="primary" type="submit">
              {" "}
              Save
            </Button>
          </>
        }
      />
    </>
  );
}

export default HydrationReminderCard;
