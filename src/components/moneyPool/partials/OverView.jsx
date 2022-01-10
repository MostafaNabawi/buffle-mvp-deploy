import React from "react";
import { Table } from "react-bootstrap";

function OverView() {
  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <td> This event cost the group</td>
            <th>$122.00</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>It cost you</td>
            <th>$61.00</th>
          </tr>
          <tr>
            <td>You've paid</td>
            <th>$121,334.00</th>
          </tr>
          <tr>
            <td>You've received</td>
            <th>$121,273.00</th>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default OverView;
