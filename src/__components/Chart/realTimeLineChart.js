import React, { Component } from 'react';
import ApexCharts from 'apexcharts'
import Chart from "react-apexcharts";
import moment from "moment";

let data1 = [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]

class realTimeLineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [{
        data: data1.slice()
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
        // xaxis: {
        //   type: 'datetime',
        //   // range: XAXISRANGE,
        // },
        xaxis:
          {
            type: "realtime",
            distribution: "linear",
            realtime: {
              onRefresh: function(chart) {
                chart.data.datasets[0].data.push({
                  x: moment(),
                  y: Math.random()
                });
              },
              delay: 3000,
              time: {
                displayFormat: "h:mm"
              }
            },
            ticks: {
              displayFormats: 1,
              maxRotation: 0,
              minRotation: 0,
              stepSize: 1,
              maxTicksLimit: 30,
              minUnit: "second",
              source: "auto",
              autoSkip: true,
              callback: function(value) {
                return moment(value, "HH:mm:ss").format("mm:ss");
              }
            }
          },

        yaxis: {
          max: 100
        },
        legend: {
          show: false
        },
      },


    };
  }


  componentDidMount() {
    window.setInterval(() => {
      // getNewSeries(lastDate, {
      //   min: 10,
      //   max: 90
      // })

      // ApexCharts.exec('realtime', 'updateSeries', [{
      //   data: data
      // }])
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
