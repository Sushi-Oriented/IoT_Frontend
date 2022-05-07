import {
  Button, Card, CardBody, CardHeader, Col,
  Form,
  FormGroup,
  Input, InputGroup, InputGroupAddon, InputGroupText, Label,
  ListGroupItem, ListGroupItemHeading,
  Row,
} from 'reactstrap';

// add
import { profileActions } from '../../__actions'
import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
import { Auth } from '../../api'

import alertify from 'alertifyjs'

const Profile = () => {
  // const authUser = useSelector(state => state.authorization.user)
  const authUser = Auth.getAuthUser();
  const [oldpassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [Message, setMessage] = useState('');

  const onChangePasswordClick = async (e) => {
    e.preventDefault();
    if (oldpassword === '') {
      // this.setState({ showMessage: true, Message: 'Please fill in oldpassword.' })
      setShowMessage(true)
      setMessage('Please fill in oldpassword.')
      return false
    }
    if (newpassword === '') {
      // this.setState({ showMessage: true, Message: 'Please fill in newpassword.' })
      setShowMessage(true)
      setMessage('Please fill in newpassword.')
      return false
    }
    if (rePassword === '') {
      // this.setState({ showMessage: true, Message: 'Please fill in rePassword.' })
      setShowMessage(true)
      setMessage('Please fill in rePassword.')
      return false
    }
    if (rePassword !== newpassword) {
      // this.setState({ showMessage: true, Message: 'Password and rePassword not same.' })
      setShowMessage(true)
      setMessage('Password and rePassword not same.')
      return false
    }

    try {
      await profileActions.changePassword(oldpassword, newpassword)
      setShowMessage(false)
      setOldPassword('')
      setNewPassword('')
      setRePassword('')
      // setMessage('Success.')
      // setShowMessage(true)
      alertify.message('Success Change Password.');
    } catch (error) {
      // setMessage('Fail: ' + error)
      // setShowMessage(true)
      alertify.error('Fail: ' + error)
    }
  }

  return (
    <React.Fragment>
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader className="bg-dark">
                <Row>
                  <Col md="5" className="mt-md-auto text-left h3"><i className="icon-people font-xl icons mr-2 text-primary"></i>Profile</Col>
                </Row>
              </CardHeader>
              <CardBody>
                <ListGroupItem action>
                  <ListGroupItemHeading>User Detail</ListGroupItemHeading>
                  <FormGroup>
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" value={authUser ? authUser.name : ''} onChange={() => { }} />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="contact">Contact Number</Label>
                    <Input type="text" value={authUser ? authUser.contact : ''} onChange={() => { }} />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="created">Register Date</Label>
                    <Input type="text" value={authUser ? authUser.created : ''} onChange={() => { }} />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="role">Role</Label>
                    <Input type="text" value={authUser ? authUser.role.toUpperCase() : ''} onChange={() => { }} />
                  </FormGroup>
                </ListGroupItem>

                <ListGroupItem action>
                  <ListGroupItemHeading>Change Password</ListGroupItemHeading>
                  <Form onSubmit={(e) => { onChangePasswordClick(e) }}>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="icon-lock"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" name="oldpassword" placeholder="Old Password" value={oldpassword} onChange={(e) => { setOldPassword(e.target.value) }} required />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="icon-lock"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" name="newpassword" placeholder="New Password" value={newpassword} onChange={(e) => { setNewPassword(e.target.value) }} required />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="icon-lock"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" name="rePassword" placeholder="Repeat New password" value={rePassword} onChange={(e) => { setRePassword(e.target.value) }} required />
                  </InputGroup>

                  {showMessage && <div>{Message}<br /><br /></div>}

                  <Button color="success" className="sm" block >Change Password</Button>
                  </Form>
                </ListGroupItem>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    </React.Fragment>
  )
}
export default Profile;