import React, { Component } from 'react';
import ApexCharts from 'apexcharts'
import Chart from "react-apexcharts";
import moment from "moment";

// let data1 = [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
var lastDate = 0;
var data = []
var TICKINTERVAL = 86400000 //86400000
let XAXISRANGE = 777600000
let FIVEINTERVAL = 1000
let XAXISFIVERANGE  = 5000

class realTimeLineChart extends Component {


  constructor(props) {
    super(props);

    // this.getDayWiseTimeSeries = this.getDayWiseTimeSeries.bind(this);
    // this.getNewSeries = this.getNewSeries.bind(this);
    // this.resetData = this.resetData.bind(this);
    // this.getDayWiseTimeSeries = this.getDayWiseTimeSeries.bind(this);


    this.state = {
      series: [{
        data: data.slice()
      }],
      options: {
        chart: {
          id: 'realtime',
          height: 350,
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          },
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Dynamic Updating Chart',
          align: 'left'
        },
        markers: {
          size: 0
        },
        xaxis: {
          type: 'datetime',
          range: XAXISRANGE,
        },
       yaxis:{
            ticks: {
              beginAtZero: true,
              max: 1

          }
        },
        legend: {
          show: false
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
    console.log(baseval)
    var newDate = baseval + TICKINTERVAL;
    lastDate = newDate

    for(var i = 0; i< data.length - 10; i++) {
      // IMPORTANT
      // we reset the x and y of the data which is out of drawing area
      // to prevent memory leaks
      data[i].x = newDate - XAXISRANGE - TICKINTERVAL
      data[i].y = 0
    }

    data.push({
      x: newDate ,
      y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    })
  }

  resetData(){
    // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series
    data = data.slice(data.length - 10, data.length);
  }

  componentDidMount(){
    window.setInterval(() => {
      this.getNewSeries(lastDate, {
        min: 10,
        max: 90
      })

      ApexCharts.exec('realtime', 'updateSeries', [{
        data: data
      }])
    }, 1000)
  }


  render() {
    return (


<div id="chart">
<Chart options={this.state.options} series={this.state.series} type="line" height={350} />
</div>


    );
  }
}

export default realTimeLineChart;
