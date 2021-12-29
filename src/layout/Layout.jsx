import React from "react";
import { Row, Col } from "react-bootstrap";
import SideBar from "./SideBar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
function Layout(props) {
  return (
    <div className="container-fluid px-0">
      <Row>
        <Col lg="1">
          <SideBar />
        </Col>
        <Col lg="11">
          <div className="main_container container">
            <Row>
              <Header />
            </Row>
            <div className="page_holder">
              <Outlet />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Layout;
