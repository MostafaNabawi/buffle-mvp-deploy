import React from "react";
import { Row, Col,Button } from "react-bootstrap";
import SideBar from "./SideBar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
function Layout(props) {
  return (
    <div className="container-fluid min-layo">
      <Row>
        <Col className="col-1 sideBar-container p-0">
          <SideBar />
        </Col>
        <Col className="secondary-color">
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
      {/* <Button className="sidebar-btn-toggle">close</Button> */}
    </div>
  );
}

export default Layout;
