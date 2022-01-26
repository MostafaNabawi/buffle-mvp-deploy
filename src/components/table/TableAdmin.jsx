import { React, useEffect, useState } from "react";
import { Table, Card, Pagination } from "react-bootstrap";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
import Swal from "sweetalert2";
import Modal from "../modal/modal";
import { Row, Col } from "react-bootstrap";
const country = require("country-state-picker");

const RenderType = (space) => {
  if (space?.length > 0) {
    if (space[0]?.type === "f") {
      return <span style={{ color: "GrayText" }}>Freelancer</span>;
    }
    if (space[0]?.type === "s") {
      return <span style={{ color: "cornflowerblue" }}> Student </span>;
    }

    if (space[0]?.type === "c") {
      return <span style={{ color: "hotpink" }}> Company </span>;
    }
    if (space[0]?.type === "a") {
      return "Websit Admin";
    }
  }
  return <span style={{ color: "lightcoral" }}> Member </span>;
};
const TableAdmin = ({
  tableHeader,
  tableBody,
  headClass,
  bodyClass,
  isPagination,
}) => {
  const index = 0;
  const [current, setCurrent] = useState(1);
  const [innerData, setInnerData] = useState(tableBody);
  const [total, setTotal] = useState(tableBody.length);
  // data
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (current > 1) {
      const start = current * 10 - 10;
      setInnerData(tableBody.slice(start, start * 2));
    } else {
      setInnerData(tableBody.slice(0, 10));
    }
  }, [current]);
  useEffect(() => {
    setInnerData(tableBody);
    setCurrent(1);
    setTotal(tableBody.length);
  }, [tableBody]);
  const handleUnblock = (id, fullName) => {
    // console.log("user_id", e.target.id);
    const loader = Swal;

    Swal.fire({
      title: "Are you sure?",
      html: `Do you want to unblock <b>${fullName}</b>`,
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        Swal.fire({
          title: "Loading...",
          allowEscapeKey: false,
          allowOutsideClick: false,
          allowEnterKey: false,
          showConfirmButton: false,
          html: `<div aria-busy="true" class="">
              <svg width="40" height="40" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" aria-label="audio-loading"><defs><linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a"><stop stop-color="green" stop-opacity="0" offset="0%"></stop><stop stop-color="green" stop-opacity=".631" offset="63.146%"></stop><stop stop-color="green" offset="100%"></stop></linearGradient></defs><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)"><path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="green" stroke-width="2"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"></animateTransform></path><circle fill="#fff" cx="36" cy="18" r="1"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"></animateTransform></circle></g></g></svg>
              </div>`,
        });
      }
    });
  };
  const getCountry = (code) => {
    if (!code) {
      return "";
    }
    const { name } = country.getCountry(code);
    return name;
  };
  const RenderHead = () => {
    if (selectedUser) {
      if (selectedUser?.space[0]?.type === "f") {
        return (
          <>
            <th>Profession</th>
            <th> Heard </th>
          </>
        );
      }
      if (selectedUser?.space[0]?.type === "s") {
        return (
          <>
            <th>University</th>
            <th> Studies</th>
            <th>Semester</th>
            <th>Heard</th>
          </>
        );
      }
      if (selectedUser?.space[0]?.type === "c") {
        return (
          <>
            <th>Website</th>
            <th> Size</th>
            <th>Head Office</th>
            <th>TaxId</th>
            <th>postal Code</th>
            <th>street</th>
          </>
        );
      }
      // user is a member!
      // const data = await userUserWorkspace
      return "";
    }
  };

  const RenderBody = () => {
    if (selectedUser) {
      // if freelancer
      if (selectedUser?.space[0]?.type === "f") {
        return (
          <>
            <td>{selectedUser?.profession}</td>
            <td> {selectedUser?.heard} </td>
          </>
        );
      }
      // if student
      if (selectedUser?.space[0]?.type === "s") {
        return (
          <>
            <td>{selectedUser?.university}</td>
            <td> {selectedUser?.studies} </td>
            <td> {selectedUser?.semester} </td>
            <td>{selectedUser?.heard}</td>
          </>
        );
      }
      //if company
      if (selectedUser?.space[0]?.type === "c") {
        return (
          <>
            <td>
              <a href={selectedUser?.website}> {selectedUser?.website} </a>
            </td>
            <td> {selectedUser?.space[0]?.companySize} </td>
            <td>{selectedUser?.space[0]?.company_head_office}</td>
            <td> {selectedUser?.space[0]?.tax_id} </td>
            <td> {selectedUser?.space[0]?.postal_code} </td>
            <td> {selectedUser?.space[0]?.street} </td>
          </>
        );
      }
      //if member
      return "";
    }
  };
  const RenderActions = ({ object }) => {
    if (object?.space[0]?.type !== "a") {
      return (
        <>
          <Icon
            icon="vaadin:ellipsis-dots-v"
            className="mx-2"
            onClick={() => {
              setSelectedUser(object);
              setShowModal(true);
            }}
          />
          {object?.space[0]?.status === "active" && (
            <Icon icon="grommet-icons:unlock" color="green" />
          )}
          {object?.space[0]?.status !== "active" && (
            <Icon
              icon="grommet-icons:lock"
              color={object.status !== "active" ? "red" : ""}
            />
          )}
        </>
      );
    } else {
      return "";
    }
  };
  return (
    <>
      {/* Table */}
      <Card>
        <Table responsive>
          <thead className={headClass}>
            <tr>
              {tableHeader &&
                tableHeader.map((item) => (
                  <th key={item + 1} className={headClass}>
                    {item}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className={bodyClass}>
            {innerData.length > 0 ? (
              innerData.map((i, n) => (
                <tr key={`tr-${n}`}>
                  <td>{i?.first_name}</td>
                  <td> {i?.last_name} </td>
                  <td> {i?.email} </td>
                  <td> {i?.country} </td>
                  <td>{RenderType(i?.space)}</td>
                  <td>
                    <RenderActions object={i} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No user added.</td>
              </tr>
            )}
          </tbody>
        </Table>
        {isPagination && total > 10 && (
          <Pagination className={style.custompagination}>
            <Pagination.Prev
              onClick={() => {
                const newCurrent = current - 1;
                console.log("New current", newCurrent);
                if (newCurrent >= 0) {
                  setCurrent(newCurrent);
                }
              }}
            />
            {Array(Math.ceil(total / 10))
              .fill()
              .map((item, p) => (
                <Pagination.Item
                  key={`pgitem-${p}`}
                  active={p + 1 === current}
                  onClick={() => setCurrent(p + 1)}
                >
                  {p + 1}{" "}
                </Pagination.Item>
              ))}
            <Pagination.Next
              onClick={() => {
                const newCurrent = current + 1;
                if (newCurrent <= Math.ceil(total / 10)) {
                  setCurrent(newCurrent);
                }
              }}
            />
          </Pagination>
        )}
        {isPagination && total < 10 && (
          <Pagination className={style.custompagination}>
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Next />
          </Pagination>
        )}
      </Card>
      <Modal
        size="lg"
        show={showModal}
        handleClose={() => setShowModal(false)}
        title="More Details"
        body={
          <>
            <Row>
              <p>👤 Personal Data:</p>
              <Table responsive>
                <thead className={headClass}>
                  <tr>
                    <th>Full Name</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Space Name</th>
                  </tr>
                </thead>
                <tbody>
                  <td>
                    {`${selectedUser?.first_name} ${selectedUser?.last_name}`}
                  </td>
                  <td>{getCountry(selectedUser?.country)}</td>
                  <td>{selectedUser?.city}</td>
                  <td>
                    {selectedUser?.space[0]?.space_name || (
                      <span style={{ color: "red" }}>No space</span>
                    )}
                  </td>
                  {/* <td>{selectedUser?._id}</td> */}
                </tbody>
              </Table>
            </Row>
            <Row>
              <p>🔅Other Data:</p>
              <Table responsive>
                <thead className={headClass}>
                  <tr>
                    <RenderHead />
                  </tr>
                </thead>
                <tbody>
                  <RenderBody />
                </tbody>
              </Table>
            </Row>
          </>
        }
      />
    </>
  );
};

export default TableAdmin;
