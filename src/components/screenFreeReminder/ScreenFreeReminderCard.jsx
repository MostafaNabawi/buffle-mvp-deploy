import { Icon } from "@iconify/react";
import { Row, Col, Button, Form, Image } from "react-bootstrap";
import React, { useState } from "react";
import TimePicker2 from "../common/timePicker/TimePicker2";
import Card from "./../card/Card";
import CardBody from "./../card/CardBody";
import CardHeader from "./../card/CardHeader";
import Modal from '../modal/modal'
import { API_URL } from '../../config/index'

import style from "./style.module.css";

function ScreenFreeReminderCard() {

  // Modal
  const [sizeModal, setSizeModal] = useState('')
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);
  // state for time input 
  const [durationTime, setDurationTime] = useState({
    hours: "",
    minutes: "",
    seconds: ""
  })
  const [displayTime, setDisplayTime] = useState({
    hours: "",
    minutes: "",
    seconds: ""
  })
  // 
  const timeFormat=(time)=>{
    console.log("time",time.hours.length)
    if(time.hours.length == 1){
      setDurationTime({...time,['hours']:"0"+time.hours})
    }
  }
  const handleSubmit = async () => {
    if (
      durationTime.hours === "" && durationTime.minutes === "" && durationTime.seconds === "" ||
      displayTime.hours === "" && displayTime.minutes === "" && displayTime.seconds === ""
    ) {
      return false
    } else {
      timeFormat(durationTime)
      // const req=await fetch(`${API_URL}//api/screen_reminder/new `,{

      // })
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
              <TimePicker2
                label={"duration time"}
                value={durationTime}
                setValue={setDurationTime}
              />
            </Col>
            <Col md={12}>
              <TimePicker2
                label={"Display Time"}
                value={displayTime}
                setValue={setDisplayTime}
              />
            </Col>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Mute " />
            </Form.Group> */}
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
