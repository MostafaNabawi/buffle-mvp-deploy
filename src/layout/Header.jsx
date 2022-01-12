import { React, useState, useEffect } from "react";
import { Row, Col, Form, Image, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { API_URL } from "../config";
import { logout } from "../api";

const Header = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const handleLogout = async () => {
    const req = await logout();
    if (req.status === 200) {
      localStorage.removeItem("user");
      navigate("/");
    }
  };
  useEffect(() => {
    const user_storage = JSON.parse(localStorage.getItem("user"));
    setUserData(user_storage);
    if (!user_storage) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Col className="col-12 header-name text-capitalize">
        Hi {userData?.first_name}
      </Col>
      <Row className="mb-4">
        <Col className="col-6 text-secondary-dark header-thank mt-3">
          Thank god it’s friday!
        </Col>
        <Col className="col-6 header-col-left">
          <div className="header-icon navy-blue text-center pt-2">
            <Image
              className="sidebar-icon"
              src="/icone/hcphotos-Headshots-1 2.png"
            />
          </div>
          <div className="header-icon navy-blue text-center pt-2">
            <NavDropdown
              title={
                <Image
                  className="sidebar-icon"
                  src="/icone/hcphotos-Headshots-1 1.png"
                />
              }
              className="navDropdomnIcon"
            >
              <NavDropdown.Item href="/dashboard/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="/dashboard/setting">
                Setting
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </div>
          <div className="form-search">
            <Form>
              <Form.Group
                className="mb-3 serach-input input-group"
                controlId="formBasicEmail"
              >
                <i className="search-icon">
                  <Icon icon="ci:search-small" />
                </i>
                <Form.Control
                  className="search-input2"
                  type="search"
                  placeholder="search"
                />
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Header;
