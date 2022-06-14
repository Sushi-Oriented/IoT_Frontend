import React, { Component } from "react";

import {
  Col,
  Row,
  Table,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  CardBody,
  Card,
  CardHeader,
  CardImg,
  CardText,
  CardTitle,
} from "reactstrap";

class Satellite extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardHeader className="bg-dark h3">Satellite Monitoring</CardHeader>
          <CardBody>
            <Card>
              <CardBody>
                Heatmap
                <Card>
                  <CardImg
                    alt="Card image cap"
                    src="https://miro.medium.com/max/2484/1*WFLO-Fbj0IuQCJCKEqIAGQ.png"
                    top
                    // width="100%"
                    // height="20%"
                  />
                  <CardBody>
                    <CardTitle tag="h5">Card Title</CardTitle>
                    <CardText>
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </CardText>
                    <CardText>
                      <small className="text-muted">
                        Last updated 3 mins ago
                      </small>
                    </CardText>
                  </CardBody>
                </Card>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Satellite;
