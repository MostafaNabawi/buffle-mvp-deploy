import { React } from "react";
import { Row, Col, Image } from "react-bootstrap";
import CardHeader from "../components/card/CardHeader";
import WaterPool from "../components/WaterPool";
import Card from "./../components/card/Card";
const Dashboard = () => {
  return (
    <section>
      <Row>
        <Col xl={4}>
          <Card>
            <CardHeader
              icon={<Image src="/icone/Vector.png" alt="vector image" />}
              title={
                <h4 className="heading4 secondar-color ">Hydration Reminder</h4>
              }
              action={
                <>
                  <i className="fa fa-plus" aria-hidden="true"></i>
                  <span>i</span>
                </>
              }
            />
            <div className="pt-4">
              <WaterPool />
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

