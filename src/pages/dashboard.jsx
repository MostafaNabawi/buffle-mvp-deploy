import { React } from "react";
import { Row, Col, Image } from "react-bootstrap";
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
          <Card>
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
          <Card>
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
            <ProgressBar
              lable={`
                    ${new Date().getHours()}
                    :${new Date().getMinutes()}
                    :${new Date().getSeconds()}
                    `}
            />
          </Card>
        </Col>
        <Col xl={3}>
          <Card>
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
          <Card>
            <CardHeader
              icon={<Image src="/icone/musical-note 1.png" alt="vector image" />}
              title={
                <h4 className="heading4 custom-title ">Worktunes</h4>
              }
              action=''
            />
            {/* muted */}
            <audio controls className="mt-3">
              <source  src="/music/1.mp3" type="audio/ogg"/>
                <source src="/music/2.mp3" type="audio/mpeg"/>
                  Your browser does not support the audio element.
                </audio>
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

