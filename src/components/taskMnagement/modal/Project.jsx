import React, { useEffect, useState } from "react";
import { getProject } from "../../../api";
import Button from "./Button";
import style from "./style.module.css";
import Select from 'react-select';
import moment from "moment";

function Project(props) {
  const title = "Project";
  const [projects, setProjects] = useState([]);
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

  return (
    <Select
      options={projects}
    />
  );
}

export default Project;
