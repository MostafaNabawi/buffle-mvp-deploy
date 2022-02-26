import { React, useEffect, useState, useContext } from "react";
import { Table, Card, Pagination } from "react-bootstrap";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
import Swal from "sweetalert2";
import { Context } from "../../layout/Wrapper";
import Modal from "../modal/modal";
import { API_URL } from "../../config/index";
import { Row } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
const country = require("country-state-picker");

const RenderType = (space) => {
  if (space?.length > 0) {
    if (space[0]?.type === "f") {
      return (
        <span style={{ color: "GrayText" }}>
          <FormattedMessage id="freelancer" defaultMessage="Freelancer" />
        </span>
      );
    }
    if (space[0]?.type === "s") {
      return (
        <span style={{ color: "cornflowerblue" }}>
          <FormattedMessage id="student" defaultMessage="Student" />
        </span>
      );
    }

    if (space[0]?.type === "c") {
      return (
        <span style={{ color: "hotpink" }}>
          <FormattedMessage id="company" defaultMessage="Company" />{" "}
        </span>
      );
    }
    if (space[0]?.type === "a") {
      return "Websit Admin";
    }
  }
  return (
    <span style={{ color: "lightcoral" }}>
      <FormattedMessage id="app.member" defaultMessage=" Member" />{" "}
    </span>
  );
};
const TableAdmin = ({
  tableHeader,
  tableBody,
  headClass,
  bodyClass,
  isPagination,
  refresh,
}) => {
  const [current, setCurrent] = useState(1);
  const [innerData, setInnerData] = useState(tableBody);
  const [total, setTotal] = useState(tableBody.length);
  // data
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const context = useContext(Context);

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
            <th>
              <FormattedMessage id="profession" defaultMessage="Profession" />
            </th>
            <th>
              <FormattedMessage id="app.heard" defaultMessage="Heard" />
            </th>
          </>
        );
      }
      if (selectedUser?.space[0]?.type === "s") {
        return (
          <>
            <th>
              <FormattedMessage
                id="app.university"
                defaultMessage="University"
              />
            </th>
            <th>Studies </th>
            <th>
              <FormattedMessage id="app.semester" defaultMessage="Semester" />
            </th>
            <th>
              <FormattedMessage id="app.heard" defaultMessage="Heard" />
            </th>
          </>
        );
      }
      if (selectedUser?.space[0]?.type === "c") {
        return (
          <>
            <th>
              <FormattedMessage id="website" defaultMessage="Website" />
            </th>
            <th>
              <FormattedMessage id="csize" defaultMessage="Size" />
            </th>
            <th>
              <FormattedMessage id="headOffice" defaultMessage="Head Office" />
            </th>
            <th>
              <FormattedMessage id="taxid" defaultMessage="TaxId" />
            </th>
            <th>
              <FormattedMessage id="postal" defaultMessage="postal Code" />
            </th>
            <th>
              <FormattedMessage id="street" defaultMessage="street" />
            </th>
          </>
        );
      }
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
  // actions
  const handleBlock = (uid, space) => {
    if (uid) {
      const titleMsg =
        context.getCurrent() === 0 ? "Are you sure?" : "Bist du dir sicher?";
      Swal.fire({
        title: titleMsg,
        html: context.getCurrent() === 0
          ? `Do you want to <strong style="color : red">block</strong> workspace <b>${space}</b>?<br />😮`
          : `Möchten Sie <strong style="color : red">block</strong> Arbeitsplatz<b>${space}</b>?<br />😮`,
        cancelButtonText: context.getCurrent() === 0 ? "Cancel" : "Abbrechen",
        confirmButtonText: context.getCurrent() === 0 ? "Ok" : "OK",
        reverseButtons: false,
        showCancelButton: true,
      }).then((res) => {
        if (res.isConfirmed) {
          fetch(`${API_URL}/admin/block-account`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              space_id: uid,
            }),
          }).then((res) => {
            if (res.status === 200) {
              refresh();
              const msg = context.getCurrent() === 0 ? "Success" : "Erfolg";

              const msg2 =
                context.getCurrent() === 0
                  ? `You have blocked <b>${space}</b> successfully.`
                  : `Sie haben blockiert <b>${space}</b> erfolgreich.`
              Swal.fire(msg, msg2, "success");
            }
          });
        }
      });
    }
  };

  const handleActive = (uid, space, before = "", email) => {
    const mustSendMail = before === "pending" ? true : false;
    if (uid) {
      Swal.fire({
        title: "Are you sure?",
        html: context.getCurrent() === 0
          ? `Do you want to <strong style="color : green">Active</strong> workspace <b>${space}</b>?<br />🧐`
          : `Möchten Sie <strong style="color : green">Aktiv</strong> Arbeitsplatz <b>${space}</b>?<br />🧐`,
        cancelButtonText: context.getCurrent() === 0 ? "Cancel" : "Abbrechen",
        confirmButtonText: context.getCurrent() === 0 ? "Ok" : "OK",
        reverseButtons: false,
        showCancelButton: true,
      }).then((res) => {
        if (res.isConfirmed) {
          fetch(`${API_URL}/admin/active-account`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              space_id: uid,
              send: mustSendMail,
              email: email,
            }),
          }).then(async (res) => {
            const payload = await res.json();
            if (res.status === 200) {
              if (payload.type === 2) {
                refresh();
                const msg = context.getCurrent() === 0 ? "Success" : "Erfolg";

                const msg2 =
                  context.getCurrent() === 0
                    ? `You have activated <b>${space}</b> successfully.`
                    : `Sie haben aktiviert <b>${space}</b> erfolgreich.`
                Swal.fire(msg, msg2, "success");
              }
              if (payload.type === 1) {
                refresh();
                const msg = context.getCurrent() === 0 ? "Success" : "Erfolg";

                const msg2 =
                  context.getCurrent() === 0
                    ? `You have activated <b>${space}</b> ${payload?.msg} successfully.`
                    : `Sie haben aktiviert <b>${space}</b> ${payload?.msg} erfolgreich.`
                Swal.fire(msg, msg2, "success");

              }
            }
          });
        }
      });
    }
  };

  const RenderActions = ({ object }) => {
    if (object?.space[0]?.type !== "a") {
      if (object?.space.length === 0) {
        return (
          <>
            <Icon
              icon="vaadin:ellipsis-dots-v"
              className={`mx-2 ${style.pointer}`}
              onClick={() => {
                setSelectedUser(object);
                setShowModal(true);
              }}
            />
          </>
        );
      }
      return (
        <>
          <Icon
            icon="vaadin:ellipsis-dots-v"
            className={`mx-2 ${style.pointer}`}
            onClick={() => {
              setSelectedUser(object);
              setShowModal(true);
            }}
          />
          {object?.space[0]?.status === "active" && (
            <Icon
              icon="grommet-icons:unlock"
              color="green"
              className={style.pointer}
              onClick={() =>
                handleBlock(object?.space[0]?._id, object?.space[0]?.space_name)
              }
            />
          )}
          {object?.space[0]?.status === "block" && (
            <Icon
              icon="grommet-icons:lock"
              color="red"
              className={style.pointer}
              onClick={() =>
                handleActive(
                  object?.space[0]?._id,
                  object?.space[0]?.space_name
                )
              }
            />
          )}
          {object?.space[0]?.status === "pending" && (
            <Icon
              icon="grommet-icons:lock"
              style={{ color: "#2a52be" }}
              className={style.pointer}
              onClick={() =>
                handleActive(
                  object?.space[0]?._id,
                  object?.space[0]?.space_name,
                  "pending",
                  object?.email
                )
              }
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
                <td>
                  <FormattedMessage
                    id="notFound"
                    defaultMessage="No user Found!"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        {isPagination && total > 10 && (
          <Pagination className={style.custompagination}>
            <Pagination.Prev
              onClick={() => {
                const newCurrent = current - 1;
                if (newCurrent >= 1) {
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
        title={
          <FormattedMessage id="moreDetails" defaultMessage="More Details" />
        }
        
        body={
          <>
            <Row>
              <p>
                {" "}
                <FormattedMessage
                  id="personalData"
                  defaultMessage="👤 Personal Data:"
                />
              </p>
              <Table responsive>
                <thead className={headClass}>
                  <tr>
                    <th>
                      {" "}
                      <FormattedMessage
                        id="user.fullName"
                        defaultMessage="Full Name"
                      />
                    </th>
                    <th>
                      {" "}
                      <FormattedMessage id="country" defaultMessage="Country" />
                    </th>
                    <th>
                      {" "}
                      <FormattedMessage id="city" defaultMessage=" City" />
                    </th>
                    <th>
                      {" "}
                      <FormattedMessage
                        id="namespace"
                        defaultMessage="Space Name"
                      />
                    </th>
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
              <p>
                <FormattedMessage
                  id="otherData"
                  defaultMessage="🔅Other Data:"
                />
              </p>
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
