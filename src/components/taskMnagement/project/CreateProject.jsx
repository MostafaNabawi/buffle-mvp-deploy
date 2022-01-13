import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import Modal from "../../modal/modal";
import { createProject } from "../../../api";
import BeatLoader from "react-spinners/BeatLoader";

const CreateProject = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');
  const [loading, setloading] = useState(false)

  const handleSubmit = async () => {
    if (!projectName) {
      setError('Project name is required!');
      return false;
    }
    else {
      setError('');
      setloading(true);
      const createP = await createProject(projectName);
      console.log(createP.status);
      if (createP.status === 200) {
        setloading(false);
        setShow(false);
      }
      setProjectName('');
      return true;

    }
  }
  return (
    <Row className="creat-project-row">
      <Col lg="6">projects</Col>
      <Col lg="6" className="creat-project-col">
        <div className="creat-project-div">
          <span className="creat-project-plus">
            <Icon icon="bi:plus-lg" />
          </span>
          <span className="creat-project-btn" onClick={handleShow}>
            create project
          </span>
        </div>
      </Col>
      <Modal
        show={show}
        handleClose={handleClose}
        title="Create Project"
        className="create-project-modal"
        body={
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" className={`${error.length > 0 ? 'red-border-input' : 'no-border-input'}`} placeholder="Name your project..." onChange={(e) => (
                  setProjectName(e.target.value)

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
            {loading && projectName.length > 0 ? <Button variant="primary"  >
              <BeatLoader />
            </Button> : <Button variant="primary" onClick={handleSubmit}  >
              Save
            </Button>}

          </>
        }
      />
    </Row>
  );
};
export default CreateProject;
