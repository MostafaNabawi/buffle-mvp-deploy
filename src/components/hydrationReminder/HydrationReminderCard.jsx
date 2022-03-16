/** @format */

import { Icon } from "@iconify/react";
import { Image, Form, Row, Col, Button, NavDropdown } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";

import Card from "./../card/Card";
import CardBody from "./../card/CardBody";
import CardHeader from "./../card/CardHeader";
import Modal from "./../modal/modal";
import TimePicker2 from "../common/timePicker/TimePicker2";
import WaterRepository from "./WaterRepository";
import { getWaterHydration, createWaterHydration } from "../../api";
import { useToasts } from "react-toast-notifications";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Context } from "../../layout/Wrapper";
import { API_URL } from "../../config/index";
import {
  setData,
  setMute,
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
  const context = useContext(Context);
  const MySwal = withReactContent(Swal);
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
    fetchData();

    return () => {
      dispatch(setIsChanged(false));
    };
  }, [isSubmit]);

  const fetchData = async () => {
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
      setLiter(0)
      dispatch(setPrecentByAmount(0));
      dispatch(setRemindertByAmount(0));
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
        addToast(
          <FormattedMessage
            id="task.success"
            defaultMessage="Created successfully"
          />,
          {
            autoDismiss: true,
            appearance: "success",
          }
        );
        handleClose();
        dispatch(setIsChanged(true));
        setIsSubmit(!isSubmit);
      } else {
        addToast(
          <FormattedMessage
            defaultMessage="Error Please Try Again."
            id="breakPlan.Error"
          />,
          {
            autoDismiss: false,
            appearance: "error",
          }
        );
      }
    }
  };
  //
  const handleDelete = async () => {

    const titleMsg =
      context.getCurrent() === 0 ? "Are you sure?" : "Bist du dir sicher?";
    MySwal.fire({
      title: titleMsg,
      text:
        context.getCurrent() === 0
          ? "You won't be able to revert this."
          : "Änderungen sind nicht mehr möglich.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: context.getCurrent() === 0 ? "Cancel" : "Abbrechen",
      confirmButtonText: context.getCurrent() === 0 ? "Yes" : "Fortfahren",
      reverseButtons: false,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
            fetch(`${API_URL}/water_hydration/delete`, {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
          }).then((res)=>{
            fetchData()
          });
          
        } catch (error) {
          addToast(
            <FormattedMessage
              id="task.error"
              defaultMessage="Error: Please Try Again."
            />,
            {
              appearance: "error",
              autoDismiss: true,
            }
          );
        }
      }
    });
  };
  //

  return (
    <>
      <Card>
        <CardHeader
          icon={<Image src="/icone/Vector.svg" alt="water drop icon" />}
          title={
            <FormattedMessage
              defaultMessage="Waterday"
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
                  <i onClick={handleMute} className="margin-right">
                    <Icon
                      fontSize={25}
                      icon={isMute ? "gg:play-pause-o" : "fa-solid:stop-circle"}
                    />
                  </i>
                  {isMute ? "unMute" : "mute"}
                </NavDropdown.Item>
                <NavDropdown.Item className="reminderNavItem taskManagerNavItem">
                  <i className="delete" onClick={handleDelete}>
                    <Icon icon="fluent:delete-24-filled" />{" "}
                    <FormattedMessage id="btn.delete" defaultMessage="Delete" />
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
          <FormattedMessage defaultMessage="Waterday" id="app.waterHydretion" />
        }
        body={
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  <FormattedMessage
                    defaultMessage="new daily goal"
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
                label={
                  <span style={{ textTransform: "none" }}>
                    <FormattedMessage
                      id="work.time"
                      defaultMessage="How long do you work?"
                    />
                  </span>
                }
                value={howLongTime}
                setValue={setHowLongTime}
              />
            </Col>
            <Col md={12}>
              <TimePicker2
                label={
                  <span style={{ textTransform: "none" }}>
                    <FormattedMessage
                      id="work.setReminder"
                      defaultMessage="Set reminder"
                    />
                  </span>
                }
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
