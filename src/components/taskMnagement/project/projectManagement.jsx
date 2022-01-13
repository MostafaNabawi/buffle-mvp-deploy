import { React, useState, useEffect } from "react";
import Item from "../item";
import DropWrapper from "../DropWrapper";
import { data, statuses } from "../data";
import { Button, Col, Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Icon } from "@iconify/react";
import Modal from "../../modal/modal";
import { getProject } from "../../../api";

const ProjectManagement = () => {
  const [items, setItems] = useState(data);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState('');
  const [projectName, setProjectName] = useState('');


  useEffect(() => {
    async function project() {
      const req = await getProject();
      console.log('req', req);
    }
    project();
  }, [])

  const validateProject = (value) => {
    if (!value) {
      setError('Project name is required!');
      return false;
    }
    setError('');
    return true;
  }

  const handleSubmit = () => {
    console.log('asdf');
  }
  const onDrop = (item, monitor, status) => {
    const mapping = statuses.find((si) => si.status === status);

    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i.id !== item.id)
        .concat({ ...item, status, icon: mapping.icon });
      return [...newItems];
    });
  };
  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };
  return (
    <Row className="projectManagement">
      {statuses.map((s) => {
        return (
          <Col key={s.status} className={"col-wrapper secondary-dark"}>
            <Row className={"col-header"}>
              <Col lg="10">{s.title}</Col>
              <Col lg="2" className="project-setting">
                <Icon
                  icon="icon-park-outline:setting"
                  className="project-setting-icon"
                  onClick={handleShow}
                />
              </Col>
            </Row>
            <hr className="task-manage-hr" />
            <DropWrapper onDrop={onDrop} status={s.status}>
              <Col>
                {items
                  .filter((i) => i.status === s.status)

                  .map((i, idx) => (
                    <Item
                      key={i.id}
                      item={i}
                      index={idx}
                      moveItem={moveItem}
                      status={s}
                      className="project_item"
                    ></Item>
                  ))}
                <div className="new-task-div">
                  <input
                    className="new_task_input"
                    placeholder="New Task"
                    aria-label="New Task"
                  />
                </div>
              </Col>
            </DropWrapper>
          </Col>
        );
      })}
      <Modal
        show={show}
        handleClose={handleClose}
        title="Update Project"
        className="create-project-modal"
        body={
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Name your project..." onChange={(e) => (
                  setProjectName(e.target.value),
                  validateProject(e.target.value)
                )
                } />
                {error ? (
                  <div className="invalid-feedback d-block">
                    {error}
                  </div>
                ) : null}
              </Form.Group>
            </Col>
          </Row>
        }
        footer={
          <>
            <Button onClick={handleClose}>Close</Button>
            <Button variant="primary" disabled={!projectName} onClick={handleSubmit}>
              Save
            </Button>
          </>
        }
      />
    </Row>
  );
};
export default ProjectManagement;
