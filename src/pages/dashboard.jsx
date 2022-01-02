import { React } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { Icon } from "@iconify/react";
import ProgressBar from "../components/common/ProgressBar";
import CardHeader from "../components/card/CardHeader";
import Card from "../components/card/Card";
import HydrationReminderCard from "./../components/hydrationReminder/HydrationReminderCard";
import ScreenFreeReminderCard from "./../components/screenFreeReminder/ScreenFreeReminderCard";
import EventCalender from "./../components/eventCalender/EventCalender";
import ImpotentToDayCard from "./../components/impotentToDay/ImpotentToDayCard";
const Dashboard = () => {
  return (
    <section>
      {/* <Row>
        <Col xl={3}>
          <Card>
            <CardHeader
              icon={<Image src="/icone/brain 1.png" alt="vector image" />}
              title={
                <h4 className="heading4 custom-title ">How you feel today</h4>
              }
              action=""
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
              icon={
                <Image
                  src="/icone/countdown to break 2.png"
                  alt="vector image"
                />
              }
              title={<h4 className="heading4 custom-title ">Next break</h4>}
              action={
                <>
                  <Icon icon="bi:plus" />
                </>
              }
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
              icon={<Image src="/icone/brain 1.png" alt="vector image" />}
              title={
                <h4 className="heading4 custom-title ">How you feel today</h4>
              }
              action=""
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
              icon={<Image src="/icone/brain 1.png" alt="vector image" />}
              title={
                <h4 className="heading4 custom-title ">How you feel today</h4>
              }
              action=""
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
      </Row> */}
      {/* end */}
      <Row>
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
