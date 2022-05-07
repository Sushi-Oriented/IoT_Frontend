import React, { Component } from 'react';
import RealTimeLineChart from '../../__components/Chart/realTimeLineChart.js';
import BarChart from '../../__components/Chart/BarChart.js';
import LineChart from '../../__components/Chart/LineChart.js';


// import { Line } from 'react-chartjs-2';
import {
  // Button,
  // ButtonGroup,
  // ButtonToolbar,
  // Modal,
  // ModalHeader,
  // ModalBody,
  // Card,
  // CardBody,
  // CardTitle,
  // Col,
  // Row,
} from 'reactstrap';
// import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
// import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

// ADD
import { connect } from 'react-redux';
// import {  DashboardActions, DevicedataActions } from '../../__actions'
import Dates from '../../__ifunc/dates'
// import { CONSTANTS } from '../../api'
// import Resolve from "../../../src/assets/img/dashboard/resolved.png";
// import Mark from "../../../src/assets/img/dashboard/error.png";
// import MapContainer from "../../__components/maps/MapContainer";
require('typeface-russo-one');


class Dashboard extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  state = {
    date: new Date()
  }

  async componentDidMount() {

  }

  render() {
    // console.log('========Dashboard: render()================', this.props)

    return (
      <>
      {/* <div id="wrapper" className="p-0">
        <div id="google_map" className="p-0"> */}
          {/* <MapContainer /> */}
        {/* </div>
        <div id="over_map"> */}
          <DisplayTimer />

        {/* </div> */}
        <RealTimeLineChart/>
        <LineChart/>

        <BarChart/>
      {/* </div> */}

      </>
    );
  }
}

class DisplayTimer extends Component {
  state = {
    timer: Dates.format(new Date(), Dates.FORMAT.TIME1),
    dates: Dates.format(new Date(), Dates.FORMAT.DATE1),
  };

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      timer: Dates.format(new Date(), Dates.FORMAT.TIME2),
      dates: Dates.format(new Date(), Dates.FORMAT.DATE1),
    });
  }
  render() {
    return (
      <div>
        <h1 className='mr-0 pl-5' style={{ color: '#000' }}>{this.state.timer}</h1>
        <h3 className="pl-5" style={{ color: '#000' }}>{this.state.dates}</h3>

      </div>
    );
  }
}
export default connect(state => { return state })(Dashboard)
