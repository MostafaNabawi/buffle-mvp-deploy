import { React, useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import ProgressBar from "../components/common/progressBar/ProgressBar";
import CardHeader from "../components/card/CardHeader";
import Card from "../components/card/Card";
import HydrationReminderCard from "./../components/hydrationReminder/HydrationReminderCard";
import ScreenFreeReminderCard from "./../components/screenFreeReminder/ScreenFreeReminderCard";
import EventCalender from "./../components/eventCalender/EventCalender";
import ImpotentToDayCard from "./../components/impotentToDay/ImpotentToDayCard";
import BreakplanFrom from "../components/breakplan/BreakplanForm";
import Modal from '../components/modal/modal'

const Dashboard = () => {
  // breck plan from
  const [BreakPlanForm, setBreakPlanFrom] = useState(false)
  const [breakJoinOrSagest, setBreakJoinOrSagest] = useState(false)
  const [breakNewTime, setBreakNewTime] = useState(false)
  // Modal
  const [titleModal, setTitleModa] = useState('')
  const [sizeModal,setSizeModal]=useState('')
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);
  const [vacationTime, setVacationTime] = useState(false);
  const [nextBreak, setNextBreak] = useState(false)
  // End Modal

  return (
    <section>
      <Row>
        <Col xl={3}>
          <Card className="custom-h-card  pt-3">
            <CardHeader
              className="p-0"
              icon={<Image src="/icone/brain 1.png" alt="vector image" />}
              title="How you feel today"
            />
            <div className="pt-3 pb-0 mb-0 card-feel-icon ">
              <Image
                className="feel-icon"
                src="/icone/1.png"
                alt="vector image"
              />
              <Image
                className="feel-icon"
                src="/icone/2.png"
                alt="vector image"
              />
              <Image
                className="feel-icon"
                src="/icone/3.png"
                alt="vector image"
              />
              <Image
                className="feel-icon"
                src="/icone/4.png"
                alt="vector image"
              />
              <Image
                className="feel-icon"
                src="/icone/5.png"
                alt="vector image"
              />
            </div>
          </Card>
        </Col>
        <Col xl={3}>
          <Card className="custom-h-card pr-5 pt-3">
            <CardHeader
              className="p-0"
              icon={
                <Image
                  src="/icone/countdown to break 2.png"
                  alt="vector image"
                />
              }
              title="Next break"
              action={
                <i title="When is your next break?" onClick={() => {
                  setModalShow(true)
                  setVacationTime(false)
                  setNextBreak(true)
                  setSizeModal('md')
                  setTitleModa('When is your next break?')
                }}>
                  <Icon icon="vaadin:plus" />
                </i>
              }
            />
            <Col className="progress-custom mt-3">
              <ProgressBar
                percent={60}
                lable={`
                    ${new Date().getHours()}
                    :${new Date().getMinutes()}
                    :${new Date().getSeconds()}
                    `}
              />
            </Col>
          </Card>
        </Col>
        <Col xl={3}>
          <Card className="custom-h-card  pt-3">
            <CardHeader
              className="p-0"
              icon={
                <Image
                  src="/icone/smiling-face-with-sunglasses 1.png"
                  alt="vector image"
                />
              }
              title="Vacation Time"
              action={
                <i title="Choose the date" onClick={() => {
                  setModalShow(true)
                  setNextBreak(false)
                  setVacationTime(true)
                  setSizeModal('md')
                  setTitleModa('Choose the date')
                }}>
                  <Icon icon="vaadin:plus" />
                </i>
              }
            />
            <div className="mt-3">
              <span className="vacation-day">23 Days </span>
              <span className="vacation-until">left until MyKonos</span>
            </div>
          </Card>
        </Col>
        <Col xl={3}>
          <Card className="custom-h-card pb-3 primary-gradient pt-3">
            <CardHeader
              className="p-0"
              titleClass="musicTitle"
              icon={
                <Image src="/icone/musical-note 1.png" alt="vector image" />
              }
              title="Worktunes"
            />
            {/* muted */}
            <audio controls className="mt-3">
              <source src="/music/1.mp3" type="audio/ogg" />
              <source src="/music/2.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </Card>
        </Col>
      </Row>
      {/* end */}
      {/* section tow */}
      <Row>
        <Col xl={8}>
          <Card>
            <CardHeader
              icon={
                <Image
                  className="tesk-manager-icon"
                  src="/icone/task manager 1.png"
                  alt="vector image"
                />
              }
              title="Task Manager"
              subtitle="4 opan ,1 started"
              action={
                <>
                  <Icon icon="vaadin:plus" />
                  <Icon icon="vaadin:ellipsis-dots-v" />
                </>
              }
            />
            <Row>
              <Row className="task-manager-body pt-0 mt-1 mb-1">
                <Col xl="8">
                  <Row className="pl-5">
                    <Col xl="1">
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check className="check-box " type="checkbox" />
                      </Form.Group>
                    </Col>
                    <Col xl="11" className="task-manager-text">
                      Setting individual sales targets with the sales team
                    </Col>
                  </Row>
                </Col>
                <Col xl="4">
                  <ProgressBar
                    percent={70}
                    lable={`
                    ${new Date().getHours()}
                    :${new Date().getMinutes()}
                    :${new Date().getSeconds()}
                    `}
                  />
                </Col>
              </Row>
              <div className="devidre"></div>
              <Row className="task-manager-body mt-1 mb-1">
                <Col xl="8">
                  <Row className="pl-5">
                    <Col xl="1">
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check className="check-box " type="checkbox" />
                      </Form.Group>
                    </Col>
                    <Col xl="11" className="task-manager-text">
                      Feedback for Raj
                    </Col>
                  </Row>
                </Col>
                <Col xl="4">
                  <ProgressBar
                    percent={60}
                    lable={`
                    ${new Date().getHours()}
                    :${new Date().getMinutes()}
                    :${new Date().getSeconds()}
                    `}
                  />
                </Col>
              </Row>
              <div className="devidre"></div>
              <Row className="task-manager-body mt-1 mb-1">
                <Col xl="8">
                  <Row className="pl-5">
                    <Col xl="1">
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check className="check-box " type="checkbox" />
                      </Form.Group>
                    </Col>
                    <Col xl="11" className="task-manager-text">
                      Tracking sales goals and reporting of last week
                    </Col>
                  </Row>
                </Col>
                <Col xl="4">
                  <ProgressBar
                    percent={70}
                    lable={`
                    ${new Date().getHours()}
                    :${new Date().getMinutes()}
                    :${new Date().getSeconds()}
                    `}
                  />
                </Col>
              </Row>
              <div className="devidre"></div>
              <Row className="task-manager-body mt-1 mb-1">
                <Col xl="8">
                  <Row className="pl-5">
                    <Col xl="1">
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check className="check-box " type="checkbox" />
                      </Form.Group>
                    </Col>
                    <Col xl="11" className="task-manager-text">
                      Preparing KPIs for Timo
                    </Col>
                  </Row>
                </Col>
                <Col xl="4">
                  <ProgressBar
                    percent={80}
                    lable={`
                    ${new Date().getHours()}
                    :${new Date().getMinutes()}
                    :${new Date().getSeconds()}
                    `}
                  />
                </Col>
              </Row>
              <div className="devidre "></div>
            </Row>
          </Card>
        </Col>
        <Col xl={4}>
          <Card className="breakplan-card">
            <CardHeader
              icon={<Image src="/icone/direct-hit 1.png" alt="vector image" />}
              title="Breakplan"
              action=""
            />
            <div>
              <BreakplanFrom
                show={BreakPlanForm}
                setShow={setBreakPlanFrom}
                newTime={breakNewTime}
                joinOrSagest={breakJoinOrSagest}
              />
              <Row className="mt-3">
                <Col className="col-2">
                  <div className="breakplan-icon navy-blue text-center pt-2">
                    <Image
                      className="breakplan-img"
                      src="/icone/WB_Headshots-102-web 1.png"
                    />
                  </div>
                </Col>
                <Col>
                  <div className="break-user-name">Raj Kumar</div>  <div>
                    <span onClick={() => {
                      setBreakPlanFrom(true)
                      setBreakJoinOrSagest(true)
                      setBreakNewTime(false)
                    }} className="break-type">orders Lieferando</span>
                    <span
                      className="break-time"
                      onClick={() => {
                        setBreakPlanFrom(true)
                        setBreakJoinOrSagest(false)
                        setBreakNewTime(true)
                      }}
                    >13:00</span>
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="col-2">
                  <div className="breakplan-icon navy-blue text-center pt-2">
                    <Image
                      className="breakplan-img"
                      src="/icone/RJ_Headshots-84-web 1.png"
                    />
                  </div>
                </Col>
                <Col>
                  <div className="break-user-name">Raj Kumar</div>
                  <div>
                    <span className="break-type">orders Lieferando</span>
                    <span className="break-time">13:00</span>
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="col-2">
                  <div className="breakplan-icon navy-blue text-center pt-2">
                    <Image
                      className="breakplan-img"
                      src="/icone/2018-11-27-Cornelius-W-111 1.png"
                    />
                  </div>
                </Col>
                <Col>
                  <div className="break-user-name">Raj Kumar</div>
                  <div>
                    <span className="break-type">orders Lieferando</span>
                    <span className="break-time">13:00</span>
                  </div>
                </Col>
              </Row>
              {/* Create New Plan */}
              <Row className="mt-3">
                <Col>
                  <div className="creat-breack-time">
                    <div className="what-is-breack">What’s your breakplan?</div>
                    <ul className="pt-1 pl-2">
                      <li>
                        <Link
                          className="break-plan"
                          to=""
                          onClick={() => {
                            setBreakPlanFrom(true)
                            setBreakJoinOrSagest(false)
                            setBreakNewTime(false)
                          }}
                        >
                          Plan
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
      {/* end */}
      <Row className="section_3">
        <Col xl={4}>
          <HydrationReminderCard />
        </Col>
        <Col xl={4}>
          <ScreenFreeReminderCard />
          <EventCalender />
        </Col>
        <Col xl={4}>
          <ImpotentToDayCard />
        </Col>
      </Row>
      {/* Modale */}
      <Modal
        size={sizeModal}
        show={modalShow}
        handleClose={handleClose}
        title={titleModal}
        body={
          <Row>
            {/* Vacation time Modal */}
            {vacationTime && (
              <>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Date </Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Time </Form.Label>
                    <Form.Control type="time" />
                  </Form.Group>
                </Col>
              </>
            )}
            {/* Next Break Modal */}
            {
              nextBreak && (
                <>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Time </Form.Label>
                      <Form.Control type="time" />
                    </Form.Group>
                  </Col>
                </>
              )
            }
          </Row>
        }
        footer={
          <>
            <Button onClick={handleClose}>Close</Button>
            {/* Vacation time btn */}
            {vacationTime && (
              <Button variant="primary" type="submit">
                Create Vacation
              </Button>
            )}
            {/* Next Break Btn */}
            {nextBreak && (
              <Button variant="primary" type="submit">
                Create Next Break
              </Button>
            )}
          </>
        }
      />
    </section>
  );
};

export default Dashboard;
