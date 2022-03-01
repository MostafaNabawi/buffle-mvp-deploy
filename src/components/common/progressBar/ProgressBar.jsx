import { React, useEffect, useState } from "react";
import { Row, Col, ProgressBar } from "react-bootstrap";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
import Countdown from "react-countdown";
import { getTotalSeconds } from "../../../config/utils";
import { deleteNextBreak } from "../../../api";
import { useToasts } from "react-toast-notifications";
import { FormattedMessage } from "react-intl";
import UIFx from "uifx";
import nextBreak from "./nextBreak.mp3";

const PreogressBar = ({ range }) => {
  const [total, setTotal] = useState(range / 1000);
  const [play, setPlay] = useState(false);
  const [data, setData] = useState(0);
  const [percentUI, setPercentUI] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const nextBreakSound = new UIFx(nextBreak, {
    volume: 0.5,
  });
  const { addToast } = useToasts();
  // actions
  const handlePlay = () => {
    if (data > 0 && play) {
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
    if (refresh) {
      console.log("Refresh the states!");
      setTotal(range / 1000);
      setPlay(false);
      setData(0);
      setPercentUI(0);
      setRefresh(false);
    }
  }, [refresh]);
  useEffect(() => {
    if (data > 0) {
      const per = 100 / total;
      setPercentUI(percentUI + per);
    }
  }, [data]);
  return (
    <>
      <Row>
        <Col xl="1">
          <Icon
            color={play && percentUI > 0 ? "" : `#4922ff`}
            className={style.iconWatch}
            icon="bi:clock-fill"
          />
        </Col>
        <Col xl="10" className="pl-0">
          <ProgressBar
            label={
              play && (
                <Countdown
                  key={`c-1`}
                  date={new Date(range?.endDate)}
                  autoStart={play}
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
                    setRefresh(true);
                    setPercentUI(100);

                    addToast(
                      <FormattedMessage
                        defaultMessage="Start your break now!"
                        id="break.finished"
                      />,
                      {
                        appearance: "success",
                        autoDismiss: 12000,
                      }
                    );
                    nextBreakSound.play();
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
