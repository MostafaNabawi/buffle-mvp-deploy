import { React } from "react";
import { Row, Col,Image } from "react-bootstrap";

const Sidebar = () => {
  return (
    <div className="container-fluid">
      <Row className="pt-4">
        <Col>
           <Image src="/icone/countdown to break 3.png"/>
        </Col>
        <Col>Icon 2</Col>
      </Row>
    </div>
  );
};

export default Sidebar;