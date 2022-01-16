import { Icon } from "@iconify/react";
import { Row, Col, Button, Form, Image } from "react-bootstrap";
import React, { useState } from "react";
import TimePicker from "../common/timePicker/TimePicker";
import Card from "./../card/Card";
import CardBody from "./../card/CardBody";
import CardHeader from "./../card/CardHeader";
import Modal from '../modal/modal'

import style from "./style.module.css";

function ScreenFreeReminderCard() {
  const [timeFormatDuration, setTimeFormatDuration] = useState(false)
  const [timeFormatdisPlay, setTimeFormatDisPlay] = useState(false)
  const [timeReminder, setIimeReminder] = useState({
    durationTime: "",
    disPlayTime: ""
  })
  const [isError, setIsError] = useState({
    durationTime: false,
    disPlayTime: false
  })
  // Modal
  const [sizeModal, setSizeModal] = useState('')
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);
  // state for time input 
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  console.log("houre",hours,minutes,seconds)
  // submit form 
  const handleSubmit = () => {
    if (timeReminder.durationTime != "" && timeReminder.disPlayTime != "") {
      console.log("submit")
    } else {
      // Error handling
      if (timeReminder.durationTime === "" && timeReminder.disPlayTime === "") {
        setIsError({ ...isError, ['durationTime']: true, ['disPlayTime']: true })
        return false;
      }
      if (timeReminder.durationTime === "") {
        setIsError({ ...isError, ['durationTime']: true, ['disPlayTime']: false })
        return false;
      }
      if (timeReminder.disPlayTime === "") {
        setIsError({ ...isError, ['durationTime']: false, ['disPlayTime']: true })
        return false;
      }
    }
  }
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
            <TimePicker 
            label={"duration time"}
            hours={hours}
            setHours={setHours}
            minutes={minutes}
            setMinutes={setMinutes}
            seconds={seconds}
            setSeconds={setSeconds}
            />
            </Col>
            <Col md={12}>
            <TimePicker/>
            </Col>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Start " />
            </Form.Group>
          </Row>
        }
        footer={
          <>
            <Button variant="outline-dark" onClick={handleClose}>Close</Button>
            <Button onClick={() => { handleSubmit() }} variant="primary" type="button">
              Save
            </Button>
          </>
        }
      />
    </>
  );
}

export default ScreenFreeReminderCard;
