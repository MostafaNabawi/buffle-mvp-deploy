import React, { useEffect, useState } from "react";
import { getProject, setProjectToItem } from "../../../api";
import Button from "./Button";
import style from "./style.module.css";
<<<<<<< HEAD
import Select from 'react-select';
import { useToasts } from 'react-toast-notifications';

function Project(props) {
  const { addToast } = useToasts();
=======
import Select from "react-select";

function Project(props) {
  const [label, setLabel] = useState("");
>>>>>>> d847064614fa79d086b04aa60b72852a7fc1f0d4
  const title = "Project";
  const [projects, setProjects] = useState([]);
  const [itemId, setItemId] = useState(props.item.tb_id);
  useEffect(() => {
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
    }
    request();
  }, []);
  async function ProjectChange(val) {

    const update = await setProjectToItem(itemId, val.value);
    if (update.status === 200) {
      addToast("Project set successfully", { autoDismiss: true, appearance: 'success' });
    }
    else {
      addToast("Error! Please Try Again!", { autoDismiss: false, appearance: 'error' });
    }
  }
  return <Select options={projects} onChange={ProjectChange} />;
}

export default Project;
