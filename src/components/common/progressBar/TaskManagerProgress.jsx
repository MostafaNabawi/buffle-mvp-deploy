import { React, useEffect, useState, useRef } from "react";
import { Row, Col, ProgressBar, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
import { useStopwatch } from 'react-timer-hook';
import moment from "moment";
import { updateTaskSpendTime } from "../../../api";
const TaskManagerPreogressBar = (props) => {
  const { _id, name, date, spend_time, task_duration, handleTime } = props;
  const [percent, setPercent] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [play, setPlay] = useState(true);
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
        const update = await updateTaskSpendTime(_id, sp_time)
        if (update.status === 200) {
          handleTime(currentTime);
          console.log('correct');
        }
      }
      else {
        const sp_time = `${days + parseInt(time[0])}:${hours + parseInt(time[1])}:${minutes + parseInt(time[2])}`;
        const update = await updateTaskSpendTime(_id, sp_time)
        if (update.status === 200) {
          handleTime(currentTime);
          console.log('correct');
        }
      }


    }
    if (play) {
      console.log(parseInt(seconds))

      console.log('d', days, 'h', hours, 'm', minutes, 's', seconds)
      start()
      setPlay(!play);
    }
  };
  useEffect(() => {
    setPercent((100 * (((days + parseInt(time[0])) * 86400) + ((hours + parseInt(time[1])) * 3600) + ((minutes + parseInt(time[2])) * 60) + (seconds))) / duration);
    setCurrentTime(((days + parseInt(time[0])) * 86400) + ((hours + parseInt(time[1])) * 3600) + ((minutes + parseInt(time[2])) * 60) + (seconds));
    if (currentTime === duration) {
      pause()
      setPlay(!play);
      console.log("task completed");
    }

  }, [seconds])
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
            label={<><span>{days + parseInt(time[0])}:{hours + parseInt(time[1])}:{minutes + parseInt(time[2])}:{seconds}</span></>}
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
