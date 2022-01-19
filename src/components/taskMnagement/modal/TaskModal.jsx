import React, { useState } from "react";
import { Modal, Form, Container } from "react-bootstrap";
import DatePicker from "./DatePicker";
import Project from "./Project";
import RepeatTask from "./RepeatTask";
import style from "./style.module.css";
import { Icon } from "@iconify/react";
import { updateTask, deleteTask } from "../../../api";
import { useToasts } from "react-toast-notifications";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function TaskModal(props) {
  const { handleClose, title, className, item } = props;

  const { addToast } = useToasts();
  const MySwal = withReactContent(Swal);
  const [taskTitle, setTaskTitle] = useState(item.content);
  const [taskDesc, setTaskDesc] = useState(item.description);

  const handleKeyDownTask = async (event) => {
    if (event.key === "Enter") {
      const data = {
        id: item.tb_id,
        name: taskTitle,
        type: 0,
        date: item.date,
        description: taskDesc,
      };

      const updateT = await updateTask(data);
      if (updateT.status === 200) {
        addToast("Updated Susseccfully", {
          autoDismiss: true,
          appearance: "success",
        });
        handleClose();
      } else {
        addToast("Error! Please Try Again!", {
          autoDismiss: false,
          appearance: "error",
        });
        handleClose();
      }
    }
  };

  const handleDelete = async () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleteT = await deleteTask(item.tb_id);
          // const filterData = data.filter((item) => item.id !== id)
          // setData(filterData)
          if (deleteT.status === 200) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            handleClose();
          } else {
            addToast("Error: Please Try Again!.", {
              appearance: "error",
              autoDismiss: true,
            });
            handleClose();
          }
        } catch (error) {
          addToast("Error: Please Try Again!.", {
            appearance: "error",
            autoDismiss: true,
          });
          handleClose();
        }
      }
    });
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose}
      className={`${style.modal} ${className}_modal`}
    >
      <Container>
        <Form>
          <Modal.Header className={style.modal_header}>
            <DatePicker />
            <Project {...props} />
            {/* <RepeatTask /> */}
            <button type="button" onClick={handleDelete}>
              <Icon icon="akar-icons:trash-can" />
            </button>
            <button type="button" onClick={handleClose}>
              <Icon icon="ep:close-bold" />
            </button>
          </Modal.Header>
          <Modal.Body>
            <div className={`${style.label_area} mb-3`}>
              <label>
                <input type="checkbox" className="form-check-input" />
                <input
                  tyle="text"
                  defaultValue={title}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  onKeyDown={handleKeyDownTask}
                />
              </label>
            </div>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows={5}
                defaultValue={item.description}
                onChange={(e) => setTaskDesc(e.target.value)}
                onKeyDown={handleKeyDownTask}
              />
            </Form.Group>
          </Modal.Body>
        </Form>
      </Container>
    </Modal>
  );
}

export default TaskModal;
