import React from "react";
import { useDrop } from "react-dnd";
import { PROJECT_ITEM } from "../data/types";
// import { statuses } from "../data";

const DropWrapperProject = ({ onDrop, children, status, statuses }) => {
  console.log("DWP => ", status, statuses);
  const [{ isOver }, drop] = useDrop({
    accept: PROJECT_ITEM,
    canDrop: (item, monitor) => {
      const itemIndex = statuses.findIndex((si) => si.status === item.status);
      const statusIndex = statuses.findIndex((si) => si.status === status);
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
