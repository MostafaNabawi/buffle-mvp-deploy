import { React, useEffect, useState } from "react";
import { Row, Col, ProgressBar } from "react-bootstrap";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
import Countdown from "react-countdown";
const percent = require("percent-value");

const PreogressBar = ({ range }) => {
  const [total, setTotal] = useState(range.data / 1000);
  const [play, setPlay] = useState(false);
  const [data, setData] = useState(0);
  const [percentUI, setPercentUI] = useState(0);
  // actions
  const handlePlay = () => {
    if (data > 0) {
      setPlay(!play);
    }
  };
  useEffect(() => {
    if (range.start) {
      setTotal(range.data / 1000);
      setData(range.data);
      setPlay(true);
      setPercentUI(100 / (range.data / 1000));
    }
  }, [range]);
  useEffect(() => {
    if (data > 0) {
      const per = 100 / total;
      setPercentUI(percentUI + per);
    }
  }, [data]);
  return (
    <>
      <Row>
        <Col xl="11" className="pl-0">
          <Icon
            color={play && percent > 0 ? "" : `#4922ff`}
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
