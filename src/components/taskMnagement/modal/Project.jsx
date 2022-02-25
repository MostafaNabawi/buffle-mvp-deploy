import React, { useState } from "react";
import { setProjectToItem } from "../../../api";
import Select from 'react-select';
import { useToasts } from 'react-toast-notifications';
import PulseLoader from "react-spinners/PulseLoader";
import { FormattedMessage } from "react-intl";

function Project(props) {
  const { handleClick, value, project, handleSetProjct } = props;
  const { addToast } = useToasts();
  const [itemId, setItemId] = useState(props.item.tb_id);
  async function ProjectChange(val) {
    handleClick(val);
    handleSetProjct(val.label)
    const update = await setProjectToItem(itemId, val.value);
    if (update.status === 200) {
      addToast(<FormattedMessage id="project.set" defaultMessage="Project set successfully" />, { autoDismiss: true, appearance: 'success' });
    }
    else {
      addToast
        (<FormattedMessage
          defaultMessage="Error Please Try Again."
          id="breakPlan.Error"
        />, { autoDismiss: false, appearance: 'error' });
    }
  }
  return (
    value?.label?.length > 0 ? <Select options={project} onChange={ProjectChange} value={value} className="select-input-item-modal" /> : <PulseLoader />
  );
}

export default Project;
