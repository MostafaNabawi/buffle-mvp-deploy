import moment from "moment";
import { calcTimeDelta } from "react-countdown";
function timeDifference(time) {
  const dateTime = `${moment().get("M") + 1}/${moment().get(
    "D"
  )}/${moment().get("y")}`;
  const today = new Date(`${dateTime} ${time}`);
  const delta = calcTimeDelta(today);

  return { second: delta?.total, date: today };
}
export { timeDifference };
