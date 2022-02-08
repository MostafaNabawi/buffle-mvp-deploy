import Countdown from "react-countdown";
import { useDispatch, useSelector } from "react-redux";
import { setNotificatiionTimer } from "./../../store/hydrationSclice";

function CustomeDown({ notTimer, notDelay }) {
  const { notificDelay, notificTimer } = useSelector(
    (state) => state.hydration
  );
  const dispatch = useDispatch();
  return (
    <Countdown
      date={Date.now() + notTimer}
      onTick={(e) => {
        dispatch(setNotificatiionTimer(e.total));
      }}
      onComplete={() => {
        // dispatch(setNotificatiionTimer(notificDelay));
        alert("Hi");
      }}
      renderer={() => {
        return "";
      }}
    />
  );
}

export default CustomeDown;
