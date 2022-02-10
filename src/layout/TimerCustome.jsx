import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotificatiionTimer } from "../store/hydrationSclice";
import { API_URL } from "../config/index";
import boop from "./boop.mp3";
import UIFx from "uifx";

function TimerCustome() {
  const dispatch = useDispatch();
  const beep = new UIFx(boop, {
    volume: 0.8,
  });
  const { notificDelay, notificTimer } = useSelector(
    (state) => state.hydration
  );
  useEffect(() => {
    if (notificTimer === 1000) {
      dispatch(setNotificatiionTimer(notificDelay + 1000));
      console.log("😍😎👌");
      sendNotific();
    } else {
      setTimeout(() => {
        dispatch(setNotificatiionTimer(notificTimer - 1000));
      }, 1000);
    }
  }, [notificTimer]);
  const sendNotific = () => {
    fetch(`${API_URL}/user/water-notify`, {
      method: "POST",
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        beep.play();
      }
    });
  };
  return "";
}

export default TimerCustome;
