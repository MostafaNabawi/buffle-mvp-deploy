import React from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

function Layout() {
  return (
    <div className="wrapper">
      <SideBar />
      <div className="main_container">
        <Container fluid>
          <Header />
          <div className="page_holder">
            <Outlet />
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Layout;
