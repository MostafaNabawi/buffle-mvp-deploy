import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Card from "./../card/Card";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CardBody from "./../card/CardBody";
import CardHeader from "./../card/CardHeader";
import Widget from "./../common/widget/Widget";
import { useToasts } from "react-toast-notifications";
import { Image, Row, Col, Button, Form } from "react-bootstrap";
import TimePicker from "react-time-picker";
import Modal from "../modal/modal";
import { getImportantToday, updateTaskImportant } from '../../api'
import BeatLoader from 'react-spinners/BeatLoader';

function ImpotentToDayCard() {
  const [show, setShow] = useState(false);
  const { addToast } = useToasts();
  const handleShow = () => setShow(true);
  const [timeFormat, setTimeFormat] = useState(false);
  const [duration, setDuration] = useState('');
  const [showSkleton, setShowSkleton] = useState(false);
  const [loading, setloading] = useState(false);
  const [itemId, setItemId] = useState('');
  const [error, setError] = useState("");
  const [data, setData] = useState([])
  const handleClose = () => {
    setShow(false);
    setError('');
    setTimeFormat(false)
  };

  async function request() {
    setShowSkleton(true);
    const getData = await getImportantToday();

    const format = getData?.data?.map((i, n) => {
      return {
        icon: <Icon icon="bi:clock-fill" color={`#4922ff`} />,
        time: i.start_time,
        content: i.name,
        id: i._id,

      };
    });
    setData(format)
    setShowSkleton(false);
  }

  useEffect(() => {
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
      const updateImportant = await updateTaskImportant(itemId, duration);
      if (updateImportant.status === 200) {
        addToast("Moved to task susseccfully", {
          autoDismiss: true,
          appearance: "success",
        });
        request();
        setloading(false);
        setShow(false);
        setTimeFormat(false)
      } else {
        addToast("Error Please Try Again!", {
          autoDismiss: false,
          appearance: "error",
        });
        setloading(false);
        setTimeFormat(false)
        return true;
      }
      setloading(false);
      setDuration("");
      setTimeFormat(false)

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
        <CardBody className={data.length === 0 ? 'paddingBottom' : ''}>
          {showSkleton ? (<Skeleton count={4} />) :
            data.length > 0 ?
              data.map((item) => (
                <Widget
                  key={item._id}
                  icon={item.icon}
                  title={item.time}
                  content={item.content}
                  handleShow={handleShow}
                  id={item.id}
                  handleClick={handleClick}
                />
              )) : <span >No important for today</span>


          }
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
                        setDuration(value)
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
            {loading && duration.length > 0 ? (
              <Button variant="primary">
                <BeatLoader />
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSubmit}>
                Move
              </Button>
            )}

          </>
        }
      />
    </>
  );
}

export default ImpotentToDayCard;
