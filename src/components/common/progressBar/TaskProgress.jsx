/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Row, Col, ProgressBar } from "react-bootstrap";
import style from "./style.module.css";
import moment from "moment";
import {
  updateTaskSpendTime,
  updateTaskWhenPlay,
  updateTaskWhenCompleted,
  createNotification,
} from "../../../api";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { setRun, setAlert } from "../../../store/taskSlice";
import { FormattedMessage } from "react-intl";
const Timer = (props) => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { run } = useSelector((state) => state.task);
  const {
    _id,
    name,
    spend_time,
    task_duration,
    start_time,
    status,
    task_percent,
    handleCheckOpenClose,
    handleComplet,
  } = props;
  const time =
    spend_time !== 0 ? spend_time.split(":") : `${0}:${0}:${0}:${0}`.split(":");
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [hour, setHour] = useState("00");
  const [day, setDay] = useState("00");
  const [range, setRange] = useState(0);
  const [play, setPlay] = useState(false);
  const [percent, setPercent] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = moment.duration(task_duration).asSeconds();
  const [counter, setCounter] = useState(
    parseInt(time[3]) > 0 ? parseInt(time[3]) : 0
  );
  const data = JSON.parse(localStorage.getItem("user"));
  const handlePlay = async () => {
    if (!play && !run) {
      dispatch(setRun(true));
      handleCheckOpenClose(1);
      setPlay(!play);
      const update = await updateTaskWhenPlay(
        _id,
        "running",
        new Date().toISOString()
      );
      if (update.status === 200) {
        console.log("started");
      }
    }
    if (play) {
      dispatch(setRun(false));
      handleCheckOpenClose(0);
      setPlay(!play);
      const sp_time = `${day}:${hour}:${minute}:${second}`;
      const update = await updateTaskSpendTime(_id, sp_time, percent, "stop");
      if (update.status === 200) {
        console.log("updated");
      }
    }
  };
  useEffect(() => {
    let intervalId;
    if (play) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);
        const hourCounter = Math.floor(counter / 3600);
        const dayCounter = Math.floor(counter / (3600 * 24));
        const computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        const computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;
        const computedhoure =
          String(hourCounter).length === 1 ? `0${hourCounter}` : hourCounter;
        const computedDay =
          String(dayCounter).length === 1 ? `0${dayCounter}` : dayCounter;

        setSecond(parseInt(computedSecond));
        setMinute(parseInt(computedMinute) + parseInt(time[2]));
        setHour(parseInt(computedhoure) + parseInt(time[0]));
        setDay(parseInt(computedDay) + parseInt(time[0]));

        setCounter((counter) => ++counter);
      }, 1000);
    }
    setPercent(
      (100 *
        (parseInt(day) * 86400 +
          parseInt(hour) * 3600 +
          parseInt(minute) * 60 +
          parseInt(second))) /
      parseInt(duration)
    );
    console.log('current', currentTime)
    setCurrentTime(
      parseInt(day) * 86400 +
      parseInt(hour) * 3600 +
      parseInt(minute) * 60 +
      parseInt(second)
    );
    if (currentTime === duration) {
      setPlay(!play);
      async function request() {
        const sp_time = `${day}:${hour}:${minute}:${second}`;
        await updateTaskWhenCompleted(_id, sp_time, "completed");
        const notify = await createNotification(data._id, name);
        if (notify.status === 200) {
          addToast(
            <FormattedMessage
              id="task.finished"
              defaultMessage="Task finished."
            />,
            {
              autoDismiss: true,
              appearance: "success",
            }
          );
          dispatch(setAlert(true));
          // clearInterval(intervalId);
          handleComplet(_id);
        }
      }
      request();
    }
    return () => clearInterval(intervalId);
  }, [play, counter]);

  useEffect(() => {
    if (status === "running" && !play) {
      const diffInMs = Math.abs(
        (new Date(start_time).getTime() - new Date().getTime()) / 1000
      );
      const resualt = Math.floor(diffInMs);
      setRange(parseInt(resualt));
      setCounter(parseInt(resualt) + parseInt(time[3]));
      setPlay(!play);
    }
  }, [range]);

  useEffect(() => {
    setPercent(task_percent);
    setSecond(time[3]);
    setMinute(time[2]);
    setHour(time[1]);
    setDay(time[0]);

  }, [task_percent]);

  return (
    <div className="container">
      <Row>
        <Col xl="1">
          <i>
            <Icon
              color={!play && percent > 0 ? "" : `#4922ff`}
              className={style.iconWatch2}
              icon="bi:clock-fill"
            />
          </i>
        </Col>
        <Col xl="10" className="pl-0 taskManaterProgress">
          <ProgressBar
            label={
              <>
                <span className={percent >= 28 ? "" : "showTimeTask"}>
                  {`${parseInt(hour) < 10 ? "0" + parseInt(hour) : parseInt(hour)
                    }:${parseInt(minute) < 10
                      ? "0" + parseInt(minute)
                      : parseInt(minute)
                    }:${parseInt(second) < 10
                      ? "0" + parseInt(second)
                      : parseInt(second)
                    }`}
                </span>
              </>
            }
            now={status === "completed" ? 100 : percent}
            className={`${style.progress}`}
          />
        </Col>
        <Col className={style.iconPlay} xl="1">
          <div
            onClick={handlePlay}
            className={`${style.iconProgress}  text-center`}
          >
            {play ? (
              <i>
                <Icon icon="gg:play-pause" />
              </i>
            ) : (
              <Icon icon="bi:play-fill" />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Timer;
