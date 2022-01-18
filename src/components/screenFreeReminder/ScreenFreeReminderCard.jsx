import { Icon } from "@iconify/react";
import { Row, Col, Button, Form, Image } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import TimePicker2 from "../common/timePicker/TimePicker2";
import Card from "./../card/Card";
import CardBody from "./../card/CardBody";
import CardHeader from "./../card/CardHeader";
import Modal from '../modal/modal'
import { API_URL } from '../../config/index'
import { useToasts } from 'react-toast-notifications';
import Loader from "react-spinners/BeatLoader";

import style from "./style.module.css";

function ScreenFreeReminderCard() {
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState('')
  // Modal
  const [sizeModal, setSizeModal] = useState("");
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
  useEffect(() => {
    const getData = async () => {
      const req = await fetch(`${API_URL}/screen_reminder/get`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      const { payload } = await req.json()
      if (payload){
        const min=payload.display.split(':')
        if(min[0]==="00" && min[2]==="00"){
          setData({...payload,['display']:min[1]})
        }else{
           setData(payload)
        }
      } 
    }
    getData()
  }, [])
  // set
  const handleSubmit = async () => {
    if (
      durationTime.hours === "" && durationTime.minutes === "" && durationTime.seconds === "" ||
      displayTime.hours === "" && displayTime.minutes === "" && displayTime.seconds === ""
    ) {
      return false
    } else {
      setLoading(true)
      const du_time = durationTime.hours + ":" + durationTime.minutes + ":" + durationTime.seconds
      const dis_time = displayTime.hours + ":" + displayTime.minutes + ":" + displayTime.seconds

      const { status } = await fetch(`${API_URL}/screen_reminder/new`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          duration: du_time,
          display: dis_time,
          isMute: true
        })
      })
      if (status === 200) {
        setLoading(false)
        setDurationTime({ hours: "", minutes: "", seconds: "" })
        setDisplayTime({ hours: "", minutes: "", seconds: "" })
        setModalShow(false)
        addToast("Added Susseccfully", { autoDismiss: true, appearance: 'success' });
      } else {
        setLoading(false)
        setModalShow(false)
        addToast("Error Please Try Again!", { autoDismiss: false, appearance: 'error' });
      }
    }
  };
  console.log("data", data)
  return (
    <>
      <Card className={style.card}>
        <CardHeader
          icon={<Image src="/icone/eye 1.png" alt="eye icon" />}
          title="ScreenFree Reminder"
          action={
            <>
              <i
                title="Set your screen free Reminder"
                onClick={() => {
                  setModalShow(true);
                  setSizeModal("md");
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
          {
            data &&( <div className={style.wrapper}>
                <div className={style.header}>
                  <span>
                    <Form.Check checked={data?.mute} type="checkbox" />
                  </span>
                  <h6>{data?.display} mine screen free time</h6>
                </div>
                <p>last intermission {
                localStorage.getItem("loackTime")?localStorage.getItem("loackTime"):"00:00:00"
                }</p>
              </div>
         )}
        </CardBody>
      </Card>
      {/* Modal */}
      <Modal
        size={sizeModal}
        show={modalShow}
        handleClose={handleClose}
        title="Set your screen free Reminder"
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
            <Button variant="outline-dark" onClick={handleClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                handleSubmit();
              }}
              disabled={loading}
              variant="primary"
              type="button"
            >
              {
                loading ? <Loader color="#fff" size={13} /> : "Save"
              }
            </Button>
          </>
        }
      />
    </>
  );
}

export default ScreenFreeReminderCard;
