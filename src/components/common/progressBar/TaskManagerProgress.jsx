import { React, useEffect, useState } from "react";
import { Row, Col, ProgressBar } from "react-bootstrap";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
import moment from 'moment';
import Countdown from "react-countdown";

const TaskManagerPreogressBar = (props) => {
  const { _id, name, date, spend_time, task_duration } = props;
  const [play, setPlay] = useState(true);
  const [data, setData] = useState(0);
  const handlePlay = () => {
    if (play) {
      console.log("set status to stop");
      setPlay(!play);
    }
    if (!play) {
      const seconds = moment.duration(task_duration).asSeconds();
      console.log(seconds)

      setPlay(!play);
    }
  };
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
            label={task_duration}

            now={50}
            className={style.progress}
          />
        </Col>
        <Col className={style.iconPlay} xl="1">
          <div
            onClick={handlePlay}
            className={`${style.iconProgress}  text-center`}
          >
            {play ? (
              <i><Icon icon="gg:play-pause" /></i>

            ) : (
              <Icon icon="bi:play-fill" />
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};
export default TaskManagerPreogressBar;
