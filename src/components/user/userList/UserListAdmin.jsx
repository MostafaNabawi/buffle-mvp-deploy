import { React, useEffect, useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Icon } from "@iconify/react";
import TableAdmin from "../../table/TableAdmin";
import style from "../../table/style.module.css";
import { PulseLoader } from "react-spinners";
import { getAllUsers } from "../../../api/admin";
import { useSearchParams } from "react-router-dom";

const UserListAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [statusFilterData, setStatusFilterData] = useState([]);
  const [statusFilter, setStatusFilter] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function pageData() {
      const payload = await getAllUsers();
      console.log(payload);
      if (payload?.status === 200) {
        console.log("payload", payload.data);
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
            <Form.Group className="mb-3 input-group" controlId="formBasicEmail">
              <Form.Select>
                <option value="1">All</option>
                <option value="1">Company</option>
                <option value="2">Student</option>
                <option value="3">Freelancer</option>
              </Form.Select>
            </Form.Group>
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
                <Form.Control
                  type="search"
                  placeholder="Search..."
                  onChange={(e) => {
                    if (e.target.value.length === 0) {
                      setSearchParams("");
                    }
                    setSearchParams(`?q=${e.target.value}`);
                  }}
                />
                <Button variant="primary" type="submit">
                  <Icon icon="bi:search" />
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col xl={12}>
            <TableAdmin
              tableHeader={[
                "First Name",
                "Last Name",
                "Email",
                "Country",
                "Type",
                "action",
              ]}
              tableBody={data}
              isPagination={true}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserListAdmin;
