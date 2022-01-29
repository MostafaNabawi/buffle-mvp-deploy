import { React, useEffect, useState, useRef } from "react";
import { Row, Col, ProgressBar, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
import { useStopwatch } from 'react-timer-hook';
import moment from "moment";
import { updateTaskSpendTime, updateTaskWhenPlay, updateTaskWhenCompleted } from "../../../api";

const TaskManagerPreogressBar = (props) => {
  const { _id, spend_time, task_duration, start_time, status } = props;
  const [percent, setPercent] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [play, setPlay] = useState(true);
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [range, setRange] = useState(0);
  const duration = moment.duration(task_duration).asSeconds();
  const time = spend_time !== null ? spend_time.split(':') : `${0}:${0}:${0}:${0}`.split(":");
  const {
    seconds,
    minutes,
    hours,
    days,
    start,
    pause,
  } = useStopwatch({ autoStart: false });


  const handlePlay = async () => {
    if (!play) {
      pause()
      setPlay(!play);
      if (seconds > 30) {
        const sp_time = `${days + parseInt(time[0])}:${hours + parseInt(time[1])}:${(minutes + parseInt(time[2])) + 1}`;
        const update = await updateTaskSpendTime(_id, sp_time, 'stop')
        if (update.status === 200) {
          console.log('correct');
        }
      }
      else {
        const sp_time = `${days + parseInt(time[0])}:${hours + parseInt(time[1])}:${minutes + parseInt(time[2])}`;
        const update = await updateTaskSpendTime(_id, sp_time, 'stop')
        if (update.status === 200) {
          console.log('correct');
        }
      }


    }
    if (play) {
      console.log('running')
      const update = await updateTaskWhenPlay(_id, 'running', new Date().toISOString())
      if (update.status === 200) {
        console.log('correct');
      }
      start()
      setPlay(!play);
    }
  };
  useEffect(async () => {

    setPercent((100 * (((days + parseInt(time[0])) * 86400) + ((hours + parseInt(time[1])) * 3600) + ((minutes + parseInt(time[2])) * 60) + (seconds) + range)) / duration);
    setCurrentTime(((days + parseInt(time[0])) * 86400) + ((hours + parseInt(time[1])) * 3600) + ((minutes + parseInt(time[2])) * 60) + (seconds) + range);
    if (currentTime === duration) {
      pause()
      setPlay(!play);
      const sp_time = `${days + parseInt(time[0])}:${hours + parseInt(time[1])}:${minutes + parseInt(time[2])}`;
      const update = await updateTaskWhenCompleted(_id, sp_time, 'completed')
      if (update.status === 200) {
        console.log('correct');
      }
    }

  }, [seconds])

  useEffect(() => {

    if (status === 'running' && play) {
      const diffInMs = Math.abs((new Date(start_time).getTime() - new Date().getTime()) / 1000);
      const resualt = Math.ceil(diffInMs);
      // console.log(resualt)
      setRange(resualt);
      const d = Number(resualt);
      setDay(Math.floor(d / (3600 * 24)));
      setHour(Math.floor(d / 3600));
      setMin(Math.floor(d % 3600 / 60));
      setSec(Math.floor(d % 3600 % 60));
      start()
      setPlay(!play);
      // setPercent(percent + (resualt / 100));
      // console.log(resualt / 100)

    }
  }, [])
  return (
    <>
      <Row>


        <Col xl="11" className="pl-0">
          <Icon
            // color={play && percent > 0 ? "" : `#4922ff`}
            className={style.iconWatch}
            icon="bi:clock-fill"
          />
          <ProgressBar
            label={<><span>{days + parseInt(time[0]) + day}:{hours + parseInt(time[1]) + hour}:{minutes + parseInt(time[2]) + min}:{seconds}</span></>}
            now={percent}
            className={style.progress}
          />
        </Col>
        <Col className={style.iconPlay} xl="1">
          <div
            onClick={handlePlay}
            className={`${style.iconProgress}  text-center`}
          >
            {play ? (
              <Icon icon="bi:play-fill" />
            ) : (
              <i><Icon icon="gg:play-pause" /></i>
            )}
          </div>
        </Col>
      </Row>
    </>

  );
};
export default TaskManagerPreogressBar;
