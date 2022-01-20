import { React, useEffect, useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Icon } from "@iconify/react";
import Table from "../../table/Table";
import style from "../../table/style.module.css";
import { PulseLoader } from "react-spinners";
import { getCompanySpaceData } from "../../../api";

const UserList = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function pageData() {
      const payload = await getCompanySpaceData();
      console.log(payload);
    }
    pageData();
  }, []);

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
              <Form.Select>
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
              tableBody={
                <tr>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>
                    <Icon icon="grommet-icons:unlock" />
                    <Icon icon="bi:info" />
                  </td>
                </tr>
              }
              isPagination={true}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserList;
