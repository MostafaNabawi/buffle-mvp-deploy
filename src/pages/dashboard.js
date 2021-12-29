import { React } from "react";
import { Row, Col } from "react-bootstrap";
import TaskManagementCard from "../components/TaskManagementCard";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <Row>
        <Col lg="1">sidebar</Col>
        <Col lg="11">
          <Row>header</Row>
          <Row>after header</Row>
          <Row>
            <TaskManagementCard />
          </Row>
          <Row>abbase</Row>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
