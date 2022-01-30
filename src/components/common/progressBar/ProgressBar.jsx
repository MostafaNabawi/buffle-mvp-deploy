import { React, useEffect, useState } from "react";
import { Row, Col, ProgressBar } from "react-bootstrap";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
import Countdown from "react-countdown";
import { getTotalSeconds } from "../../../config/utils";
import { deleteNextBreak } from "../../../api";
import { useToasts } from "react-toast-notifications";
const PreogressBar = ({ range }) => {
  const [total, setTotal] = useState(range / 1000);
  const [play, setPlay] = useState(false);
  const [data, setData] = useState(0);
  const [percentUI, setPercentUI] = useState(0);
  const { addToast } = useToasts();
  // actions
  const handlePlay = () => {
    if (data > 0 && play) {
      console.log("set status to stop");
      setPlay(!play);
    }
    if (data > 0 && !play) {
      const newMeta = getTotalSeconds(range?.startDate, range?.endDate);
      setTotal(newMeta.total);
      setData(newMeta.passed * 1000);
      setPercentUI((100 / newMeta.total) * newMeta?.passed);
      setPlay(!play);
    }
  };

  useEffect(() => {
    if (range?.startDate) {
      // check type
      if (range?.type === 1) {
        const meta = getTotalSeconds(range?.startDate, range?.endDate);
        setTotal(meta.total);
        setData(meta.passed * 1000);
        setPlay(true);
        setPercentUI((100 / meta.total) * meta?.passed);
      }
      if (range?.type === 2) {
        const meta = getTotalSeconds(range?.startDate, range?.endDate);
        setTotal(meta.total);
        setData(meta.passed * 1000);
        setPlay(true);
        setPercentUI((100 / meta.total) * meta?.passed + 1);
      }
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
            color={play && percentUI > 0 ? "" : `#4922ff`}
            className={style.iconWatch}
            icon="bi:clock-fill"
          />
          <ProgressBar
            label={
              play && (
                <Countdown
                  date={new Date(range?.endDate)}
                  onTick={(time) => {
                    setData(time.total);
                  }}
                  renderer={(props) => (
                    <span
                      className={
                        percentUI >= 28 ? "showTimeReverse" : "showTime"
                      }
                    >
                      {props.formatted.hours}:{props.formatted.minutes}:
                      {props.formatted.seconds}
                    </span>
                  )}
                  onComplete={async () => {
                    addToast("Next Break Finished!", {
                      appearance: "success",
                    });
                    await deleteNextBreak();
                  }}
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
