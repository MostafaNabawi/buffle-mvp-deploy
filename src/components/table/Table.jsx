import { React, useEffect, useState } from "react";
import { Table, Card, Pagination } from "react-bootstrap";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
import Swal from "sweetalert2";
import { MoonLoader } from "react-spinners";
const TableList = ({
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
                  <td>{i.details[0]?.first_name}</td>
                  <td> {i.details[0]?.last_name} </td>
                  <td> {i.details[0]?.email} </td>
                  <td> {i.details[0]?.country} </td>
                  <td>member</td>
                  <td
                    tabIndex="0"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Block/Unblock"
                  >
                    {i.status === "active" ? (
                      <Icon icon="grommet-icons:unlock" />
                    ) : (
                      <Icon
                        icon="grommet-icons:lock"
                        color={i.status !== "active" ? "red" : ""}
                        onClick={(e) =>
                          handleUnblock(
                            i.details[0]?._id,
                            `${i.details[0]?.first_name} ${i.details[0]?.last_name}`
                          )
                        }
                      />
                    )}
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
    </>
  );
};

export default TableList;
