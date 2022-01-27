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
  const [filteredData, setFilteredData] = useState([]);
  // filter inputs
  const [statusFilter, setStatusFilter] = useState(0);
  const [typeFilter, setTypeFilter] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function pageData() {
      const payload = await getAllUsers();
      console.log(payload);
      if (payload?.status === 200) {
        setData(payload?.data);
        setLoading(false);
      }
    }
    pageData();
  }, []);
  // useEffect(() => {
  //   if (statusFilter === 0) {
  //     setFilteredData([]);
  //   }
  //   if(statusFilter === 1){
  //     let filtered =
  //   }
  //   if (statusFilter === 2) {
  //     const filterStatue = data.filter((i) => i.status !== "active");
  //     setStatusFilterData(filterStatue);
  //   }
  //   if (statusFilter === 1) {
  //     setStatusFilterData([]);
  //   }
  // }, [statusFilter]);
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
  }, [typeFilter]);
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
                <option value="0">All</option>
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
              tableBody={filteredData.length > 0 ? filteredData : data}
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
