import React from "react";
import { useDrop } from "react-dnd";
import { ITEM_TYPE } from "./data/types";
import { statuses } from "./data";
import { updateTaskDate } from "../../api";
import { useToasts } from "react-toast-notifications";
import { useState } from "react";
import moment from "moment";
const DropWrapper = ({ onDrop, children, status, idNumber }) => {
  const { addToast } = useToasts();
  async function ProjectChange(id, date) {
    const mDate = moment(date); // Thursday Feb 2015
    const dayNum = mDate.day();
    const newDayNumber = dayNum - idNumber;
    console.log("num", newDayNumber);

    let d = new Date(date);
    if (newDayNumber > 0) {
      var dayDate = d.setDate(d.getDate() - newDayNumber);
    } else if (newDayNumber < 0) {
      var dayDate = d.setDate(d.getDate() - newDayNumber);
    } else {
      var dayDate = d.setDate(d.getDate());
    }
    console.log("date", new Date(dayDate).toISOString());
    const update = await updateTaskDate(id, new Date(dayDate).toISOString());
    // if (update.status === 200) {
    //     addToast("Droped successfully", { autoDismiss: true, appearance: 'success' });
    // }
    // else {
    //     addToast("Error! Please Try Again!", { autoDismiss: false, appearance: 'error' });
    // }
  }
  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    canDrop: (item, monitor) => {
      const itemIndex = statuses.findIndex((si) => si.status === item.status);
      const statusIndex = statuses.findIndex((si) => si.status === status);

      return [statusIndex, statusIndex, itemIndex].includes(statusIndex);
    },
    drop: (item, monitor) => {
      onDrop(item, monitor, status);
      ProjectChange(item.tb_id, item.date);

      console.log("edit here when droped", item, status, idNumber);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={"drop-wrapper"}>
      {React.cloneElement(children, { isOver })}
    </div>
  );
};

export default DropWrapper;
