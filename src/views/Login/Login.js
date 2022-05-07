// import logo from '../../assets/img/brand/logo-v.svg';
import logo from './logo2.png';
import volcanic from '../../assets/img/brand/VolcanicDashboard.png'
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  // InputGroupText,
  Row
} from 'reactstrap';

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

import { Auth } from '../../api'

import alertify from 'alertifyjs'

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const authUser = Auth.getAuthUser()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (typeof (authUser) !== 'undefined' && authUser !== null) {
      console.log(authUser)
      if (authUser.token) {
        history.push('/')
      }
    }
  }, [authUser, history, dispatch]);

  const login = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        if (username && password) {
          // let user = {}
          if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(username)) {
            await Auth.loginByEmail(username, password);
          } else {
            await Auth.loginByUsername(username, password);
          }
          history.push({ pathname: "/" })
        }
      } catch (error) {
        console.log(error)
        alertify.error('Fail to Login: ' + error)
      }
    }
  }

  return (
    <React.Fragment>
      <div className="animated fadein">
        <div className="login-bg">
          <div className="login-bg-eff">
            <div className="app flex-row align-items-center">
              <Container>
                <Row className="justify-content-center">
                  <Col md="6">
                    <div className="text-center mb-4">
                      <img src={volcanic} width="100%" alt="Logo" />
                    </div>
                    <Card className="p-4 radius-30">
                      <CardBody>

                        <Form onSubmit={(e) => { login(e) }}>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              {/* <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText> */}
                            </InputGroupAddon>
                            <Input type="text" placeholder="Username" name="username" autoComplete="username" onChange={(e) => { setUsername(e.target.value) }} required />
                          </InputGroup>
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              {/* <InputGroupText>
                                <i className="icon-lock"></i>
                              </InputGroupText> */}
                            </InputGroupAddon>
                            <Input type="password" placeholder="Password" name="password" autoComplete="current-password" onChange={(e) => { setPassword(e.target.value) }} required />
                          </InputGroup>
                          <Row>
                            {/* <Col xs="6" className="mx-auto">
                              <Button color="primary" className="px-4 w-100">Login</Button>
                            </Col> */}
                            <Button style={{ backgroundColor: '#DA341A', color: 'white' }} className="mx-2 px-1 btn-block">Login</Button>
                          </Row>
                        </Form>

                      </CardBody>
                    </Card>

                    {/* <Row className="justify-content-center">
                      <a href='#' style={{ color: '#0070BA' }}>Forgot your password?</a>
                    </Row> */}

                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Login
