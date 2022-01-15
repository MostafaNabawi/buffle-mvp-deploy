import moment from "moment";
import { calcTimeDelta } from "react-countdown";
// ---------------------------------------- Next Break Utils Function ------------------------
function timeDifference(time) {
  const dateTime = `${moment().get("M") + 1}/${moment().get(
    "D"
  )}/${moment().get("y")}`;
  const today = new Date(`${dateTime} ${time}`);
  const delta = calcTimeDelta(today);

  return { second: delta?.total, date: today };
}
function nextBreakTimeValidation(start, end) {
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
        "DD-MM-YYYY HH:mm A"
      )}`,
    };
  }
  // if break time still valid
  return {
    type: 1,
    msg: "",
    total: totalSeconds * 1000,
  };
}
// ---------------------------- Other Utils ------------------------------------
export { timeDifference, nextBreakTimeValidation };
