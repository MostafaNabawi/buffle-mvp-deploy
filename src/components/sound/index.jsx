import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "../../store/notifySlice";
// import audio from "./boop.mp3";

export default function Index() {
  const { play, type } = useSelector((state) => state.notify);
  const dispatch = useDispatch();
  const audio = new Audio("/music/boop.mp3");
  const water = new Audio("/music/water.mp3");
  const taskDone = new Audio("/music/taskdone.mp3");
  const taskStart = new Audio("/music/taskstart.mp3");
  const nextBreak = new Audio("/music/break.mp3");

  useEffect(() => {
    console.log("😀", type, " ", play);
    if (play) {
      if (type === 1) {
        audio.play();
        audio.addEventListener("ended", () =>
          dispatch(setToggle({ type: 0, play: false }))
        );
      } else if (type === 2) {
        water.play();
        water.addEventListener("ended", () =>
          dispatch(setToggle({ type: 0, play: false }))
        );
      } else if (type === 3) {
        taskDone.play();
        taskDone.addEventListener("ended", () =>
          dispatch(setToggle({ type: 0, play: false }))
        );
      } else if (type === 4) {
        taskStart.play();
        taskStart.addEventListener("ended", () =>
          dispatch(setToggle({ type: 0, play: false }))
        );
      } else if (type === 5) {
        nextBreak.play();
        nextBreak.addEventListener("ended", () =>
          dispatch(setToggle({ type: 0, play: false }))
        );
      }
    }
    return () => {
      audio.removeEventListener("ended", () =>
        dispatch(setToggle({ type: 0, play: false }))
      );
      water.removeEventListener("ended", () =>
        dispatch(setToggle({ type: 0, play: false }))
      );

      taskDone.removeEventListener("ended", () =>
        dispatch(setToggle({ type: 0, play: false }))
      );

      taskStart.removeEventListener("ended", () =>
        dispatch(setToggle({ type: 0, play: false }))
      );
      nextBreak.removeEventListener("ended", () =>
        dispatch(setToggle({ type: 0, play: false }))
      );
    };
  }, [type]);
  return "";
}
