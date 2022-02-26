import { useEffect, useState, useContext } from "react";
import { Table, Card, Pagination } from "react-bootstrap";
import { Icon } from "@iconify/react";
import style from "./style.module.css";
import Swal from "sweetalert2";
import { API_URL } from "../../config";
import { Context } from "../../layout/Wrapper";
import { FormattedMessage } from "react-intl";
const TableList = ({
  tableHeader,
  tableBody,
  headClass,
  bodyClass,
  isPagination,
  refresh,
}) => {
  const context = useContext(Context);
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
          fetch(`${API_URL}/user/block`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              usi: uid,
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

  const handleActive = (uid, space) => {
    if (uid) {
      const titleMsg =
        context.getCurrent() === 0 ? "Are you sure?" : "Bist du dir sicher?";
      Swal.fire({
        title: titleMsg,
        html: context.getCurrent() === 0
          ? `Do you want to <strong style="color : green">Active</strong> workspace <b>${space}</b>?<br />🧐`
          : `Möchten Sie <strong style="color : green">Aktiv</strong> Arbeitsplatz <b>${space}</b>?<br />🧐`,
        cancelButtonText: context.getCurrent() === 0 ? "Cancel" : "Abbrechen",
        confirmButtonText: context.getCurrent() === 0 ? "Ok" : "OK",
        reverseButtons: false,
        showCancelButton: true,
      }).then((res) => {
        if (res.isConfirmed) {
          fetch(`${API_URL}/user/active`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              usi: uid,
            }),
          }).then((res) => {
            if (res.status === 200) {
              refresh();
              const msg = context.getCurrent() === 0 ? "Success" : "Erfolg";

              const msg2 =
                context.getCurrent() === 0
                  ? `You have activated <b>${space}</b> successfully.`
                  : `Sie haben aktiviert <b>${space}</b> erfolgreich.`
              Swal.fire(msg, msg2, "success");

            }
          });
        }
      });
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
                  <td>{i.details[0]?.first_name}</td>
                  <td> {i.details[0]?.last_name} </td>
                  <td> {i.details[0]?.email} </td>
                  <td>member</td>
                  <td
                    tabIndex="0"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Block/Unblock"
                  >
                    {i.status === "active" ? (
                      <Icon
                        icon="grommet-icons:unlock"
                        color="green"
                        className={style.pointer}
                        onClick={() =>
                          handleBlock(
                            i?._id,
                            `${i.details[0]?.first_name} ${i.details[0]?.last_name}`
                          )
                        }
                      />
                    ) : (
                      <Icon
                        icon="grommet-icons:lock"
                        color="red"
                        className={style.pointer}
                        onClick={() =>
                          handleActive(
                            i?._id,
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
                <td><FormattedMessage id="noUser" defaultMessage="No user found." /></td>
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
    </>
  );
};

export default TableList;
