import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import style from "./../style.module.css";
function OverView({ data }) {
  const [innerData, setInnerData] = useState(null);
  useEffect(() => {
    // this is a comment for overview
    console.log("overview", data);
    setInnerData(data);
  }, [data]);
  const FormatSettle = () => {
    if (innerData?.report?.length > 0) {
      return (
        <>
          {innerData.report.map((i, n) => (
            <div key={`over-${n}`}>{i?.msg}</div>
          ))}
          {innerData.owedReport.map((i, n) => (
            <div key={`over-${n}`}>{i?.msg}</div>
          ))}
        </>
      );
    }
    if (innerData?.owedReport?.length > 0) {
      return (
        <>
          {innerData.owedReport.map((i, n) => (
            <div key={`over-${n}`}>{i?.msg}</div>
          ))}
        </>
      );
    }
    // {data && data.lent.map((item) => <div key={item.msg + ""} >{item.msg}</div>)}

    return <div>Your not owed.😊</div>;
  };
  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <td> This event cost the group</td>
            <th>{data.groupCost}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>It cost you</td>
            <th>{data.costYou}</th>
          </tr>
          <tr>
            <td>You've paid</td>
            <th>{data.paied}</th>
          </tr>
          <tr>
            <td>You are owed</td>
            <th>{data.owed}</th>
          </tr>
          <tr>
            <td>You've owe</td>
            <th>{data.creditor}</th>
          </tr>
        </tbody>
      </Table>
      <div className={style.settle}>
        <div className={style.header}>
          <h4>How to settle all debts</h4>
        </div>
        <div className={style.settle_content}>
          {data &&
            data.report.map((item) => <div key={item.msg}>{item.msg}</div>)}
        </div>
      </div>
    </div>
  );
}

export default OverView;
