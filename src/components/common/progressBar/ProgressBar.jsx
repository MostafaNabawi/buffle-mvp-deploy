import { React, useEffect, useState } from "react";
import { Row, Col, ProgressBar } from "react-bootstrap";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
import Countdown from "react-countdown";

const PreogressBar = ({ range, go }) => {
  const [total, setTotal] = useState(range / 1000);
  const [play, setPlay] = useState(go);
  const [data, setData] = useState(0);
  const [percentUI, setPercentUI] = useState(0);
  // actions
  const handlePlay = () => {
    if (data > 0 && play) {
      console.log("set status to stop");
      setPlay(!play);
    }
    if (data > 0 && !play) {
      console.log("set status to start");
      setPlay(!play);
    }
  };
  useEffect(() => {
    if (range > 0 || go) {
      setTotal(range / 1000);
      setData(range);
      setPlay(true);
      setPercentUI(100 / (range / 1000));
    }
  }, [range, go]);
  useEffect(() => {
    if (data > 0) {
      const per = 100 / total;
      if (play) {
        setPercentUI(percentUI + per);
      }
    }
  }, [data]);
  return (
    <>
      <Row>
        <Col xl="11" className="pl-0">
          <Icon
            color={play && percentUI > 0 ? "" : `#4922ff`}
            className={style.iconWatch}
            icon="bi:clock-fill"
          />
          <ProgressBar
            label={
              play && (
                <Countdown
                  date={Date.now() + data}
                  onTick={(time) => {
                    setData(time.total);
                  }}
                  // className={style.redText}
                />
              )
            }
            now={percentUI}
            className={style.progress}
          />
        </Col>
        <Col className={style.iconPlay} xl="1">
          <div
            onClick={handlePlay}
            className={`${style.iconProgress}  text-center`}
          >
            {play ? (
              <Icon icon="gg:play-pause" />
            ) : (
              <Icon icon="bi:play-fill" />
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};
export default PreogressBar;
