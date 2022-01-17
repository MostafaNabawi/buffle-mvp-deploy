import React, { useEffect, useState } from "react";
import { getProject, setProjectToItem } from "../../../api";
import Button from "./Button";
import style from "./style.module.css";
import Select from 'react-select';

function Project(props) {
  const title = "Project";
  const [projects, setProjects] = useState([]);
  const [value, setValue] = useState([]);
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
    const update = await setProjectToItem(itemId, val);
    console.log(update)
  }
  console.log('sdsd', itemId)
  return (
    <Select
      options={projects}
      onChange={ProjectChange}
    />
  );
}

export default Project;
