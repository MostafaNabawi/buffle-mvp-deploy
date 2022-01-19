import { Icon } from "@iconify/react";
import { Image, Form, Row, Col, Button, NavDropdown } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import React, { useState, useEffect } from "react";

import { API_URL } from "../../config/index";
import { getWaterHydration, createWaterHydration } from "../../api";
import Card from "./../card/Card";
import CardBody from "./../card/CardBody";
import CardHeader from "./../card/CardHeader";
import Modal from "./../modal/modal";
import TimePicker2 from "../common/timePicker/TimePicker2";
import WaterRepository from "./WaterRepository";

function HydrationReminderCard() {
  const { addToast } = useToasts();
  const [precent, setPrecent] = useState(0);
  const [liter, setLiter] = useState(0);
  const [reminder, setReminder] = useState(0);
  const [mute, setMute] = useState(false);
  const [delay, setDelay] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async () => {
    const req = await getWaterHydration();
    if (req.status == 200 && req.data !== null) {
      setDailyGoal(req.data.daily_goal);
      setHowLongTime(changeTimeFormat(req.data.work));
      setReminderTime(changeTimeFormat(req.data.reminder));
    }
    setShow(true);
  };

  const changeTimeFormat = (val) => {
    const arr = val.split(":");
    const hours = arr[0].trim();
    const minutes = arr[1].trim();
    const seconds = arr[2].trim();
    return { hours, minutes, seconds };
  };

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

  //submite function
  const handleSubmit = async (e) => {
    const timer_1 = ` ${howLongTime.hours}:${howLongTime.minutes}:${howLongTime.seconds}`;
    const timer_2 = ` ${reminderTime.hours}:${reminderTime.minutes}:${reminderTime.seconds}`;
    const data = {
      dailyGoal,
      timer_1,
      timer_2,
    };
    const req = await createWaterHydration(data);
    if (req.status == 200) {
      addToast("Created Susseccfully", {
        autoDismiss: true,
        appearance: "success",
      });
      setDelay(timeInMilliseconds(timer_2));
      setPrecent(100);
      setLiter(dailyGoal);
      setReminder(dailyGoal);
      calculteWaterReminder();
      handleClose();
    } else {
      addToast("Error Please Try Again!", {
        autoDismiss: false,
        appearance: "error",
      });
    }
  };

  //useEffect function
  useEffect(async () => {
    const req = await getWaterHydration();
    if (req.status == 200) {
      setLiter(req.data.daily_goal);
      setReminder(req.data.daily_goal);
    }

    console.log(req, "useEffect");
  }, []);

  //Reminder notifiction
  const reminderNotification = () => {
    setInterval(() => {
      if (!mute) {
        addToast("Info!", {
          autoDismiss: true,
          appearance: "info",
        });
      }
      console.log(mute);
    }, delay);
  };

  const timeInMilliseconds = (time) => {
    const arr = time.split(":");
    const milliseconds =
      arr[0] * 24 * 60 * 60 * 1000 + arr[1] * 60 * 1000 + arr[2] * 1000;
    return milliseconds;
  };

  const calculteWaterReminder = () => {
    setInterval(() => {
      setPrecent(100);
      console.log(precent);
    }, 12000);
  };

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
                  Mute
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
          <WaterRepository
            precent={precent}
            liter={liter}
            reminder={reminder}
          />
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
