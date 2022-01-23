import React, { useEffect } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ioInstance } from "../config/socket";

function Layout() {
  useEffect(() => {
    try {
      ioInstance.on("feel", (data) => {
        console.log("Feel websocket ", data);
      });
    } catch (err) {
      ioInstance.close();
    }
  }, []);
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
