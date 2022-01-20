import { React, useState, useEffect } from "react";
import Item from "../item";
import DropWrapperProject from "./DropWrapperProject";
import { Button, Col, Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Icon } from "@iconify/react";
import Modal from "../../modal/modal";
<<<<<<< HEAD
import { createTask, getProject, getTask } from "../../../api";
import { useToasts } from "react-toast-notifications";
import moment from "moment";
import { PROJECT_ITEM } from "../data/types";
=======
import { createTask, getProject, getTask, getProjectById, updateProject, createProject } from "../../../api";
import { useToasts } from 'react-toast-notifications';
import moment from 'moment';
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";
>>>>>>> 48f300c3b426d12337bafffc17e8a079cb4e6c05

const ProjectManagement = () => {
  const { addToast } = useToasts();
  const [items, setItems] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectIdEdit, setProjectIdEdit] = useState('');
  const [error, setError] = useState('');
  const [loading, setloading] = useState(false)
  const [newProject, setNewProject] = useState(false);
  const [show, setShow] = useState(false);
  const [showPModal, setShowPModal] = useState(false);
  const handleClosePModal = () => setShowPModal(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
<<<<<<< HEAD
  const [inputTask, setInputTask] = useState({ name: "", p_id: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function request() {
      // get project and format
      const req = await getProject();
      const pids = [];
      const formatP = req.data.map((i, n) => {
        pids.push(i._id);
        return {
          id: i._id,
          status: moment(i.date, "YYYY-MM-DD HH:mm:ss").format("dddd"),
          content: i.name,
        };
      });
      setProjects(formatP);

      //get tasks and format
      const data = await getTask();
      const ff = data.data.filter((i) => pids.includes(i.projectId));
      const format = ff.map((i, n) => {
        return {
          id: i.projectId,
          itemStatus: moment(i.date, "YYYY-MM-DD HH:mm:ss").format("dddd"),
          content: i.name,
        };
      });
      setItems(format);
      setLoading(false);
    }
    request();
  }, []);
  // insert task to database for project
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      const createT = await createTask(inputTask);
=======
  const handleShowPModal = () => setShowPModal(true);
  const [inputTask, setInputTask] = useState({ name: '', p_id: '' });
  const [newItems, setNewItems] = useState([]);


  async function request() {
    // get project and format
    const req = await getProject();
    const formatP = req?.data?.map((i, n) => {
      return {
        id: n,
        status: moment(i.date, "YYYY-MM-DD HH:mm:ss").format("dddd"),
        content: i.name,
        description: i.description,
        p_id: i._id,
      };
    });
    setProjects(formatP);

    //get tasks and format
    const data = await getTask();
    const format = data?.data?.map((i, n) => {
      return {
        id: n,
        status: moment(i.date, "YYYY-MM-DD HH:mm:ss").format("dddd"),
        content: i.name,
        projectId: i.projectId,
        tb_id: i._id,
        description: i.description,
        date: i.date,
      };
    });
    setItems(format);
  }


  useEffect(() => {
    request();
  }, []);


  useEffect(() => {
    request();
    setNewProject(false)
  }, [newProject])
  // insert task to database for project
  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      const createT = await createTask(inputTask, 0);
>>>>>>> 48f300c3b426d12337bafffc17e8a079cb4e6c05
      if (createT.status === 200) {
        addToast("Created Susseccfully", {
          autoDismiss: true,
          appearance: "success",
        });

<<<<<<< HEAD
        setInputTask("");
      } else {
        addToast("Error Please Try Again!", {
          autoDismiss: false,
          appearance: "error",
        });
      }
    }
  };
=======
        setNewProject(true);
        setInputTask("");
      }
      else {
        addToast("Error Please Try Again!", { autoDismiss: false, appearance: 'error' });
      }
    }
  }
  const getData = async (id) => {
    setProjectName('');
    setProjectDesc('');
    setProjectIdEdit('');
    handleShow();
    const data = await getProjectById(id);
    setProjectName(data.data.name)
    setProjectDesc(data.data.description)
    setProjectIdEdit(id)
  }
  const handleSubmitProject = async () => {
    if (!projectName) {
      setError('Project name is required!');
      return false;
    }
    else {
      setError('');
      setloading(true);
      const createP = await createProject(projectName, projectDesc);
      if (createP.status === 200) {
        addToast("Created Susseccfully", { autoDismiss: true, appearance: 'success' });
        setNewProject(true);
        setloading(false);
        setShowPModal(false);
      }
      else {
        addToast("Error Please Try Again!", { autoDismiss: false, appearance: 'error' });
        setloading(false)
        setProjectName('');
        return true;
      }
      setloading(false)
      setProjectName('');
      return true;

    }
  }
  const handleSubmit = async () => {
    if (!projectName) {
      setError('Project name is required!');
      return false;
    }
    else {
      setError('');
      setloading(true);
      const updateP = await updateProject(projectIdEdit, projectName, projectDesc);
      if (updateP.status === 200) {
        addToast("Updated Susseccfully", { autoDismiss: true, appearance: 'success' });
        setloading(false);
        setShow(false);
      }
      else {
        addToast("Error! Please Try Again!", { autoDismiss: false, appearance: 'error' });
        setloading(false)
        setProjectName('');
        return true;
      }
      setloading(false)
      setProjectName('');
      return true;
>>>>>>> 48f300c3b426d12337bafffc17e8a079cb4e6c05

    }
  }
  const onDrop = (item, monitor, status) => {
    console.warn("project item", item.id, items[0].id, status);
    console.log("item state", items);
    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i.id !== item.id)
        .concat({ ...item, status });
      console.log("New Items", newItems);
      return [...newItems];
    });
  };
  const moveItem = (dragIndex, hoverIndex) => {
    console.log("d - h", dragIndex, hoverIndex);
    const item = items[dragIndex];
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };
  if (loading) {
    return "Loading..";
  }
  return (
<<<<<<< HEAD
    <Row className="projectManagement">
      {projects.map((s) => {
        return (
          <Col key={s.id} className={"col-wrapper secondary-dark"}>
            <Row className={"col-header"}>
              <Col lg="10">{s.id}</Col>
              <Col lg="2" className="project-setting">
                <Icon
                  icon="icon-park-outline:setting"
                  className="project-setting-icon"
                  onClick={handleShow}
                />
              </Col>
            </Row>
            <hr className="task-manage-hr" />
            <DropWrapperProject
              onDrop={onDrop}
              statuses={projects}
              status={s.id}
            >
              <Col>
                {items
                  .filter((i) => i.id === s.id)
                  .map((i, idx) => (
                    <Item
                      key={i.id}
                      item={i}
                      index={idx}
                      moveItem={moveItem}
                      status={s}
                      PTYPE={PROJECT_ITEM}
                      className="project_item"
                    ></Item>
                  ))}
                <div className="new-task-div">
                  <Form.Group className="mb-3" controlId="form-new-task">
                    <input
                      type="text"
                      className="new_task_input"
                      placeholder="New Task"
                      aria-label="New Task"
                      onChange={(e) =>
                        setInputTask({ name: e.target.value, p_id: s.p_id })
                      }
                      onKeyDown={handleKeyDown}
                    />
                  </Form.Group>
                </div>
              </Col>
            </DropWrapperProject>
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
                <Form.Control
                  type="text"
                  placeholder="Name your project..."
                  // onChange={(e) => (
                  // setProjectName(e.target.value),
                  // validateProject(e.target.value)
                  // )
                  // }
                />
                {/* {error ? (
                  <div className="invalid-feedback d-block">
                    {error}
=======
    <>
      <Row className="creat-project-row">
        <Col lg="6">projects</Col>
        <Col lg="6" className="creat-project-col">
          <div className="creat-project-div">
            <span className="creat-project-plus">
              <Icon icon="bi:plus-lg" />
            </span>
            <span className="creat-project-btn" onClick={handleShowPModal}>
              create project
            </span>
          </div>
        </Col>
        <Modal
          show={showPModal}
          handleClose={handleClosePModal}
          title="Create Project"
          className="create-project-modal"
          body={
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" className={`${error.length > 0 ? 'red-border-input' : 'no-border-input'}`}
                    placeholder="Name your project..." onChange={(e) => (
                      setProjectName(e.target.value)

                    )
                    } />
                  {error ? (
                    <div className="invalid-feedback d-block">
                      {error}
                    </div>
                  ) : null}
                </Form.Group>
                <Form.Group >
                  <Form.Control as="textarea" rows={5} onChange={(e) => (
                    setProjectDesc(e.target.value)
                  )
                  } />
                </Form.Group>
              </Col>
            </Row>
          }
          footer={
            <>
              <Button onClick={handleClosePModal}>Close</Button>
              {loading && projectName.length > 0 ? <Button variant="primary"  >
                <BeatLoader />
              </Button> : <Button variant="primary" onClick={handleSubmitProject}  >
                Save
              </Button>}

            </>
          }
        />
      </Row>
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
                    onClick={() => getData(s.p_id)}
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
>>>>>>> 48f300c3b426d12337bafffc17e8a079cb4e6c05
                  </div>
                </Col>
              </DropWrapper>
            </Col>
<<<<<<< HEAD
          </Row>
        }
        footer={
          <>
            <Button onClick={handleClose}>Close</Button>
            <Button variant="primary">Save</Button>
          </>
        }
      />
    </Row>
=======
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
                {projectName.length > 0 ?
                  <>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="text" placeholder="Name your project..." defaultValue={projectName}
                        onChange={(e) => (
                          setProjectName(e.target.value)
                        )
                        }
                      />
                      {error ? (
                        <div className="invalid-feedback d-block">
                          {error}
                        </div>
                      ) : null}
                    </Form.Group>
                    <Form.Group >
                      <Form.Control as="textarea" rows={5} defaultValue={projectDesc} onChange={(e) => (
                        setProjectDesc(e.target.value)
                      )
                      } />
                    </Form.Group>
                  </> : <ClipLoader />}
              </Col>
            </Row>
          }
          footer={
            <>
              <Button onClick={handleClose}>Close</Button>
              {loading && projectName.length > 0 ? <Button variant="primary"  >
                <BeatLoader />
              </Button> : <Button variant="primary" onClick={handleSubmit}  >
                Save
              </Button>}
            </>
          }
        />
      </Row >
    </>
>>>>>>> 48f300c3b426d12337bafffc17e8a079cb4e6c05
  );
};
export default ProjectManagement;
