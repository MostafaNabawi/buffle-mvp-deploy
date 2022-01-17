import { React, useState, useEffect } from "react";
import Item from "../item";
import DropWrapper from "../DropWrapper";
import { Button, Col, Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Icon } from "@iconify/react";
import Modal from "../../modal/modal";
import { createTask, getProject, getTask } from "../../../api";
import { useToasts } from 'react-toast-notifications';
import moment from 'moment';

const ProjectManagement = () => {
  const { addToast } = useToasts();
  const [items, setItems] = useState([]);
  const [projects, setProjects] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [inputTask, setInputTask] = useState({ name: '', p_id: '' });

  useEffect(() => {
    async function request() {
      // get project and format
      const req = await getProject();
      const formatP = req.data.map((i, n) => {
        return {
          id: n,
          status: moment(i.date, "YYYY-MM-DD HH:mm:ss").format("dddd"),
          content: i.name,
          p_id: i._id,
        };
      });
      setProjects(formatP);

      //get tasks and format
      const data = await getTask();
      const format = data.data.map((i, n) => {
        return {
          id: n,
          status: moment(i.date, "YYYY-MM-DD HH:mm:ss").format("dddd"),
          content: i.name,
          projectId: i.projectId,
        };
      });
      setItems(format);
    }
    request();
  }, []);

  // insert task to database for project
  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      const createT = await createTask(inputTask);
      if (createT.status === 200) {
        addToast("Created Susseccfully", { autoDismiss: true, appearance: 'success' });

        setInputTask('');
      }
      else {
        addToast("Error Please Try Again!", { autoDismiss: false, appearance: 'error' });
      }
    }
  }


  const onDrop = (item, monitor, status) => {
    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i.id !== item.id)
        .concat({ ...item, status });
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
      {projects.map((s) => {
        return (
          <Col key={s.id} className={"col-wrapper secondary-dark"}>
            <Row className={"col-header"}>
              <Col lg="10">{s.content}</Col>
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
                  .filter((i) => i.projectId === s.p_id)
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

                  <Form.Group className="mb-3" controlId="form-new-task">
                    <input type="text" className="new_task_input"
                      placeholder="New Task"
                      aria-label="New Task" onChange={(e) => (
                        setInputTask({ name: e.target.value, p_id: s.p_id })

                      )
                      }
                      onKeyDown={handleKeyDown} />
                  </Form.Group>
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
                <Form.Control type="text" placeholder="Name your project..."
                // onChange={(e) => (
                // setProjectName(e.target.value),
                // validateProject(e.target.value)
                // )
                // }
                />
                {/* {error ? (
                  <div className="invalid-feedback d-block">
                    {error}
                  </div>
                ) : null} */}
              </Form.Group>
            </Col>
          </Row>
        }
        footer={
          <>
            <Button onClick={handleClose}>Close</Button>
            <Button variant="primary"  >
              Save
            </Button>
          </>
        }
      />
    </Row >
  );
};
export default ProjectManagement;
