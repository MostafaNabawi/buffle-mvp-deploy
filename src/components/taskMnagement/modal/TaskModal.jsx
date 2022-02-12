/* eslint-disable  no-unused-vars */
/* eslint-disable  react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Modal, Form, Container, Col, Row, Button } from "react-bootstrap";
import Project from "./Project";
import style from "./style.module.css";
import { Icon } from "@iconify/react";
import {
  updateTask,

  getProject,
  getProjectById,
} from "../../../api";
import { useToasts } from "react-toast-notifications";
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TaskModal(props) {
  const { handleClose, title, className, item, handleCheck, handleDelete, droped } = props;
  const { addToast } = useToasts();
  const [taskTitle, setTaskTitle] = useState(item.content);
  const [projects, setProjects] = useState({ label: "", value: "" });
  const [taskDesc, setTaskDesc] = useState(item.description);
  const [newTime, setNewTime] = useState({ createIime: item.start_time });
  const [startDate, setStartDate] = useState(new Date(item.date));
  const [projectId, setProjectId] = useState(item.p_id);
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
    const getP = await getProjectById(projectId);
    if (getP.data !== null) {
      const selected = { value: getP.data._id, label: getP.data.name };
      setOldValue(selected);
    } else {
      const selected = { value: 0, label: "No Project" };
      setOldValue(selected);
    }
  }
  useEffect(() => {
    request();
  }, []);
  useEffect(() => {
    if (projectId || droped) {

      request();
    }
  }, [projectId, droped]);
  const handleKeyDownTask = async () => {
    const data = {
      id: item.tb_id,
      name: taskTitle,
      type: 0,
      date: startDate,
      description: taskDesc,
      taskTime: newTime.createIime,
      day_of_week: moment(startDate).format('dddd')
    };
    const updateT = await updateTask(data);
    if (updateT.status === 200) {
      addToast("Item susseccfully updated", {
        autoDismiss: true,
        appearance: "success",
      });
      handleCheck(data.id);
      handleClose();
      handleCheck('');

    } else {
      addToast("Error! Please Try Again!", {
        autoDismiss: false,
        appearance: "error",
      });
      handleClose();
    }
  };
  const handleClick = (value) => {
    setProjectId(value.value);
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
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <Project
              {...props}
              handleClick={handleClick}
              value={oldValue}
              project={projects}
              handleSetProjct={handleCheck}
            />
            {/* <RepeatTask /> */}
            <button type="button" onClick={() => { handleDelete(item.tb_id) }}>
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
                />
              </label>
            </div>
            <Form.Label className="important-modal-textarea-label">
              Description
            </Form.Label>
            <Form.Group
              controlId="exampleForm.ControlTextarea1"
              className="important-modal-input-textarea"
            >

              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={item.description}
                onChange={(e) => setTaskDesc(e.target.value)}
              />
            </Form.Group>
            <>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Row>
                    <Col xl="12">
                      <Form.Label className="important-modal-input-label">
                        Time
                      </Form.Label>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                          required
                          type="time"
                          placeholder="Time"
                          name="createIime"
                          value={newTime.createIime}
                          onChange={(e) =>
                            setNewTime({
                              ...newTime,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </>
          </Modal.Body>

          <Modal.Footer className="important-today-modal-footer">
            <Button variant="primary" type="button" onClick={handleKeyDownTask}>
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Container>
    </Modal>
  );
}

export default TaskModal;
