import React from "react";
import style from "./style.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card, Row, Col, Form } from "react-bootstrap";
const { faker } = require("@faker-js/faker");

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Feel report",
    },
  },
};

const labels = [
  "Start",
  "1 Week",
  "2 Week",
  "3 Week",
  "4 Week",
  "End"
];

export const data = {
  labels,
  datasets: [
    {
      label: "test",
      data: labels.map(() => faker.datatype.number({ min: 50, max: 100 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
// console.log(labels.map(() => faker.datatype.number({ min: 50, max: 100 })),)
const CharReport = () => {
  return (
    <Row className={`p-0 m-0`}>
      <Card className={`${style.cardReport}`}>
        <Col className="col-2">
          <Form.Select aria-label="Default select example">
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="4">March</option>
            <option value="5">April</option>
            <option value="6">May</option>
            <option value="7">June</option>
            <option value="8">July</option>
            <option value="9">August</option>
            <option value="10">Sebtember</option>
            <option value="11">October</option>
            <option value="12">November</option>  
          </Form.Select>
        </Col>
        <Line options={options} data={data} />
      </Card>
    </Row>
  );
};
export default CharReport;
