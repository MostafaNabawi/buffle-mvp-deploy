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
import Modal from "../modal/modal";
import { getImportantToday, updateTaskImportant } from '../../api'
import BeatLoader from 'react-spinners/BeatLoader';
import TimePicker2 from "../common/timePicker/TimePicker2";


function ImpotentToDayCard({ handleMove }) {
  const [show, setShow] = useState(false);
  const { addToast } = useToasts();
  const handleShow = () => setShow(true);
  const [timeFormat, setTimeFormat] = useState(false);
  const [duration, setDuration] = useState('');
  const [showSkleton, setShowSkleton] = useState(false);
  const [loading, setloading] = useState(false);
  const [itemId, setItemId] = useState('');
  const [itemName, setItemName] = useState('');
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [durationTime, setDurationTime] = useState({
    hours: "00",
    minutes: "25",
    seconds: "00",
  });

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
  const handleClick = (id, name) => {
    setItemName(name);
    setItemId(id);
  }
  const handleSubmit = async () => {
    if (duration.length < 0) {
      setError("Duration time is required!");
      return false;
    } else {
      const duration =
        durationTime.hours +
        ":" +
        durationTime.minutes +
        ":" +
        durationTime.seconds;
      setError("");
      setloading(true);
      const updateImportant = await updateTaskImportant(itemId, itemName, duration, 'stop', checked);
      if (updateImportant.status === 200) {
        addToast("Moved to task susseccfully", {
          autoDismiss: true,
          appearance: "success",
        });
        handleMove(itemId);
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
      <Card className="pb-0">
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
            </>
          }
        />
        <CardBody className={`important-today-card-body ${data.length === 0 ? 'paddingBottom' : ''}`}>
          {showSkleton ? (<Skeleton count={4} />) :
            data.length > 0 ?
              data.map((item) => (
                <Widget
                  key={item.id}
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
                  <Col xl="12">
                    <TimePicker2
                      label={"duration time"}
                      value={durationTime}
                      setValue={setDurationTime}
                    />
                  </Col>
                  <Col xl="12">
                    <Form.Group check>
                      <Form.Label check className="extra-break-time">
                        <input type="checkbox" onChange={(e) => setChecked(e.target.checked)} />
                        Do you want to have 5 minutes break after this task finished?
                      </Form.Label>
                    </Form.Group>
                  </Col>
                </Row>
              </Form.Group>
            </Col>

          </Row>
        }
        footer={
          <>
            {loading && duration.length > 0 ? (
              <Button variant="primary">
                <BeatLoader />
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSubmit}>
                Move
              </Button>
            )}
            <Button variant="outline-dark" onClick={handleClose}>
              Cancel
            </Button>
          </>
        }
      />
    </>
  );
}

export default ImpotentToDayCard;
