import { React } from "react";
import { Row, Col,Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="container-fluid">
      <Row className="pt-4">
        <Col>
           <Link to=""><Image src="/icone/countdown to break 3.png"/></Link>
        </Col>
        <Col>
           <Link to=""><Image src="/icone/countdown to break 1.png"/></Link>
        </Col>
        <Col>
           <Link to=""><Image src="/icone/kittysplit 1.png"/></Link>
        </Col>
        <Col>
           <Link to=""><Image src="/icone/task manager 1.png"/></Link>
        </Col>
        <Col>
           <Link to=""><Image src="/icone/Vector.png"/></Link>
        </Col>
        <Col>
           <Link to=""><Image src="/icone/eye 1.png"/></Link>
        </Col>
        <Col>
           <Link to=""><Image src="/icone/task manager 1.png"/></Link>
        </Col>
        <Col>
           <Link to=""><Image src="/icone/exclamation-mark 7.png"/></Link>
        </Col>
        <Col>
           <Link to=""><Image src="/icone/exclamation-mark 3.png"/></Link>
        </Col>
        <Col>
           <Link to=""><Image src="/icone/exclamation-mark 4.png"/></Link>
        </Col>
        <Col>
           <Link to=""><Image src="/icone/exclamation-mark 5.png"/></Link>
        </Col>
        <Col>
           <Link to=""><Image src="/icone/exclamation-mark 6.png"/></Link>
        </Col>
        <Col>
           <Link to=""><Image src="/icone/blue-book 1.png"/></Link>
        </Col>
      </Row>
    </div>
  );
};

export default Sidebar;