import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Form } from "react-bootstrap";
import TaskModal from "./modal/TaskModal";
import { completeTask } from "../../api";
import { useToasts } from "react-toast-notifications";

const Item = (props) => {
  const { addToast } = useToasts();
  const { item, index, moveItem, PTYPE, handleGet, handleChecked, handleDelete, isDroped, pid } = props;
  var checked = item.completed === 'completed' ? 'checked' : '';
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: PTYPE,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoverRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: PTYPE,
    item: { ...item, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  drag(drop(ref));


  const handleCheck = async (e) => {
    if (e.target.checked) {

      handleChecked(e.target.id)
      const updateT = await completeTask(e.target.id, 'completed');
      if (updateT.status === 200) {
        addToast("Updated Susseccfully", {
          autoDismiss: true,
          appearance: "success",
        });
      } else {
        addToast("Error! Please Try Again!", {
          autoDismiss: false,
          appearance: "error",
        });
      }
    }
    else {
      handleChecked(e.target.id + 't')
      const updateT = await completeTask(e.target.id, null);
      if (updateT.status === 200) {
        addToast("Updated Susseccfully", {
          autoDismiss: true,
          appearance: "success",
        });
      } else {
        addToast("Error! Please Try Again!", {
          autoDismiss: false,
          appearance: "error",
        });
      }
    }

  }

  return (
    <Fragment>
      <div ref={ref} style={{ opacity: isDragging ? 0 : 1 }} className={"item"}>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check className="task-check-box" type="checkbox" id={item.tb_id} onChange={handleCheck} checked={checked ? 'checked' : ''} />
        </Form.Group>
        <span className={"item-title"} onClick={handleShow}>
          {item.content}
        </span>
        <div className={`color-bar color-bar-${item.day_of_week}`} />
      </div>

      <TaskModal
        show={show}
        handleClose={handleClose}
        className="create-project-modal"
        title={item.content}
        {...props}
        handleCheck={handleGet}
        handleDelete={handleDelete}
        isDroped={isDroped}
      />
    </Fragment>
  );
};

export default Item;