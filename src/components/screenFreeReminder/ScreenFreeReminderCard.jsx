import { Icon } from "@iconify/react";
import { Row, Col, Button, Form, Image } from "react-bootstrap";
import React, { useState } from "react";

import Card from "./../card/Card";
import CardBody from "./../card/CardBody";
import CardHeader from "./../card/CardHeader";
import Modal from '../modal/modal'

import style from "./style.module.css";

function ScreenFreeReminderCard() {
  // Modal
  const [sizeModal, setSizeModal] = useState('')
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);
  return (
    <>
      <Card className={style.card}>
        <CardHeader
          icon={<Image src="/icone/eye 1.png" alt="eye icon" />}
          title="ScreenFree Reminder"
          action={
            <>
              <i title="Set your screen free Reminder" onClick={() => {
                setModalShow(true)
                setSizeModal('md')
              }}
              >
                <Icon icon="vaadin:plus" />
              </i>
              <Icon icon="vaadin:ellipsis-dots-v" />
            </>
          }
          className="border-bottom"
        />
        <CardBody>
          <div className={style.wrapper}>
            <div className={style.header}>
              <span>
                <Icon icon="akar-icons:check-box-fill" color={`#4922ff`} />
              </span>
              <h6>5 mine screen free time</h6>
            </div>
            <p>last intermission 12:55</p>
          </div>
        </CardBody>
      </Card>
      {/* Modal */}
      <Modal
        size={sizeModal}
        show={modalShow}
        handleClose={handleClose}
        title='Set your screen free Reminder'
        body={
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>duration time </Form.Label>
                <Form.Control type="time" />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Display Time </Form.Label>
                <Form.Control type="time" />
              </Form.Group>
            </Col>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Mute " />
            </Form.Group>
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
    </>
  );
}

export default ScreenFreeReminderCard;
