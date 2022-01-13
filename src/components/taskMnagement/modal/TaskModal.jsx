import React, { useState } from "react";
import { Modal, Form, Container } from "react-bootstrap";
import DatePicker from "./DatePicker";
import Project from "./Project";
import RepeatTask from "./RepeatTask";
import style from "./style.module.css";
import { Icon } from "@iconify/react";
function TaskModal(props) {
  const { handleClose, title, className } = props;
  const [show, setshow] = useState("");
  const handleToggle = (e) => {
    setshow(e);
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
            <DatePicker handleToggle={handleToggle} show={show} />
            <Project handleToggle={handleToggle} show={show} />
            <RepeatTask handleToggle={handleToggle} show={show} />
            <button type="button">
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
                <input tyle="text" defaultValue={title} />
              </label>
            </div>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" rows={5} />
            </Form.Group>
          </Modal.Body>
        </Form>
      </Container>
    </Modal>
  );
}

export default TaskModal;
