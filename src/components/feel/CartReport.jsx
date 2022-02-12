import React, { useState, useEffect } from "react";
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
import { API_URL } from "../../config";
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

const labels = ["", "1 Week", "2 Week", "3 Week", "4 Week"];

export const data = {
  labels,
  datasets: [
    {
      label: "Happy",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: "rgb(235,129,115)",
      backgroundColor: "rgba(235,129,115, 0.5)",
    },
    {
      label: "Smiling",
      data: labels.map(() => faker.datatype.number({ min: 50, max: 100 })),
      borderColor: "rgb(238,180,21)",
      backgroundColor: "rgba(238,180,21, 0.5)",
    },
    {
      label: "Normal",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: "rgb(122,252,67)",
      backgroundColor: "rgba(122,252,67, 0.5)",
    },
    {
      label: "sad",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: "rgb(52,109,139)",
      backgroundColor: "rgba(52,109,139, 0.5)",
    },
    {
      label: "Crying",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: "rgb(25,55,105)",
      backgroundColor: "rgba(25,55,105, 0.5)",
    },
  ],
};
// console.log(labels.map(() => faker.datatype.number({ min: 50, max: 100 })),)
const CharReport = () => {
  const [basy, setBasy] = useState(false);
  const getFeeling = async (month) => {
    try {
      setBasy(true);
      await fetch(`${API_URL}/`, {
        method:"POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          month: month,
        }),
      }).then(async (res) => {
        const result = await res.json();
        console.log("result", result);
      });
    } catch {
      setBasy(false);
    }
  };
  useEffect(()=>{

  })
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
