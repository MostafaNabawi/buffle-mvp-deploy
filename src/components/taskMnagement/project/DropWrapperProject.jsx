import React from "react";
import { useDrop } from "react-dnd";
import { PROJECT_ITEM } from "../data/types";
import { updateTaskProject } from "../../../api";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from 'react-redux';
import { setProjectValue } from "../../../store/projectSlice";

const DropWrapperProject = ({ onDrop, children, status, statuses, handleDrop }) => {
  const dispatch = useDispatch();
  async function ProjectChange(id, p_id) {
    const update = await updateTaskProject(id, p_id);

    if (update.status === 200) {
      addToast("Droped successfully", { autoDismiss: true, appearance: 'success' });
    }
    else {
      addToast("Error! Please Try Again!", { autoDismiss: false, appearance: 'error' });
    }
  };
  const { addToast } = useToasts();
  const [{ isOver }, drop] = useDrop({
    accept: PROJECT_ITEM,
    canDrop: (item, monitor) => {
      const itemIndex = statuses.findIndex((si) => si.status === item.status);
      const statusIndex = statuses.findIndex((si) => si.status === status);
      return [statusIndex, statusIndex, itemIndex].includes(statusIndex);
    },
    drop: (item, monitor) => {
      onDrop(item, monitor, status);
      ProjectChange(item.tb_id, status)
      handleDrop(item.content + item.p_id);
      dispatch(setProjectValue(status));
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
