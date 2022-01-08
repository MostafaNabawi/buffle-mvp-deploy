import { React, useState } from "react";
import { Row, Col, Image, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import ProgressBar from "../components/common/progressBar/ProgressBar";
import CardHeader from "../components/card/CardHeader";
import Card from "../components/card/Card";
import HydrationReminderCard from "./../components/hydrationReminder/HydrationReminderCard";
import ScreenFreeReminderCard from "./../components/screenFreeReminder/ScreenFreeReminderCard";
import EventCalender from "./../components/eventCalender/EventCalender";
import ImpotentToDayCard from "./../components/impotentToDay/ImpotentToDayCard";
import BreackplanFrom from "../components/breakplan/BreakplanForm";

const Dashboard = () => {
  const [modalShow, setModalShow] = useState(false);
  const [BreakPlanForm, setBreakPlanFrom] = useState(false)
  const [breackJoinOrSagest, setBreackJoinOrSagest] = useState(false)
  const [breackNewTime, setBreackNewTime] = useState(false)

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
                <i onClick={() => {

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
                <>
                  <Icon icon="vaadin:plus" />
                </>
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
              <BreackplanFrom
                show={BreakPlanForm}
                setShow={setBreakPlanFrom}
                newTime={breackNewTime}
                joinOrSagest={breackJoinOrSagest}
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
                      setBreackJoinOrSagest(true)
                      setBreackNewTime(false)
                    }} className="break-type">orders Lieferando</span>
                    <span
                      className="break-time"
                      onClick={() => {
                        setBreakPlanFrom(true)
                        setBreackJoinOrSagest(false)
                        setBreackNewTime(true)
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
                            setBreackJoinOrSagest(false)
                            setBreackNewTime(false)
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
    </section>
  );
};

export default Dashboard;
