/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotificatiionTimer, setTimeOutID } from "../store/hydrationSclice";
import { setToggle } from "../store/notifySlice";
import { API_URL } from "../config/index";

function TimerCustome({ count, setCount }) {
  const dispatch = useDispatch();
  const sendNotific = () => {
    if (render && !isMute && notificTimer > 0) {
      fetch(`${API_URL}/user/water-notify`, {
        method: "POST",
        credentials: "include",
      });
      dispatch(setToggle({ type: 2, play: true }));
      setCount(count + 1);
    }
  };
  const { notificDelay, notificTimer, render, isMute } = useSelector(
    (state) => state.hydration
  );
  useEffect(() => {
    if (!render) {
      return;
    }
    if (notificTimer === "") {
      // console.log("😒");
    }
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

  return "";
}

export default TimerCustome;
