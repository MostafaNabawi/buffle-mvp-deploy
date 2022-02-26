import { React, useEffect, useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Icon } from "@iconify/react";
import Table from "../../table/Table";
import style from "../../table/style.module.css";
import { PulseLoader } from "react-spinners";
import { getCompanySpaceData } from "../../../api";
import { FormattedMessage } from "react-intl";

const UserList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [statusFilterData, setStatusFilterData] = useState([]);
  const [statusFilter, setStatusFilter] = useState(0);
  const [isFilter, setIsFilter] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    async function pageData() {
      const payload = await getCompanySpaceData();
      if (payload?.status === 200) {
        setData(payload?.data);
        setLoading(false);
      }
    }
    pageData();
    return () => {
      setData([]);
      setLoading(true);
    };
  }, []);

  useEffect(() => {
    if (statusFilter === 0) {
      setStatusFilterData([]);
      setIsFilter(false);
    }
    if (statusFilter === 1) {
      const filterStatue = data.filter((i) => i.status === "active");
      setStatusFilterData(filterStatue);
      setIsFilter(true);
    }
    if (statusFilter === 2) {
      const filterStatue = data.filter((i) => i.status !== "active");
      setStatusFilterData(filterStatue);
      setIsFilter(true);
    }
  }, [statusFilter]);

  const refresh = async () => {
    setLoading(true);
    const payload = await getCompanySpaceData();
    if (payload?.status === 200) {
      setData(payload?.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (searchInput === "") {
      setStatusFilterData([]);
      setIsFilter(false);
    } else {
      let filteredData = data.filter(
        (i) =>
          i?.details[0]?.email
            ?.toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          i?.details[0]?.first_name
            ?.toLowerCase()
            .includes(searchInput.toLowerCase())
      );
      setIsFilter(true);
      setStatusFilterData(filteredData);
    }
  }, [searchInput]);
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
          <Col xl={3}></Col>
          <Col xl={3}>
            <Form.Group className="mb-3 input-group" controlId="formBasicEmail">
              <Form.Select
                onChange={(e) => setStatusFilter(Number(e.target.value))}
              >
                <option value="0">All</option>
                <option value="1">Active</option>
                <option value="2">Block</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xl={3}>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Group
                className="mb-3 input-group"
                controlId="formBasicPassword"
              >
                <Form.Control
                  type="search"
                  placeholder="Search eg(Name , Email)"
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                  }}
                />
                <Button variant="primary" type="submit">
                  <Icon icon="bi:search" />
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col xl={12}>
            <Table
              tableHeader={[
                <FormattedMessage
                  defaultMessage="First Name"
                  id="user.fname"
                />,
                <FormattedMessage defaultMessage="Last Name" id="user.lname" />,
                <FormattedMessage defaultMessage="Email" id="label.email" />,
                <FormattedMessage defaultMessage="Type" id="type" />,
                <FormattedMessage defaultMessage="Action" id="action" />,
              ]}
              tableBody={isFilter ? statusFilterData : data}
              isPagination={true}
              refresh={refresh}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserList;
