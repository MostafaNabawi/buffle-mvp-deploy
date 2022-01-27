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
import { createWaterHydration, getWaterHydration } from "../../api";
import { useToasts } from "react-toast-notifications";
import moment from "moment";
//import useSound from "use-sound";
import { useDispatch, useSelector } from "react-redux";
// import {
//   getWaterHydration,
//   setData,
//   setMute,
//   setPrecent,
//   setReminder,
// } from "./../../store/hydrationSclice";
function HydrationReminderCard() {
  // let audio = new Audio("/music/alarm.mp3");
  // const alarm = "/music/alarm.mp3";
  // const { data, isMute, precent, reminder } = useSelector(
  //     (state) => state.hydration
  // );
  // console.log(data, isMute, precent, reminder);
  // const dispatch = useDispatch();

  const { addToast } = useToasts();
  // const [id1, setId1] = useState({ id: "" });
  // const [id2, setId2] = useState({ id: "" });
  const [animatClass, setAnimatClass] = useState(false);
  // // const [play, { stop }] = useSound(alarm);
  // const [isSubmit, setIsSubmit] = useState(false);
  // const [dailyGoal, setDailyGoal] = useState(0);
  // const [liter, setLiter] = useState(0);

  const changeTimeFormat = (val) => {
    const arr = val.split(":");
    const hours = arr[0].trim();
    const minutes = arr[1].trim();
    const seconds = arr[2].trim();
    return { hours, minutes, seconds };
  };
  const [dailyGoal, setDailyGoal] = useState(0);
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
    // if (data !== "") {
    //   setDailyGoal(data.daily_goal);
    //   setHowLongTime(changeTimeFormat(data.work));
    //   setReminderTime(changeTimeFormat(data.reminder));
    // }
  };
  // const handleMute = () => {
  //     dispatch(setMute());
  // };

  // //useEffect function
  // useEffect(() => {
  //     console.log("useEffect");
  // }, [isSubmit]);

  // const changeTimeFormat = (val) => {
  //     const arr = val.split(":");
  //     const hours = arr[0].trim();
  //     const minutes = arr[1].trim();
  //     const seconds = arr[2].trim();
  //     return { hours, minutes, seconds };
  // };

  // const timeInMilliseconds = (time) => {
  //     if (time !== undefined) {
  //         const arr = time.split(":");
  //         const milliseconds =
  //             arr[0] * 24 * 60 * 60 * 1000 + arr[1] * 60 * 1000 + arr[2] * 1000;
  //         return milliseconds;
  //     } else {
  //         return null;
  //     }
  // };

  // // Reminder notifiction
  // const ReminderNotifiction = (time) => {
  //     const interval = timeInMilliseconds(time);
  //     if (id1.id1 !== undefined) {
  //         clearInterval(id1.id);
  //     }
  //     if (interval !== null) {
  //         const id = setInterval(() => {
  //             console.log(isMute);
  //             addToast("INFO", {
  //                 autoDismiss: true,
  //                 appearance: "info",
  //             });
  //         }, interval);
  //         setId1({ id: id });
  //     }
  // };
  // const calculteWaterReminderPrecent = (dailyGoal, time) => {
  //     const interval = timeInMilliseconds(time) / 100;
  //     const usedَAmount = dailyGoal / 100;
  //     console.log(usedَAmount, dailyGoal);
  //     if (id2.id !== "") {
  //         clearInterval(id2.id);
  //     }
  //     const id = setInterval(() => {
  //         if (precent > 0) {
  //             reminder += usedَAmount;
  //             setReminder(Math.round(reminder));
  //             setPrecent(--precent);
  //             setAnimation();
  //         } else {
  //             clearInterval(id1.id);
  //         }
  //         dispatch(setPrecent());
  //     }, interval);
  //     setId2({ id: id });
  // };

  // const setAnimation = () => {
  //     setAnimatClass(true);
  //     setTimeout(() => {
  //         setAnimatClass(false);
  //     }, 1500);
  // };

  const handleSubmit = async (e) => {
    const timer_1 = ` ${howLongTime.hours}:${howLongTime.minutes}:${howLongTime.seconds}`;
    const timer_2 = ` ${reminderTime.hours}:${reminderTime.minutes}:${reminderTime.seconds}`;
    console.log("how long", timer_1);
    console.log("reminder", timer_2);

    const data = {
      dailyGoal,
      timer_1,
      timer_2,
    };
    if (dailyGoal > 0 && timer_1 !== "" && timer_2 !== "") {
      const req = await createWaterHydration(data);
      console.log("Req", req);
      if (req.status === 200) {
        addToast("Created Susseccfully", {
          autoDismiss: true,
          appearance: "success",
        });
        handleClose();
        // setIsSubmit(!isSubmit);
      } else {
        addToast("Error Please Try Again!", {
          autoDismiss: false,
          appearance: "error",
        });
      }
    }
  };
  useEffect(() => {
    async function getComponentData() {
      // get data from server
      const { data } = await getWaterHydration();
      console.log("d ", data?.setTime);
      const differnce = moment(new Date()).diff(
        new Date(data?.setTime),
        "millisecond"
      );
    }
    getComponentData();
  }, []);
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
                  <i>
                    {/*    onClick={handleMute}> */}
                    <Icon
                      fontSize={25}
                      //   icon={
                      //     data.isMute ? "gg:play-pause-o" : "fa-solid:stop-circle"
                      //   }
                    />
                  </i>
                </NavDropdown.Item>
              </NavDropdown>
            </>
          }
        />
        <CardBody>
          {/* <WaterRepository
            precent={1}
            liter={1}
            reminder={reminder}
            animatClass={animatClass}
          /> */}
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
