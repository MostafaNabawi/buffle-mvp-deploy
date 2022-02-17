/** @format */

import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import style from "./../style.module.css";
import Skeleton from "react-loading-skeleton";
import { FormattedMessage } from 'react-intl';
function OverView({ data }) {
  const [innerData, setInnerData] = useState(null);
  console.log(data);
  useEffect(() => {
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
          {innerData.owedReport.map((i, n) => (
            <div key={`over-${n}`}>{i?.msg}</div>
          ))}
        </>
      );
    }
    // {data && data.lent.map((item) => <div key={item.msg + ""} >{item.msg}</div>)}

    return <div><FormattedMessage id="event.notOwed" defaultMessage="Your not owed.😊" /></div>;
  };
  return (
    <>
      {data ? (
        <div>
          <Table striped>
            <thead>
              <tr>
                <td> <FormattedMessage id="event.groupCost" defaultMessage="This event cost the group" /></td>
                <th>{data.groupCost}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><FormattedMessage id="event.costYou" defaultMessage="It cost you" /></td>
                <th>{data.costYou}</th>
              </tr>
              <tr>
                <td><FormattedMessage id="event.youPaid" defaultMessage="You've paid" /></td>
                <th>{data.paied}</th>
              </tr>
              <tr>
                <td><FormattedMessage id="event.youAOwed" defaultMessage="You are owed" /></td>
                <th>{data.owed}</th>
              </tr>
              <tr>
                <td><FormattedMessage id="event.youhOwed" defaultMessage="You've owe" /></td>
                <th>{data.creditor}</th>
              </tr>
            </tbody>
          </Table>
          {FormatSettle()}
        </div>
      ) : (
        <Skeleton count={3} />
      )}
    </>
  );
}

export default OverView;
