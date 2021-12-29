import { React } from "react";
import { Row, Col } from "react-bootstrap";
import TaskManagementCard from "../components/TaskManagementCard";
import Sidebar from "../components/common/Sidebar";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <Row className="h-sidebar">
        <Col lg="1">
          <Sidebar />
        </Col>
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
