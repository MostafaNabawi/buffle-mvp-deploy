import { React, useEffect, useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Icon } from "@iconify/react";
import Table from "../../table/Table";
import style from "../../table/style.module.css";
import { PulseLoader } from "react-spinners";
import { getCompanySpaceData } from "../../../api";

const UserList = ({ type }) => {
  console.log("user list", type);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [statusFilterData, setStatusFilterData] = useState([]);
  const [statusFilter, setStatusFilter] = useState(1);
  useEffect(() => {
    async function pageData() {
      const payload = await getCompanySpaceData();
      console.log(payload);
      if (payload?.status === 200) {
        setData(payload?.data);
        setLoading(false);
      }
    }
    pageData();
  }, []);
  useEffect(() => {
    if (statusFilter === 2) {
      const filterStatue = data.filter((i) => i.status !== "active");
      setStatusFilterData(filterStatue);
    }
    if (statusFilter === 1) {
      setStatusFilterData([]);
    }
  }, [statusFilter]);
  if (loading) {
    return (
      <>
        <Container className={`secondary-color `} fluid>
          <Row className="justify-content-center">
            <Col xl={3}>
              <PulseLoader />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
  return (
    <>
      <Container className={`secondary-color `} fluid>
        <Row className="justify-content-center">
          <Col xl={3}>
            <h3 className={style.titleHeader}>User management</h3>
          </Col>
          <Col xl={3}>
            {type === "a" && (
              <Form.Group
                className="mb-3 input-group"
                controlId="formBasicEmail"
              >
                <Form.Select>
                  <option value="1">All</option>
                  <option value="1">Company</option>
                  <option value="2">Student</option>
                  <option value="3">Freelancer</option>
                </Form.Select>
              </Form.Group>
            )}
          </Col>
          <Col xl={3}>
            <Form.Group className="mb-3 input-group" controlId="formBasicEmail">
              <Form.Select
                onChange={(e) => setStatusFilter(Number(e.target.value))}
              >
                <option value="1">All</option>
                <option value="2">Block</option>
                <option value="3">Confirem</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xl={3}>
            <Form>
              <Form.Group
                className="mb-3 input-group"
                controlId="formBasicPassword"
              >
                <Form.Control type="search" placeholder="Search..." />
                <Button variant="primary" type="submit">
                  <Icon icon="bi:search" />
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col xl={12}>
            <Table
              tableHeader={[
                "First Name",
                "Last Name",
                "Email",
                "Country",
                "Type",
                "action",
              ]}
              tableBody={statusFilterData.length > 0 ? statusFilterData : data}
              isPagination={true}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserList;
