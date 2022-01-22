import { React, useEffect, useState } from "react";
import { Table, Card, Pagination } from "react-bootstrap";
import { Icon } from "@iconify/react";
import style from "./style.module.css";

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
                  <td>
                    {i.status === "active" ? (
                      <Icon icon="grommet-icons:unlock" />
                    ) : (
                      <Icon icon="grommet-icons:lock" />
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
