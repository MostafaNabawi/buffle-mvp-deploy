import { React, useEffect, useState, useRef } from "react";
import { Row, Col, ProgressBar, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
import { useStopwatch } from 'react-timer-hook';
import moment from "moment";
const TaskManagerPreogressBar = (props) => {
  const { _id, name, date, spend_time, task_duration } = props;
  const [percent, setPercent] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [play, setPlay] = useState(true);
  const duration = moment.duration(task_duration).asSeconds();
  const {
    seconds,
    minutes,
    hours,
    days,
    start,
    pause,
  } = useStopwatch({ autoStart: false });
  const handlePlay = () => {
    if (!play) {
      pause()
      console.log('d', days, 'h', hours, 'm', minutes, 's', seconds)
      setPlay(!play);
    }
    if (play) {
      console.log('d', days, 'h', hours, 'm', minutes, 's', seconds)
      start()
      setPlay(!play);
    }
  };
  useEffect(() => {
    setPercent((100 * ((days * 86400) + (hours * 3600) + (minutes * 60) + (seconds))) / duration);
    setCurrentTime((((days * 86400) + (hours * 3600) + (minutes * 60) + (seconds))));
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
            // color={play && percentUI > 0 ? "" : `#4922ff`}
            className={style.iconWatch}
            icon="bi:clock-fill"
          />
          <ProgressBar
            label={<><span>{days}:{hours}:{minutes}:{seconds}</span></>}
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
