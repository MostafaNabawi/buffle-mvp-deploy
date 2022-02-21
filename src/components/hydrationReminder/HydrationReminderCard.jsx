/** @format */

import { Icon } from "@iconify/react";
import { Image, Form, Row, Col, Button, NavDropdown } from "react-bootstrap";
import React, { useState, useEffect } from "react";

import Card from "./../card/Card";
import CardBody from "./../card/CardBody";
import CardHeader from "./../card/CardHeader";
import Modal from "./../modal/modal";
import TimePicker2 from "../common/timePicker/TimePicker2";
import WaterRepository from "./WaterRepository";
import { getWaterHydration, createWaterHydration, logout } from "../../api";
import { useToasts } from "react-toast-notifications";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  setData,
  setMute,
  setIsRun,
  setPrecent,
  setReminder,
  setNotificatiionDelay,
  setReminderDelay,
  setUsedPerPercent,
  setPrecentByAmount,
  setRemindertByAmount,
  setNotificatiionTimer,
  setIsChanged,
  setRender,
} from "./../../store/hydrationSclice";
import useReminder from "./useReminder";
import { FormattedMessage } from "react-intl";
function HydrationReminderCard() {
  const {
    data,
    precent,
    reminderDelay,
    usedPerPercent,
    isMute,
    inChanged,
    timeOutId,
  } = useSelector((state) => state.hydration);

  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [isSubmit, setIsSubmit] = useState(false);
  const [animat, setAnimat] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(0);
  const [liter, setLiter] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
    dispatch(setIsChanged(false));
    if (data !== "") {
      setDailyGoal(data.daily_goal);
      setHowLongTime(changeTimeFormat(data.work));
      setReminderTime(changeTimeFormat(data.reminder));
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

  //useEffect function
  useEffect(() => {
    fetch();

    return () => {
      dispatch(setIsChanged(false));
    };
  }, [isSubmit]);

  const fetch = async () => {
    const req = await getWaterHydration();
    if (req.data !== null) {
      clearTimeout(timeOutId);
      const milliseconds = moment(new Date()).diff(
        new Date(req.data?.setTime),
        "milliseconds"
      );
      if (inChanged) {
        dispatch(setPrecentByAmount(0));
        dispatch(setRemindertByAmount(0));
      } else {
        const reminderDelay = timeInMilliseconds(req.data.work) / 100;
        const usedPerPercent = req.data.daily_goal / 100;
        var temp = 0;
        const pastedPrecent = Math.floor(milliseconds / reminderDelay);
        if (pastedPrecent <= 100) {
          for (let index = 0; index < pastedPrecent; index++) {
            temp += usedPerPercent;
          }
          dispatch(setPrecentByAmount(pastedPrecent));
          dispatch(setRemindertByAmount(temp));
        } else if (pastedPrecent > 100) {
          dispatch(setPrecentByAmount(100));
          dispatch(setRemindertByAmount(req.data.daily_goal));
        }
      }
      dispatch(setRender(true));
      dispatch(setData(req.data));
      setDailyGoal(req.data.daily_goal);
      setLiter(req.data.daily_goal);
      calculteWaterReminderPrecent(req.data.work);
      // dispatch(setNotificatiionTimer)
      ReminderNotifiction(req.data.reminder);
      calculteUsedPerPercent(req.data.daily_goal);
    } else {
      dispatch(setRender(false));
    }
  };
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
    dispatch(setNotificatiionDelay(interval));
    dispatch(setNotificatiionTimer(interval));
  };

  const calculteWaterReminderPrecent = (time) => {
    const interval = timeInMilliseconds(time) / 100;
    dispatch(setReminderDelay(interval));
  };

  const calculteUsedPerPercent = (dailyGoal) => {
    const value = dailyGoal / 100;
    dispatch(setUsedPerPercent(value));
  };

  const handleMute = () => {
    dispatch(setMute());
  };

  useReminder(() => {
    if (reminderDelay !== "") {
      if (precent < 100) {
        dispatch(setReminder(usedPerPercent));
        dispatch(setPrecent());
        setAnimationClass();
      } else {
        dispatch(setRender(false));
      }
    }
  }, reminderDelay);

  const setAnimationClass = () => {
    setAnimat(true);
    setTimeout(() => {
      setAnimat(false);
    }, 1500);
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
      if (req.status === 200) {
        addToast("Created Susseccfully", {
          autoDismiss: true,
          appearance: "success",
        });
        handleClose();
        dispatch(setIsChanged(true));
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
          title={
            <FormattedMessage
              defaultMessage="Hydration Reminder"
              id="app.waterHydretion"
            />
          }
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
                  {isMute ? "unMute" : "mute"}
                  <i onClick={handleMute}>
                    <Icon
                      fontSize={25}
                      icon={isMute ? "gg:play-pause-o" : "fa-solid:stop-circle"}
                    />
                  </i>
                </NavDropdown.Item>
              </NavDropdown>
            </>
          }
        />
        <CardBody>
          <WaterRepository liter={liter} animat={animat} />
        </CardBody>
      </Card>
      <Modal
        show={show}
        handleClose={handleClose}
        title={
          <FormattedMessage
            defaultMessage="Hydration Reminder"
            id="app.waterHydretion"
          />
        }
        body={
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  <FormattedMessage
                    defaultMessage="new daily goal(2L)"
                    id="app.newDaily"
                  />{" "}
                </Form.Label>
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
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
            <Button variant="outline-dark" onClick={handleClose}>
              Close
            </Button>
          </>
        }
      />
    </>
  );
}

export default HydrationReminderCard;
