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
import useSound from "use-sound";

function HydrationReminderCard() {
  // let audio = new Audio("/music/alarm.mp3");
  // const alarm = "/music/alarm.mp3";
  const { addToast } = useToasts();
  const [id1, setId1] = useState({ id: "" });
  const [id2, setId2] = useState({ id: "" });
  // const [play, { stop }] = useSound(alarm);
  const [isSubmit, setIsSubmit] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(0);
  const [precent, setPrecent] = useState(0);
  const [liter, setLiter] = useState(0);
  const [reminder, setReminder] = useState(0);
  const [mute, setMute] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
    const req = await getWaterHydration();
    if (req.data !== null) {
      setLiter(req.data.daily_goal);
      setHowLongTime(changeTimeFormat(req.data.work));
      setReminderTime(changeTimeFormat(req.data.reminder));
    }
  };
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

  const fetch = async () => {
    const req = await getWaterHydration();
    if (req.data !== null) {
      setPrecent(100);
      setDailyGoal(req.data.daily_goal);
      setLiter(req.data.daily_goal);
      calculteWaterReminderPrecent(req.data.daily_goal, req.data.work);
      ReminderNotifiction(req.data.reminder);
    }
  };

  //useEffect function
  useEffect(() => {
    fetch();
    console.log(window.id);
    return () => {
      clearInterval(id1.id);
      clearInterval(id2.id);
    };
  }, [isSubmit]);

  const changeTimeFormat = (val) => {
    const arr = val.split(":");
    const hours = arr[0].trim();
    const minutes = arr[1].trim();
    const seconds = arr[2].trim();
    return { hours, minutes, seconds };
  };

  const timeInMilliseconds = (time) => {
    if (time !== undefined) {
      const arr = time.split(":");
      const milliseconds =
        arr[0] * 24 * 60 * 60 * 1000 + arr[1] * 60 * 1000 + arr[2] * 1000;
      return milliseconds;
    } else {
      return null;
    }
  };

  // Reminder notifiction
  const ReminderNotifiction = (time) => {
    const interval = timeInMilliseconds(time);
    if (id1.id1 !== undefined) {
      clearInterval(id1.id);
    }
    if (interval !== null) {
      const id = setInterval(() => {
        if (!mute) {
          addToast("INFO", {
            autoDismiss: true,
            appearance: "info",
          });
          // play();
        }
      }, interval);
      setId1({ id: id });
    }
  };

  const calculteWaterReminderPrecent = (dailyGoal, time) => {
    const interval = timeInMilliseconds(time) / 100;
    const usedَAmount = dailyGoal / 100;
    console.log(usedَAmount, dailyGoal);
    if (id2.id !== "") {
      clearInterval(id2.id);
    }
    var precent = 100;
    var reminder = 0;
    const id = setInterval(() => {
      if (precent > 0) {
        reminder += usedَAmount;
        setReminder(Math.round(reminder));
        setPrecent(--precent);
      }
    }, interval);
    setId2({ id: id });
  };

  const handleSubmit = async (e) => {
    const timer_1 = ` ${howLongTime.hours}:${howLongTime.minutes}:${howLongTime.seconds}`;
    const timer_2 = ` ${reminderTime.hours}:${reminderTime.minutes}:${reminderTime.seconds}`;
    const data = {
      dailyGoal,
      timer_1,
      timer_2,
    };
    if (dailyGoal > 0 && timer_1 !== "" && timer_2 !== "") {
      const req = await createWaterHydration(data);
      if (req.status == 200) {
        addToast("Created Susseccfully", {
          autoDismiss: true,
          appearance: "success",
        });
        handleClose();
        setIsSubmit(!isSubmit);
      } else {
        addToast("Error Please Try Again!", {
          autoDismiss: false,
          appearance: "error",
        });
      }
    }
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
        title="Hydration Reminder"
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
