import { React } from "react";
import { Row, Col } from "react-bootstrap";

const Sidebar = () => {
  return (
    <div className="container-fluid">
      <Row className="pt-4">
        <Col>Icon 1</Col>
        <Col>Icon 2</Col>
      </Row>
    </div>
  );
};

export default Sidebar;