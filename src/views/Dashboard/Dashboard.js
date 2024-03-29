import React, { Component } from 'react';
import RealTimeTempChart from '../../__components/Chart/realTimeTempChart.js';
import RealTimeHumidityChart from '../../__components/Chart/realTimeHumidityChart.js';
import BarChart from '../../__components/Chart/BarChart.js';
import LineChart from '../../__components/Chart/LineChart.js';

import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";


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
  Col,
  Row,
  Input,
  ListGroupItem,
  FormGroup,
  Label,
  Card,
  CardBody
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
    date: new Date(),

  }

  constructor(props) {
    super(props);

    // this.onAddDeviceClick = this.onAddDeviceClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.state = {
      temp: 40,
      humi: 50,
    };
  }
  async componentDidMount() {

  }

  onInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(name,value)
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
        <Card>
          <CardBody>
          <DisplayTimer />
          <FormGroup row>
                      <Label for="temp" style={{ color: "black" }} sm={3}>
                        Temperature Alert (exceed)
                      </Label>
                      <Col sm={9}>
                        <Input
                          type="number"
                          name="temp"
                          // placeholder={this.state.temp}
                          value={this.state.temp}
                          onChange={this.onInputChange}
                          required
                        />
                         <div style={{textAlign: 'left', marginLeft: '', color: 'red', fontSize: '10px'}}>{this.state.showMessageOwnerName && this.state.MessageOwnerName}</div>
                      </Col>

                    </FormGroup>
                    <FormGroup row>
                      <Label for="humi" style={{ color: "black" }} sm={3}>
                        Humidity Alert (less then)
                      </Label>
                      <Col sm={9}>
                        <Input
                          type="number"
                          name="humi"
                          // placeholder={this.state.humi}
                          value={this.state.humi}
                          onChange={this.onInputChange}
                          required
                        />
                         <div style={{textAlign: 'left', marginLeft: '', color: 'red', fontSize: '10px'}}>{this.state.showMessageOwnerName && this.state.MessageOwnerName}</div>
                      </Col>

                    </FormGroup>

        {/* </div> */}
        <RealTimeTempChart temp={this.state.temp}/>
        <RealTimeHumidityChart humi={this.state.humi}/>
        {/* <LineChart/>
        <BarChart/> */}
      {/* </div> */}
          </CardBody>
        </Card>


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
        <Row>
          <Col sm={4}>
          <h1 className='mr-0 pl-5' style={{ color: '#000' }}>{this.state.timer}</h1>
        <h3 className="pl-5" style={{ color: '#000' }}>{this.state.dates}</h3>
          </Col>
          <Col sm={8}>
          {/* <ListGroupItem> */}

                    {/* </ListGroupItem> */}
          </Col>

        </Row>


      </div>
    );
  }
}
export default connect(state => { return state })(Dashboard)

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB2JV_Kx8SG20plQJkdv5RpVMivOI_JveU",
//   authDomain: "yeoptest-61707.firebaseapp.com",
//   projectId: "yeoptest-61707",
//   storageBucket: "yeoptest-61707.appspot.com",
//   messagingSenderId: "212364266087",
//   appId: "1:212364266087:web:e61c47291eeb3031a622c2",
//   measurementId: "G-VFNV9S454L"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
