import { Icon } from "@iconify/react";
import { Image, Form, Row, Col, Button, NavDropdown } from "react-bootstrap";
import React, { useState, useEffect } from "react";

import { API_URL } from "../../config/index";
import Card from "./../card/Card";
import CardBody from "./../card/CardBody";
import CardHeader from "./../card/CardHeader";
import Modal from "./../modal/modal";
import TimePicker2 from "../common/timePicker/TimePicker2";
import WaterRepository from "./WaterRepository";
import { getWaterHydration, createWaterHydration } from "../../api";
import { useToasts } from "react-toast-notifications";

function HydrationReminderCard() {
  const [delay, setDelay] = useState("");
  const [mute, setMute] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const changeTimeFormat = (val) => {
    const arr = val.split(":");
    const hours = +arr[0];
    const minutes = +arr[1];
    const seconds = arr[2];
    return { hours, minutes, seconds };
  };

  const handleShow = async () => {
    const req = await getWaterHydration();
    if (req.status == 200 && req.data !== null) {
      setDailyGoal(req.data.daily_goal);
      setHowLongTime(changeTimeFormat(req.data.work));
      setReminderTime(changeTimeFormat(req.data.reminder));
    }
    setShow(true);
  };

  const { addToast } = useToasts();
  const [dailyGoal, setDailyGoal] = useState("");
  const [howLongTime, setHowLongTime] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const [reminderTime, setReminderTime] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const [startWorkingTime, setstarttWorkingTime] = useState("");

  const handleSubmit = async (e) => {
    const timer_1 = ` ${howLongTime.hours}:${howLongTime.minutes}:${howLongTime.seconds}`;
    const timer_2 = ` ${reminderTime.hours}:${reminderTime.minutes}:${reminderTime.seconds}`;
    const data = {
      dailyGoal,
      timer_1,
      timer_2,
    };
    setDelay(reminderNotificationDelay(timer_2));
    console.log(reminderNotificationDelay(timer_2));
    const req = await createWaterHydration(data);
    if (req.status == 200) {
      addToast("Created Susseccfully+1", {
        autoDismiss: true,
        appearance: "success",
      });
      handleClose();
      setHowLongTime("");
      setHowLongTime("");
      setReminderTime("");
    } else {
      addToast("Error Please Try Again!", {
        autoDismiss: false,
        appearance: "error",
      });
    }
    console.log(req);
  };

  useEffect(async () => {
    const data = await getWaterHydration();
    console.log(data, "useEffect");
  }, []);

  const reminderNotificationDelay = (val) => {
    console.log(val);
    const arr = val.split(":");
    return arr[0] * 24 * 60 * 60 * 1000 + arr[1] * 60 * 1000 + arr[2] * 1000;
  };

  // setTimeout(() => {
  //   addToast("Info", {
  //     autoDismiss: true,
  //     appearance: "info",
  //   });
  // }, delay);

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
          <WaterRepository data={dailyGoal} />
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
                <Form.Control
                  type="number"
                  placeholder="2L"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <TimePicker2
                label="How long do you work"
                value={howLongTime}
                setValue={setHowLongTime}
              />
            </Col>
            <Col md={12}>
              <TimePicker2
                label="Set reminder"
                value={reminderTime}
                setValue={setReminderTime}
              />
            </Col>
          </Row>
        }
        footer={
          <>
            <Button variant="outline-dark" onClick={handleClose}>
              Close
            </Button>
            {/* Vacation time btn */}
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          </>
        }
      />
    </>
  );
}

export default HydrationReminderCard;
