import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Card from "./../card/Card";
import CardBody from "./../card/CardBody";
import CardHeader from "./../card/CardHeader";
import Widget from "./../common/widget/Widget";
import { Image, Row, Col, Button, Form } from "react-bootstrap";
import TimePicker from "react-time-picker";
import Modal from "../modal/modal";
import { getImportantToday } from '../../api'
const widgetData = [
  {
    icon: <Icon icon="bi:clock-fill" color={`#4922ff`} />,
    title: "09:25",
    content: "Meeting with timo about upcoming projects",
  },
  {
    icon: <Icon icon="bi:clock-fill" color={`#4922ff`} />,
    title: "11:25",
    content: "Work on secret project",
  },
  {
    icon: <Icon icon="bi:clock-fill" color={`#4922ff`} />,
    title: "14:50",
    content: "Scurm class with design team and maneger",
  },
  {
    icon: <Icon icon="bi:clock-fill" color={`#4922ff`} />,
    title: "15:30",
    content: "Call with jon",
  },
];
function ImpotentToDayCard() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const [timeFormat, setTimeFormat] = useState(false);
  const [duration, setDuration] = useState('');
  const [loading, setloading] = useState(false);
  const [itemId, setItemId] = useState('');
  const [error, setError] = useState("");
  const [data, setData] = useState([])
  const handleClose = () => {
    setShow(false);
    setError('')
  };


  useEffect(() => {
    async function request() {
      const getData = await getImportantToday();
      console.log('itemid', getData)

      const format = getData?.data?.map((i, n) => {
        return {
          icon: <Icon icon="bi:clock-fill" color={`#4922ff`} />,
          time: i.start_time,
          content: i.name,
          id: i._id,

        };
      });
      setData(format)
    }
    request();
  }, [])
  const handleClick = (value) => {
    setItemId(value);
  }
  const handleSubmit = async () => {
    if (!duration) {
      setError("Duration time is required!");
      return false;
    } else {
      setError("");
      setloading(true);
      // const createP = await createProject(projectName, projectDesc);
      // if (createP.status === 200) {
      //   addToast("Created Susseccfully", {
      //     autoDismiss: true,
      //     appearance: "success",
      //   });
      //   setNewProject(true);
      //   setloading(false);
      //   setShowPModal(false);
      // } else {
      //   addToast("Error Please Try Again!", {
      //     autoDismiss: false,
      //     appearance: "error",
      //   });
      //   setloading(false);
      //   setProjectName("");
      //   return true;
      // }
      setloading(false);
      setDuration("");
      return true;
    }
  };
  return (
    <>
      <Card className="pb-0" onMouseEnter={() => console.log('enterd')}>
        <CardHeader
          icon={
            <Image
              src="/icone/exclamation-mark.png"
              alt="exclamation mark icon"
            />
          }
          title="Importent Today"
          action={
            <>
              <Link to="/dashboard/taskmanagement" className="secondary-dark-gray"><Icon icon="vaadin:plus" /></Link>
              <Icon icon="vaadin:ellipsis-dots-v" />
            </>
          }
        />
        <CardBody>
          {data.map((item) => (
            <Widget
              key={item._id}
              icon={item.icon}
              title={item.time}
              content={item.content}
              handleShow={handleShow}
              id={item.title}
              handleClick={handleClick}
            />
          ))}
        </CardBody>
      </Card>
      <Modal
        show={show}
        handleClose={handleClose}
        title="Move this item to task?"
        subTitle="Set duration time to task."
        body={
          <Row>

            <Col md={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Row>
                  <Col xl="4">
                    <Form.Label>Time Format </Form.Label>
                    <Form.Select
                      onChange={() => setTimeFormat(!timeFormat)}
                      className="selectTime"
                      aria-label="Default select example"
                    >
                      <option>Hour</option>
                      <option>Minute</option>
                    </Form.Select>
                  </Col>
                  <Col xl="8">
                    <Form.Label>Time</Form.Label>
                    <TimePicker
                      className={`form-control taskManagerTime ${error.length > 0 ? "red-border-input" : "no-border-input"
                        }`}
                      clearIcon
                      closeClock
                      format={timeFormat ? "mm:ss" : "hh:mm:ss"}
                      onChange={(value) => {
                        console.log("time...", value);
                      }}
                    // value={value}
                    />
                    {error ? (
                      <div className="invalid-feedback d-block">{error}</div>
                    ) : null}
                  </Col>
                </Row>
              </Form.Group>
            </Col>

          </Row>
        }
        footer={
          <>
            <Button variant="outline-dark" onClick={handleClose}>
              Cancel
            </Button>

            <Button
              variant="primary"
              type="button"
              onClick={handleSubmit}
            >
              Move
            </Button>
          </>
        }
      />
    </>
  );
}

export default ImpotentToDayCard;
