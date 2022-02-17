import moment from "moment";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../layout/Wrapper";

export default function DynamicInspiration() {
  const [text, setText] = useState("");
  const context = useContext(Context);
  useEffect(() => {
    const currentType = context.getCurrent();
    const today = moment(Date.now()).format("dddd");
    if (currentType === 1) {
      switch (today.toLowerCase()) {
        case "saturday":
          setText("Endlich Wochenende");
          return;
        case "sunday":
          setText("Entspannten Sonntag!");
          return;
        case "monday":
          setText("Der letzte Montag für diese Woche!");
          return;
        case "Tuesday":
          setText("Das war echt eine harte Woche!");
          return;
        case "wednesday":
          setText("Hälfte der Woche bald geschafft!");
          return;
        case "thursday":
          setText("Happy Vizefreitag!");
          return;
        case "friday":
          setText("Magische drei Worte: Heute ist Freitag!");
          return;
        default:
          return 404;
      }
    } else {
      switch (today.toLowerCase()) {
        case "saturday":
          setText("Saturday is all about good vibes");
          return;
        case "sunday":
          setText("Have a blessed & beautiful Sunday");
          return;
        case "monday":
          setText("Hope you had a great weekend!");
          return;
        case "Tuesday":
          setText("Tuesdays are for fresh Starts!");
          return;
        case "wednesday":
          setText("Willpower Wednesday!");
          return;
        case "thursday":
          setText("Thankful Thursday!");
          return;
        case "friday":
          setText("Thank god it's Friday!");
          return;
        default:
          return 404;
      }
    }
  }, [context]);
  return <>{text}</>;
}
