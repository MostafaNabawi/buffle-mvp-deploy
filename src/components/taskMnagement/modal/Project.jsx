import React, { useEffect, useState } from "react";
import { getProject, setProjectToItem, getProjectById } from "../../../api";
import Button from "./Button";
import style from "./style.module.css";
import Select from 'react-select';
import { useToasts } from 'react-toast-notifications';
import PulseLoader from "react-spinners/PulseLoader";

function Project(props) {
  const { addToast } = useToasts();
  const [projects, setProjects] = useState({ label: '', value: '' });
  const [itemId, setItemId] = useState(props.item.tb_id);
  const [pId, setPId] = useState(props.item.p_id);
  const [oldValue, setOldValue] = useState();

  async function request() {
    // get project and format
    const req = await getProject();
    const formatP = req.data.map((i, n) => {
      return {
        label: i.name,
        value: i._id,
      };

    });
    setProjects(formatP);
    const getP = await getProjectById(pId);
    if (getP.data !== null) {
      const selected = { value: getP.data._id, label: getP.data.name }
      setOldValue(selected);

    }
    else {
      const selected = { value: 0, label: 'No Project' }
      setOldValue(selected);
    }
  }

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    console.log(oldValue)
    request();
  }, [pId]);

  async function ProjectChange(val) {
    setOldValue({ value: val.value, label: val.label })
    setPId(val.value);
    const update = await setProjectToItem(itemId, val.value);
    if (update.status === 200) {
      addToast("Project set successfully", { autoDismiss: true, appearance: 'success' });
    }
    else {
      addToast("Error! Please Try Again!", { autoDismiss: false, appearance: 'error' });
    }
  }
  return (
    oldValue?.label?.length > 0 ? <Select options={projects} onChange={ProjectChange} value={oldValue} className="select-input-item-modal" /> : <PulseLoader />
  );
}

export default Project;
