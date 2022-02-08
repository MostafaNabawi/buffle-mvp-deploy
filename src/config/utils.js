import moment from "moment";
import { calcTimeDelta } from "react-countdown";
import boop from "./boop.mp3";
// ---------------------------------------- Next Break Utils Function ------------------------
function timeDifference(time) {
  const dateTime = `${moment().get("M") + 1}/${moment().get(
    "D"
  )}/${moment().get("y")}`;
  const today = new Date(`${dateTime} ${time}`);
  const delta = calcTimeDelta(today);

  return { second: delta?.total, date: today };
}
// others
function getTotalSeconds(startDate, endDate) {
  console.log(startDate, endDate);
  let admission = moment(startDate, "DD-MM-YYYY HH:mm:ss");
  // end time
  var discharge = moment(endDate, "DD-MM-YYYY HH:mm:ss");
  // now time
  var now = moment(new Date().toISOString(), "DD-MM-YYYY HH:mm:ss");
  // total seconds wich user seted
  const totalSeconds = discharge.diff(admission, "seconds");
  // total seconds which passed
  const passedSeconds = now.diff(admission, "seconds");
  return { total: totalSeconds, passed: passedSeconds };
}
function nextBreakTimeValidation(start, end, status) {
  // start time
  let admission = moment(start, "DD-MM-YYYY HH:mm:ss");
  // end time
  var discharge = moment(end, "DD-MM-YYYY HH:mm:ss");
  // now time
  var now = moment(new Date().toISOString(), "DD-MM-YYYY HH:mm:ss");
  // total seconds wich user seted
  const totalSeconds = discharge.diff(admission, "seconds");
  // total seconds which passed
  const passedSeconds = now.diff(admission, "seconds");
  console.log("Total && passedMinutes", totalSeconds, passedSeconds);
  // if break time passed from the range
  if (passedSeconds >= totalSeconds) {
    return {
      type: 0,
      msg: `You had a next break on ${moment(end).format(
        "DD-MM-YYYY [at] hh:mm a"
      )}`,
    };
  }
  // if break time valid and mode is run
  return {
    type: 1,
    msg: "",
    total: totalSeconds * 1000,
  };
}
// check Email Is valid
function checkEmail(value) {
  if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value
    )
  ) {
    return false;
  } else {
    return true;
  }
}
function emitSound() {
  const audio = new Audio(boop);
  return audio;
}
// ---------------------------- Other Utils ------------------------------------
export {
  timeDifference,
  nextBreakTimeValidation,
  getTotalSeconds,
  checkEmail,
  emitSound,
};
