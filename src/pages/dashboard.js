import { React } from "react";
import { Row, Col } from "react-bootstrap";
import Sidebar from "../components/common/Sidebar";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <Row>
        <Col lg="1">
          <Sidebar/>
        </Col>
        <Col lg="11">
          <Row>header</Row>
          <Row>after header</Row>
          <Row>zia</Row>
          <Row>abbase</Row>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
