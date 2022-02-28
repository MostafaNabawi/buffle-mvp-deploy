import React, { useState, useEffect, useContext } from "react";
import style from "./style.module.css";
import { Icon } from "@iconify/react";
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
import { FormattedMessage } from "react-intl";
import { Context } from "../../layout/Wrapper";

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
      display: false,
      text: "Feel report",
    },
  },
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "%",
      },
      suggestedMin: 0,
      suggestedMax: 100,
    },
  },
};

const CharReport = () => {
  const context = useContext(Context);
  const currentType = context.getCurrent();
  const [basy, setBasy] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("");
  //
  const [smiling, setSmiling] = useState([]);
  const [happy, setHappy] = useState([]);
  const [normal, setNormal] = useState([]);
  const [sad, setSad] = useState([]);
  const [cry, setCry] = useState([]);
  // lable
  const [labels, setLabels] = useState([
    "",
    "First week",
    "Second week",
    "Third week",
    "Forth week",
  ]);
  const [happyLable, setHappyLable] = useState("Happy");
  const [smilingLable, setSmilingLable] = useState("Smiling");
  const [normalLable, setNormalLable] = useState("Normal");
  const [sadLable, setSadLable] = useState("Sad");
  const [cryLable, setCryLable] = useState("Cry");

  // data
  const data = {
    labels,
    datasets: [
      {
        label: happyLable,
        data: happy,
        borderColor: "rgb(235,129,115)",
        backgroundColor: "rgba(235,129,115, 0.5)",
        fill: false,
        cubicInterpolationMode: "monotone",
        tension: 0.6,
      },
      {
        label: smilingLable,
        data: smiling,
        borderColor: "rgb(238,180,21)",
        backgroundColor: "rgba(238,180,21, 0.5)",
        fill: false,
        cubicInterpolationMode: "monotone",
        tension: 0.9,
      },
      {
        label: normalLable,
        data: normal,
        borderColor: "rgb(122,252,67)",
        backgroundColor: "rgba(122,252,67, 0.5)",
        fill: false,
        cubicInterpolationMode: "monotone",
        tension: 0.8,
      },
      {
        label: sadLable,
        data: sad,
        borderColor: "rgb(52,109,139)",
        backgroundColor: "rgba(52,109,139, 0.5)",
        fill: false,
        cubicInterpolationMode: "monotone",
        tension: 0.7,
      },
      {
        label: cryLable,
        data: cry,
        borderColor: "rgb(25,55,105)",
        backgroundColor: "rgba(25,55,105, 0.5)",
        fill: false,
        cubicInterpolationMode: "monotone",
        tension: 0.4,
      },
    ],
  };
  //
  const calculatePercent = (data, countAll) => {
    var s = (data.smiling * 100) / countAll[0];
    var h = (data.happy * 100) / countAll[1];
    var n = (data.normal * 100) / countAll[2];
    var sa = (data.sad * 100) / countAll[3];
    var c = (data.crying * 100) / countAll[4];
    smiling.push(s);
    happy.push(h);
    normal.push(n);
    sad.push(sa);
    cry.push(c);
  };
  const countEachFeel = (data) => {
    var s = 0;
    var h = 0;
    var n = 0;
    var sa = 0;
    var c = 0;
    Object.values(data).map((week) => {
      s = s + week.count.smiling;
      h = h + week.count.happy;
      n = n + week.count.normal;
      sa = sa + week.count.sad;
      c = c + week.count.crying;
    });

    const countAll = [s, h, n, sa, c];
    calculatePercent(data.first.count, countAll);
    calculatePercent(data.second.count, countAll);
    calculatePercent(data.third.count, countAll);
    calculatePercent(data.forth.count, countAll);
    setBasy(false);
  };

  const getFeeling = async (month) => {
    try {
      setBasy(true);
      await fetch(`${API_URL}/user/feel-report?month=${month}`, {
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then(async (res) => {
        const { payload } = await res.json();
        smiling.push(0);
        happy.push(0);
        normal.push(0);
        sad.push(0);
        cry.push(0);
        countEachFeel(payload);
      });
    } catch {
      setBasy(false);
    }
  };
  useEffect(() => {
    const d = new Date();
    setCurrentMonth(d.getMonth() + 1);
    getFeeling(d.getMonth() + 1);
  }, []);

  useEffect(() => {
    if (currentType === 1) {
      setLabels([
        "",
        "Erste Woche",
        "Zweite Woche",
        "Dritte Woche",
        "Vierte Woche",
      ]);
      setHappyLable("Glücklich");
      setSmilingLable("gut");
      setNormalLable("Normal");
      setSadLable("nicht gut");
      setCryLable("traurig");
    } else {
      setLabels(["", "First week", "Second week", "Third week", "Forth week"]);
      setHappyLable("Happy");
      setSmilingLable("Smiling");
      setNormalLable("Normal");
      setSadLable("Sad");
      setCryLable("Cry");
    }
  }, [context]);

  return (
    <Row className={`p-0 m-0`}>
      <Card className={`${style.cardReport}`}>
        <Row className="mb-3">
          <Col className="col-2">
            <Form.Select
              onChange={(e) => {
                if (e.target.value != "0") {
                  smiling.length = 0;
                  happy.length = 0;
                  normal.length = 0;
                  sad.length = 0;
                  cry.length = 0;
                  getFeeling(e.target.value);
                }
              }}
              aria-label="Default select example"
            >
              <FormattedMessage defaultMessage="January" id="month.January">
                {(msg) => (
                  <option
                    value="1"
                    selected={currentMonth === 1 ? true : false}
                  >
                    {msg}
                  </option>
                )}
              </FormattedMessage>
              <FormattedMessage defaultMessage="February" id="month.February">
                {(msg) => (
                  <option
                    value="2"
                    selected={currentMonth === 2 ? true : false}
                  >
                    {msg}
                  </option>
                )}
              </FormattedMessage>
              <FormattedMessage defaultMessage="March" id="month.March">
                {(msg) => (
                  <option
                    value="3"
                    selected={currentMonth === 3 ? true : false}
                  >
                    {msg}
                  </option>
                )}
              </FormattedMessage>
              <FormattedMessage defaultMessage="April" id="month.April">
                {(msg) => (
                  <option
                    value="4"
                    selected={currentMonth === 4 ? true : false}
                  >
                    {msg}
                  </option>
                )}
              </FormattedMessage>
              <FormattedMessage defaultMessage="May" id="month.May">
                {(msg) => (
                  <option
                    value="5"
                    selected={currentMonth === 5 ? true : false}
                  >
                    {msg}
                  </option>
                )}
              </FormattedMessage>
              <FormattedMessage defaultMessage="June" id="month.June">
                {(msg) => (
                  <option
                    value="6"
                    selected={currentMonth === 6 ? true : false}
                  >
                    {msg}
                  </option>
                )}
              </FormattedMessage>
              <FormattedMessage defaultMessage="July" id="month.July">
                {(mag) => (
                  <option
                    value="7"
                    selected={currentMonth === 7 ? true : false}
                  >
                    {mag}
                  </option>
                )}
              </FormattedMessage>
              <FormattedMessage defaultMessage="August" id="month.August">
                {(msg) => (
                  <option
                    value="8"
                    selected={currentMonth === 8 ? true : false}
                  >
                    {msg}
                  </option>
                )}
              </FormattedMessage>
              <FormattedMessage defaultMessage="Sebtember" id="month.Sebtember">
                {(msg) => (
                  <option
                    value="0"
                    selected={currentMonth === 0 ? true : false}
                  >
                    {msg}
                  </option>
                )}
              </FormattedMessage>
              <FormattedMessage defaultMessage="October" id="month.October">
                {(msg) => (
                  <option
                    value="10"
                    selected={currentMonth === 10 ? true : false}
                  >
                    {msg}
                  </option>
                )}
              </FormattedMessage>
              <FormattedMessage defaultMessage="November" id="month.November">
                {(msg) => (
                  <option
                    value="11"
                    selected={currentMonth === 11 ? true : false}
                  >
                    {msg}
                  </option>
                )}
              </FormattedMessage>
              <FormattedMessage defaultMessage="December" id="month.December">
                {(msg) => (
                  <option
                    value="12"
                    selected={currentMonth === 12 ? true : false}
                  >
                    {msg}
                  </option>
                )}
              </FormattedMessage>
            </Form.Select>
          </Col>
          <Col>
            <h2 className={`${style.chartTitle}`}>
              <FormattedMessage
                defaultMessage="Monthly Report"
                id="chart.title"
              />
            </h2>
          </Col>
        </Row>
        {basy ? (
          <div className="text-center pt-5 mt-5 pb-5 mb-5">
            <Icon fontSize={44} icon="eos-icons:bubble-loading" />
          </div>
        ) : (
          <>
            <Line height={100} options={options} data={data} />
          </>
        )}
      </Card>
    </Row>
  );
};
export default CharReport;
