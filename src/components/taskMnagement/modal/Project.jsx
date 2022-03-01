import React from "react";
import Select from 'react-select';
import PulseLoader from "react-spinners/PulseLoader";

function Project(props) {
  const { handleChangeProject, value, project } = props;

  function ProjectChange(val) {
    handleChangeProject(val);

  }
  return (
    // value?.label?.length > 0 ?
    <Select options={project} onChange={ProjectChange} value={value} className="select-input-item-modal" />
    // : <PulseLoader />
  );
}

export default Project;
