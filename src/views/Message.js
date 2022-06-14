import React, { Component } from "react";

import { Col, Row, Table, Form, FormGroup, Label,Input,FormText, Button, CardBody,Card} from "reactstrap";

class Message extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardBody>
          <Form>

          <FormGroup tag="fieldset">
            <legend>Resident to notify</legend>
            <FormGroup check>
              <Input name="radio1" type="checkbox" />{" "}
              <Label check>
                All
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input name="radio1" type="checkbox" />{" "}
              <Label check>
                Resident - Pulau Jogja
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input name="radio1" type="checkbox" />{" "}
              <Label check>
                Resident - Bayan Bunting
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input name="radio1" type="checkbox" />{" "}
              <Label check>Resident - Kemantut</Label>
            </FormGroup>
          </FormGroup>

          <FormGroup>
            <Label for="exampleText">Text Area</Label>
            <Input id="exampleText" name="text" type="textarea" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">File</Label>
            <Input id="exampleFile" name="file" type="file" />
            {/* <FormText>
              This is some placeholder block-level help text for the above
              input. It's a bit lighter and easily wraps to a new line.
            </FormText> */}
          </FormGroup>

          {/* <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="with a placeholder"
              type="email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="password placeholder"
              type="password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">Select</Label>
            <Input id="exampleSelect" name="select" type="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelectMulti">Select Multiple</Label>
            <Input
              id="exampleSelectMulti"
              multiple
              name="selectMulti"
              type="select"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup> */}


          {/* <FormGroup check>
            <Input type="checkbox" /> <Label check>Check me out</Label>
          </FormGroup> */}
          <Button>Send Message</Button>
        </Form>
          </CardBody>
        </Card>

      </div>
    );
  }
}

export default Message;
