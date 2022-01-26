import React, { useEffect, useState } from "react";
import { getProject, setProjectToItem, getProjectById } from "../../../api";
import Button from "./Button";
import style from "./style.module.css";
import Select from 'react-select';
import { useToasts } from 'react-toast-notifications';
import PulseLoader from "react-spinners/PulseLoader";

function Project(props) {
  const { handleClick, value, project, handleSetProjct } = props;
  const { addToast } = useToasts();
  const [itemId, setItemId] = useState(props.item.tb_id);

  async function ProjectChange(val) {
    handleClick(val.value);
    handleSetProjct(val.value)
    const update = await setProjectToItem(itemId, val.value);
    if (update.status === 200) {
      addToast("Project set successfully", { autoDismiss: true, appearance: 'success' });
    }
    else {
      addToast("Error! Please Try Again!", { autoDismiss: false, appearance: 'error' });
    }
  }
  return (
    value?.label?.length > 0 ? <Select options={project} onChange={ProjectChange} value={value} className="select-input-item-modal" /> : <PulseLoader />
  );
}

export default Project;
