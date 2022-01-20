import React from "react";
import { useDrop } from "react-dnd";
import { PROJECT_ITEM } from "../data/types";
// import { statuses } from "../data";

const DropWrapperProject = ({ onDrop, children, status, statuses }) => {
  console.log("DWP => ", statuses);
  const [{ isOver }, drop] = useDrop({
    accept: PROJECT_ITEM,
    canDrop: (item, monitor) => {
      console.log("iiiiii", item.id, "}}}", status);
      const itemIndex = statuses.findIndex((si) => si.id === item.id);
      console.log("DWP => ITEM INDEX", itemIndex);
      const statusIndex = statuses.findIndex((si) => si.id === status);
      console.log("DWP => STATUS INDEX", statusIndex);
      console.error("itemIndex |||| statusIndex", itemIndex, statusIndex);
      return [statusIndex, statusIndex, itemIndex].includes(statusIndex);
    },
    drop: (item, monitor) => {
      onDrop(item, monitor, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={"drop-wrapper-2"}>
      {React.cloneElement(children, { isOver })}
    </div>
  );
};

export default DropWrapperProject;
