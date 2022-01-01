import { React } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, Form } from "react-bootstrap";
import { Icon } from '@iconify/react';
import ProgressBar from '../components/common/ProgressBar'
import CardHeader from "../components/card/CardHeader";
import WaterRepository from "../components/WaterRepository";
import Card from "../components/card/Card";

const Dashboard = () => {
  return (
    <section>
      {/* section one */}
      <Row>
        <Col xl={3}>
          <Card className="custom-h-card">
            <CardHeader
              icon={<Image src="/icone/brain 1.png" alt="vector image" />}
              title={
                <h4 className="heading4 custom-title ">How you feel today</h4>
              }
              action=''
            />
            <div className="pt-3 pb-0 mb-0">
              <Image src="/icone/1.png" alt="vector image" />
              <Image src="/icone/2.png" alt="vector image" />
              <Image src="/icone/3.png" alt="vector image" />
              <Image src="/icone/4.png" alt="vector image" />
              <Image src="/icone/5.png" alt="vector image" />
            </div>
          </Card>
        </Col>
        <Col xl={3}>
          <Card className="custom-h-card">
            <CardHeader
              icon={<Image src="/icone/countdown to break 2.png" alt="vector image" />}
              title={
                <h4 className="heading4 custom-title ">Next break</h4>
              }
              action={
                <>
                  <Icon icon="bi:plus" />
                </>}
            />
            <div className="mt-3 pb-0 mb-0 mr-3">
              <ProgressBar
                lable={`
                    ${new Date().getHours()}
                    :${new Date().getMinutes()}
                    :${new Date().getSeconds()}
                    `}
              />
            </div>
          </Card>
        </Col>
        <Col xl={3}>
          <Card className="custom-h-card">
            <CardHeader
              icon={<Image src="/icone/smiling-face-with-sunglasses 1.png" alt="vector image" />}
              title={
                <h4 className="heading4 custom-title ">Vacation Time</h4>
              }
              action={
                <>
                  <Icon icon="bi:plus" />
                </>}
            />
            <Row className="mt-3">
              <Col xl="4"><div className="vacation-day">23 Days</div></Col>
              <Col xl="8" className="vacation-until">left until MyKonos</Col>
            </Row>
          </Card>
        </Col>
        <Col xl={3}>
          <Card className="custom-h-card">
            <CardHeader
              icon={<Image src="/icone/musical-note 1.png" alt="vector image" />}
              title={
                <h4 className="heading4 custom-title ">Worktunes</h4>
              }
              action=''
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
          <Card >
            <CardHeader
              icon={<Image className="tesk-manager-icon" src="/icone/task manager 1.png" alt="vector image" />}
              title={
                <>
                  <h4 className="task-manager">Task Manager</h4>
                  <h4 className="heading4 custom-title ">4 opan ,1 started</h4></>
              }
              action={
                <>
                  <Icon className="action-icon" icon="bi:plus" />
                  <Icon className="action-icon" icon="codicon:kebab-vertical" />
                </>
              }
            />
            <Row>
              <Row className="task-manager-body">
                <Col xl="9">
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
                <Col xl="3">
                  <ProgressBar
                    lable={`
                    ${new Date().getHours()}
                    :${new Date().getMinutes()}
                    :${new Date().getSeconds()}
                    `}
                  />
                </Col>
              </Row >
              <div className="devidre"></div>
              <Row className="task-manager-body">
                <Col xl="9">
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
                <Col xl="3">
                  <ProgressBar
                    lable={`
                    ${new Date().getHours()}
                    :${new Date().getMinutes()}
                    :${new Date().getSeconds()}
                    `}
                  />
                </Col>
              </Row>
              <div className="devidre"></div>
              <Row className="task-manager-body">
                <Col xl="9">
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
                <Col xl="3">
                  <ProgressBar
                    lable={`
                    ${new Date().getHours()}
                    :${new Date().getMinutes()}
                    :${new Date().getSeconds()}
                    `}
                  />
                </Col>
              </Row>
              <div className="devidre"></div>
              <Row className="task-manager-body">
                <Col xl="9">
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
                <Col xl="3">
                  <ProgressBar
                    lable={`
                    ${new Date().getHours()}
                    :${new Date().getMinutes()}
                    :${new Date().getSeconds()}
                    `}
                  />
                </Col>
              </Row>
              <div className="devidre"></div>
            </Row>
          </Card>
        </Col>
        <Col xl={4}>
          <Card>
            <CardHeader
              icon={<Image src="/icone/direct-hit 1.png" alt="vector image" />}
              title={
                <h4 className="heading4 breakplan-title ">Breakplan </h4>
              }
              action=''
            />
            <div className="mt-3">
              <Row className="mt-3">
                <Col className="col-2">
                  <div className="breakplan-icon navy-blue text-center pt-2">
                    <Image className="breakplan-img" src="/icone/WB_Headshots-102-web 1.png" />
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
                    <Image className="breakplan-img" src="/icone/RJ_Headshots-84-web 1.png" />
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
                    <Image className="breakplan-img" src="/icone/2018-11-27-Cornelius-W-111 1.png" />
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
                <Col> 
                <div className="creat-breack-time">
                  <div className="what-is-breack">
                     What’s your breakplan?
                  </div>
                  <ul className="pt-1 pl-2">
                    <li><Link  className="break-plan" to="">Plan</Link></li>
                  </ul>
                </div>
                </Col>
              </Row>

            </div>
          </Card>
        </Col>
      </Row>
      {/* end */}
      <Row>
        <Col xl={4}>
          <Card>
            <CardHeader
              icon={<Image src="/icone/Vector.png" alt="vector image" />}
              title={
                <h4 className="heading4 secondary-color ">Hydration Reminder</h4>
              }
              action={
                <>
                  <i className="fa fa-plus" aria-hidden="true"></i>
                  <span>i</span>
                </>
              }
            />
            <div className="pt-4">
              <WaterRepository />
            </div>
          </Card>
        </Col>
        <Col xl={4}>
          <Card>
            <CardHeader>
              <h1>hello</h1>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <h1>hello</h1>
            </CardHeader>
          </Card>
        </Col>
        <Col xl={4}>
          <Card>
            <CardHeader>
              <h1>hello</h1>
            </CardHeader>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default Dashboard;

