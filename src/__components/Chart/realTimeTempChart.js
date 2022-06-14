import React, { Component } from "react";
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import moment from "moment";
import alertify from "alertifyjs";
import playAlert from "alert-sound-notify";
import Dates from "../../__ifunc/dates";

import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  child,
  get,
  query,
  limitToLast,
  orderByValue,
} from "firebase/database";
import { getAnalytics } from "firebase/analytics";

import { Col, Row, Table } from "reactstrap";

// let data1 = [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
var lastDate = 0;
var data = [];
var TICKINTERVAL = 4860000; //86400000
let XAXISRANGE = 9000;
let FIVEINTERVAL = 1000;
let XAXISFIVERANGE = 5000;
let noti = false;

const firebaseConfig = {
  // apiKey: "AIzaSyDw-9p2jADwvZ-Md77Eimq5yuNbs_uiGtI",
  // authDomain: "PROJECT_ID.firebaseapp.com",
  // // The value of `databaseURL` depends on the location of the database
  // databaseURL: "https://vems-gg-default-rtdb.firebaseio.com",
  // projectId: "vems-gg",
  // storageBucket: "vems-gg.appspot.com",
  // messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  measurementId: "G-MEASUREMENT_ID",

  apiKey: "AIzaSyDw-9p2jADwvZ-Md77Eimq5yuNbs_uiGtI",
  authDomain: `vems-gg.firebaseapp.com`,
  databaseURL: `https://vems-gg-default-rtdb.firebaseio.com`,
  projectId: "vems-gg",
};

const app = initializeApp(firebaseConfig);

class realTimeTempChart extends Component {
  constructor(props) {
    super(props);

    // this.getDayWiseTimeSeries = this.getDayWiseTimeSeries.bind(this);
    // this.getNewSeries = this.getNewSeries.bind(this);
    // this.resetData = this.resetData.bind(this);
    // this.getDayWiseTimeSeries = this.getDayWiseTimeSeries.bind(this);

    this.state = {
      // temp: this.props.temp,
      humidityList: [],
      dataHumi: [],
      noti: false,
      series: [
        {
          data: data.slice(),
        },
      ],
      options: {
        chart: {
          id: "realtime",
          height: 350,
          type: "line",
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000,
            },
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Real-Time Temperature (C°)",
          align: "left",
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: "datetime",
          range: XAXISRANGE,
        },
        yaxis: {
          ticks: {
            beginAtZero: true,
            max: 1,
          },
        },
        legend: {
          show: false,
        },
      },
    };
  }

  // getDayWiseTimeSeries(baseval, count, yrange) {
  //   var i = 0;
  //   while (i < count) {
  //     var x = baseval;
  //     var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

  //     data.push({
  //       x, y
  //     });
  //     lastDate = baseval
  //     baseval += TICKINTERVAL;
  //     i++;
  //   }
  // }

  // getDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {
  //   min: 10,
  //   max: 90
  // })

  getNewSeries(baseval, yrange) {
    // console.log(this.props.temp);
    let emergencyTempVal = this.props.temp;
    const db = getDatabase();
    // console.log(db)
    const ref1 = ref(db, "DHT11/Temperature");
    onValue(
      ref1,
      (snapshot) => {
        let data = [];

        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          data.push(childData);
          // data.push(new Date())
        });
        data.reverse();
        const size = 10;
        const items = data.slice(0, size);

        // console.log(items)
        // this.state.humidityList = items;
        this.setState({
          humidityList: items
        })

      },
      {
        onlyOnce: true,
      }
    );

    // const dbRef = ref(getDatabase());
    // get(child(dbRef, `DHT11/Humidity`), limitToLast(10))
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       console.log(snapshot.val());
    //     } else {
    //       console.log("No data available");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    // var newDate = baseval + TICKINTERVAL;
    // lastDate = newDate;

    // for (var i = 0; i < data.length - 10; i++) {
    //   // IMPORTANT
    //   // we reset the x and y of the data which is out of drawing area
    //   // to prevent memory leaks
    //   data[i].x = newDate - XAXISRANGE - TICKINTERVAL;
    //   data[i].y = 0;
    // }

    data.push({
      x: new Date().getTime() + 28800000,
      y: this.state.humidityList[0],
      // x: newDate,
      // y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min,
    });
    // console.log(data[data.length-1].x.getTime())
    this.setState({
      dataHumi: data
    })

    if (
      data[data.length - 1].y > this.props.temp &&
      data[data.length - 2].y <= this.props.temp
    ) {
      alertify.set("notifier", "position", "top-right");
      alertify.warning(
        "<UseAnimations animationKey='github' size={56} style={{ padding: 100 }} />" +
          "<strong>ALERT </strong>- Over Temperature<br>" +
          "<span>" +
          "Temperature is : " +
          data[data.length - 1].y +
          "<br>" +
          "Time Action : " +
          Dates.format(
            data[data.length - 1].x - 28800000,
            Dates.FORMAT.DATE_TIME4
          )
      );
      playAlert("glass");
    }
  }

  resetData() {
    // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series
    data = data.slice(data.length - 10, data.length);
  }

  async componentDidMount() {
    await window.setInterval(() => {
      console.log(Dates.format(Date.now(),Dates.FORMAT.DATE_TIME4))
      this.getNewSeries(lastDate, {
        min: 10,
        max: 90,
      });
      ApexCharts.exec("realtime", "updateSeries", [
        {
          data: data,
        },
      ]);
    }, 5000);
  }

  render() {
    return (
      <Row>
        <Col md={8}>
          <div>{this.props.temp}</div>
          <div id="chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              height={350}
            />
          </div>
        </Col>
        <Col md={4}>
          <Table
            hover
            className="table table-hover table-outline mb-0 d-none d-sm-table"
          >
            <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>Temperature (C°)</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
            {this.state.dataHumi.length === 0 ? (
              <tr>
                <td align="center" colspan="3">
                  No Data
                </td>
              </tr>
            ) : (
              this.state.dataHumi.slice(0, 5).map((dataList, index) => (
                <DataRow
                  // key={index}
                  numbers={index}
                  dataList={dataList}
                  tempAlertValue={this.props.temp}
                  // dispatch={this.props.dispatch}
                  // authorization={this.props.authorization}
                />
              ))
            )}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

class DataRow extends Component {
  render() {
    let dataList = this.props.dataList
    let numbers = this.props.numbers
    let tempAlertValue = this.props.tempAlertValue
    let number = numbers +1
    // console.log(tempAlertValue)
    return (
      <tr>
        <td>
          {number}
        </td>
        {(dataList.y)>tempAlertValue?(
          <td style={{color: 'red'}}><strong>{dataList.y}</strong></td>
        ):(
          <td >{dataList.y}</td>
        )}
        <td>{Dates.format(
            dataList.x - 28800000,
            Dates.FORMAT.DATE_TIME4
          )}</td>
      </tr>
    );
  }
}

export default realTimeTempChart;
