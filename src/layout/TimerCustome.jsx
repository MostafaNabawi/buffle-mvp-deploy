import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotificatiionTimer, setTimeOutID } from "../store/hydrationSclice";
import { API_URL } from "../config/index";
import boop from "./boop.mp3";
import UIFx from "uifx";

function TimerCustome({ count, setCount }) {
  const dispatch = useDispatch();
  const beep = new UIFx(boop, {
    volume: 0.8,
  });
  const { notificDelay, notificTimer, render, isMute } = useSelector(
    (state) => state.hydration
  );
  useEffect(() => {
    if (notificTimer === 1000) {
      dispatch(setNotificatiionTimer(notificDelay + 1000));
      sendNotific();
    } else {
      let id = setTimeout(() => {
        dispatch(setNotificatiionTimer(notificTimer - 1000));
      }, 1000);
      dispatch(setTimeOutID(id));
    }
  }, [notificTimer]);

  const sendNotific = () => {
    if (render && !isMute) {
      fetch(`${API_URL}/user/water-notify`, {
        method: "POST",
        credentials: "include",
      }).then((res) => {
        if (res.status === 200) {
          beep.play();
          setCount(count + 1);
        }
      });
    }
  };
  return "";
}

export default TimerCustome;
