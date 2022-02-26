import { React, useEffect, useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Icon } from "@iconify/react";
import TableAdmin from "../../table/TableAdmin";
import style from "../../table/style.module.css";
import { PulseLoader } from "react-spinners";
import { getAllUsers } from "../../../api/admin";
import { FormattedMessage } from "react-intl";

const UserListAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // filter inputs
  const [statusFilter, setStatusFilter] = useState(0);
  const [typeFilter, setTypeFilter] = useState(0);
  //search input
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    async function pageData() {
      const payload = await getAllUsers();
      if (payload?.status === 200) {
        setData(payload?.data);
        setLoading(false);
      }
    }
    pageData();
  }, []);
  useEffect(() => {
    if (typeFilter === 0) {
      setFilteredData([]);
    }
    // company spaces
    if (typeFilter === 1) {
      let filtered = data.filter((i) => i?.space[0]?.type === "c");
      setFilteredData(filtered);
    }
    // Student spaces
    if (typeFilter === 2) {
      let filtered = data.filter((i) => i?.space[0]?.type === "s");
      setFilteredData(filtered);
    }
    // freelancer spaces
    if (typeFilter === 3) {
      let filtered = data.filter((i) => i?.space[0]?.type === "f");
      setFilteredData(filtered);
    }
  }, [typeFilter, data]);
  //second useEffect
  useEffect(() => {
    if (statusFilter === 0) {
      setFilteredData([]);
    }
    // block spaces
    if (statusFilter === 1) {
      let filtered = data.filter((i) => i?.space[0]?.status === "block");
      setFilteredData(filtered);
    }
    // confirm spaces
    if (statusFilter === 2) {
      let filtered = data.filter(
        (i) => i?.space[0]?.status === "active" && i?.space[0]?.type !== "a"
      );
      setFilteredData(filtered);
    }
    if (statusFilter === 3) {
      let filtered = data.filter((i) => i?.space[0]?.status === "pending");
      setFilteredData(filtered);
    }
  }, [statusFilter, data]);
  // refresher
  useEffect(() => {
    if (searchInput === "") {
      setFilteredData([]);
    } else {
      let filteredData = data.filter(
        (i) =>
          i?.email?.toLowerCase().includes(searchInput.toLowerCase()) ||
          i?.first_name?.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredData(filteredData);
    }
  }, [searchInput]);
  const refresh = async () => {
    setLoading(true);
    const payload = await getAllUsers();
    if (payload?.status === 200) {
      setData(payload?.data);
      setLoading(false);
    }
  };
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
              <Form.Select
                onChange={(e) => {
                  setTypeFilter(Number(e.target.value));
                }}
              >
                <FormattedMessage id="all" defaultMessage="All">
                  {(msg) => <option value="0">{msg}</option>}
                </FormattedMessage>

                <FormattedMessage id="company" defaultMessage="Company">
                  {(msg) => <option value="1">{msg}</option>}
                </FormattedMessage>
                <FormattedMessage id="student" defaultMessage="Student">
                  {(msg) => <option value="2">{msg}</option>}
                </FormattedMessage>
                <FormattedMessage id="freelancer" defaultMessage="Freelancer">
                  {(msg) => <option value="3">{msg}</option>}
                </FormattedMessage>
                
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xl={3}>
            <Form.Group className="mb-3 input-group" controlId="formBasicEmail">
              <Form.Select
                onChange={(e) => setStatusFilter(Number(e.target.value))}
              >
                   <FormattedMessage id="all" defaultMessage="All">
                  {(msg) => <option value="0">{msg}</option>}
                </FormattedMessage>
                <FormattedMessage id="block" defaultMessage="Block">
                  {(msg) => <option value="1">{msg}</option>}
                </FormattedMessage>
                <FormattedMessage id="active" defaultMessage="Active">
                  {(msg) => <option value="2">{msg}</option>}
                </FormattedMessage>
                <FormattedMessage id="pending" defaultMessage="Pending">
                  {(msg) => <option value="3">{msg}</option>}
                </FormattedMessage>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xl={3}>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Group
                className="mb-3 input-group"
                controlId="formBasicPassword"
              > 
              <FormattedMessage id="searchEx" defaultMessage="Search eg(Name , Email)">
                  {(msg) =>  <Form.Control
                  type="search"
                  placeholder={msg}
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                  }}
                />}
                </FormattedMessage>
               
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
              tableBody={
                filteredData.length > 0 || searchInput !== ""
                  ? filteredData
                  : data
              }
              isPagination={true}
              refresh={refresh}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserListAdmin;
