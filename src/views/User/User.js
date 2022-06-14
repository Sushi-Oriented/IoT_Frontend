import React, { Component, Fragment } from "react";

// import { Link } from 'react-router-dom';
import {
  Button,
  ButtonDropdown,
  // Badge,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  // Label,
  Modal,
  ModalBody,
  ModalHeader,
  // Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  Pagination,
  // PaginationItem,
  // PaginationLink,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Label,
} from "reactstrap";

// add
import { connect } from "react-redux";
import { UsersActions } from "../../__actions";
import { Auth, CONSTANTS } from "../../api";
import Dates from "../../__ifunc/dates";
import profilePic from "../../assets/img/profile_default.png";
// import { Icon } from "@iconify/react";

import alertify from "alertifyjs";
import { Link } from "react-router-dom";

import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import cellEditFactory from "react-bootstrap-table2-editor";
// import { Type } from 'react-bootstrap-table2-editor';
import paginationFactory from "react-bootstrap-table2-paginator";
import thunk from "redux-thunk";

let PUSER = Auth.getAuthUser();


class UserRow extends React.Component {
  constructor(props) {
    super(props);
    this.toggleModelAction = this.toggleModelAction.bind(this);
    this.toggleModelDelete = this.toggleModelDelete.bind(this);
    this.toggleModelUpdate = this.toggleModelUpdate.bind(this);

    this.EditUserClick = this.EditUserClick.bind(this);
    this.onDeleteUserClick = this.onDeleteUserClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.loadPicture = this.loadPicture.bind(this);

    this.state = {
      action: false,
      modalDelete: false,
      password: "",

      modalUpdate: false,
      userID: "",
      name: "",
      email: "",
      company: "",
      username: "",
      contact: "",
      dropdown: false,
      showMessageName: false,
      MessageName: "",
      showMessageUsername: false,
      MessageUsername: "",
      showMessageContact: false,
      MessageContact: "",
      searchValue: "",
      showMessageExistUser: false,
      MessageExistUser: "",
      showMessageExistEmail: false,
      MessageExistEmail: "",
      showMessageEmail: false,
      MessageEmail: "",

      //PICTURE
      pictureUser: "", //1. get pic local address
      pictureData: {}, //2.  get data
      pictureValue: {}, //3.  masuk user action
      picturetest: "",
      myRef: React.createRef(),
    };
  }

  onDeleteUserClick() {
    console.log(this.state.userID);
    UsersActions.deleteUser(this.state.userID).then(
      (result) => {
        this.setState({
          modalDelete: !this.state.modalDelete,
          // flashDeleteMessage: true,
        });
        // setTimeout(() => {
        //check the mounted state in case the component is disposed before the timeout.

        //here I send the component the prop 'close' after two seconds
        // this.setState({ flashDeleteMessage: false });
        window.location.reload(false);
        // }, 4000);

        // DevicedataActions.getLatestData(this.props.dispatch)
      },
      (error) => {
        this.setState({
          showMessage: true,
          Message: error,
        });
      }
    );
  }

  EditUserClick() {
    // console.log("Inside EditUserClick", this.state.userID);

    if (this.state.name !== "") {
      this.setState({
        showMessageName: false,
        MessageName: "",
      });
    } else {
      this.setState({
        showMessageName: true,
        MessageName: "* Required data, please fill in the user's fullname.",
      });
    }
    if (this.state.username !== "") {
      this.setState({
        showMessageUsername: false,
        MessageUsername: "",
      });
    } else {
      this.setState({
        showMessageUsername: true,
        MessageUsername: "* Required data, please fill in the user's username.",
      });
    }
    if (this.state.email !== "") {
      this.setState({
        showMessageEmail: false,
        MessageEmail: "",
      });
    } else {
      this.setState({
        showMessageEmail: true,
        MessageEmail: "* Required data, please fill in the user's email.",
      });
    }

    let _param = {
      // userID: this.state.userID,
      pictureValue: this.state.pictureValue,
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      contact: this.state.contact,
    };

    UsersActions.updateUser(
      this.state.userID,
      _param,
      this.state.pictureValue
    ).then(
      (result) => {
        console.log(result);
        this.setState({
          modalUpdate: false,
          // userID: "",
          // name: "",
          // picture: "",
          // username: "",
          // email: "",
          // company: "",
          // contact: "",
        });
        UsersActions.getListUser(this.props.dispatch);
        window.location.reload(false);
      },
      (error) => {
        // console.log(error);
        if (error === "User Already register.") {
          this.setState({
            showMessageExistUser: true,
            MessageExistUser: "* The username is already registered.",
          });
        } else {
          this.setState({
            showMessageExistUser: false,
            MessageExistUser: "",
          });
        }
        if (error === "Email Already register.") {
          this.setState({
            showMessageExistEmail: true,
            MessageExistEmail: "* The email is already registered.",
          });
        } else {
          this.setState({
            showMessageExistEmail: false,
            MessageExistEmail: "",
          });
        }
      }
    );
  }

  componentDidMount() {
    UsersActions.getListUser(this.props.dispatch);
  }

  onInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(value);
  }

  toggleModelAction() {
    this.setState({
      action: !this.state.action,
    });
  }

  toggleModelDelete() {
    this.setState({
      modalDelete: !this.state.modalDelete,
    });
  }

  toggleModelUpdate = (deviceId, data) => {
    // console.log(deviceId, data.userName);
    this.setState({
      modalUpdate: !this.state.modalUpdate,
      // userID: deviceId,
      // name: data.userName,
      // role: data.role
    });
  };

  toggleDeleteDevice = (data) => {
    console.log(data.id);
    this.setState({
      modalDelete: !this.state.modalDelete,
      userID: data.id,
      // flashDeleteMessage: false,
    });

    console.log(this.state.userID);
    console.log(this.state.modalDelete);
  };

  toggleUpdateDevice = (deviceId, data) => {
    console.log(deviceId, data);
    this.setState({
      modalUpdate: !this.state.modalUpdate,
      userID: deviceId,
      name: data.name,
      username: data.username,
      contact: data.contact,
      email: data.email,
      // role: data.role,
      // picture: data.picture,
      // picturetest: data.picturetest
    });
  };

  selectPicture = (e) => {
    this.state.myRef.current.click();
  };

  loadPicture = (e) => {
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        this.setState({ pictureUser: reader.result });
      },
      false
    );

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      this.setState({ pictureData: e.target.files[0] });
      this.uploadPicture(e.target.files[0]);
    }
  };

  uploadPicture = async (pictureUser) => {
    try {
      // Upload Picture
      const data = new FormData();
      data.append("file", pictureUser);
      this.setState({
        pictureValue: data,
      });

      alertify.success("success upload picture").dismissOthers();
    } catch (error) {
      return alertify.error(error).dismissOthers();
    }
  };

  render() {
    let userData = this.props.userData;
    let numbers = this.props.numbers;

    let rolelist = ["manager", "admin"];

    let number = numbers + 1;
    return (
      <tr>
        <td className="text-center">
          <div>{number}</div>
        </td>
        <td className="text-center">
          <div>
            <img
              className="img-avatar"
              style={{ height: "50px" }}
              // width={150}
              // height={150}
              // onClick={this.selectPicture}
              alt="profile Pic"
              // src={profilePic}
              src={
                userData.picture === "" ||
                userData.picture === undefined ||
                userData.picture === null
                  ? profilePic
                  : UsersActions.getPicture(userData.picture)
              }
            />
          </div>
        </td>
        <td className="text-left">
          <div>{userData.name}</div>
        </td>
        <td className="text-center">
          <div>{userData.username}</div>
        </td>
        <td className="text-center">
          <div>
            {" "}
            {Dates.format(userData.createdDate, Dates.FORMAT.DATE_TIME5)}
          </div>
        </td>
        <td className="text-center">
          <div>{userData.role}</div>
        </td>
        <td className="text-center">
          <ButtonDropdown
            direction="right"
            isOpen={this.state.action}
            toggle={this.toggleModelAction}
          >
            <DropdownToggle className="font-xl icon-options-vertical p-0 border-0 text-primary bg-transparent" />
            <DropdownMenu style={{ minWidth: "0rem" }}>
              <DropdownItem
                onClick={() =>
                  this.toggleUpdateDevice(userData.id, {
                    name: userData.name,
                    username: userData.username,
                    contact: userData.contact,
                    role: userData.role,
                    email: userData.email,
                    // picture: userData.picture,
                    // picturetest : this.state.picture
                  })
                }
              >
                <i className="text-primary icon-pencil"></i>
                Edit
              </DropdownItem>
              <DropdownItem onClick={() => this.toggleDeleteDevice(userData)}>
                <i className="text-danger icon-trash"></i>
                Delete
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>

          <Modal
            isOpen={this.state.modalDelete}
            toggle={this.toggleModelDelete}
            className={"modal-danger "}
          >
            <ModalHeader toggle={this.toggleModelDelete}>
              Delete Account
            </ModalHeader>
            <ModalBody>
              <img
                className="img-avatar"
                style={{ height: "50px" }}
                // width={150}
                // height={150}
                // onClick={this.selectPicture}
                alt="profile Pic"
                // src={profilePic}
                src={
                  userData.picture === "" ||
                  userData.picture === undefined ||
                  userData.picture === null
                    ? profilePic
                    : UsersActions.getPicture(userData.picture)
                }
              />
              <div>
                <strong>
                  Are you sure you want to delete{" "}
                  <strong>{userData.name}</strong>
                  's account with username <strong>{userData.username}</strong>?
                </strong>
              </div>
              <br />
              <Button
                className="mx-2"
                style={{ background: "red", color: "white", width: "150px" }}
                onClick={this.onDeleteUserClick}
              >
                Delete
              </Button>{" "}
              <Button
                className="mx-2"
                style={{ width: "150px" }}
                onClick={this.toggleModelDelete}
              >
                Cancel
              </Button>
            </ModalBody>
          </Modal>

          <Modal
            isOpen={this.state.modalUpdate}
            toggle={this.toggleModelUpdate}
            className={"mt-5 pt-5 modal-primary"}
          >
            <ModalHeader
              className="justify-content-center"
              toggle={this.toggleModelUpdate}
            >
              <span className="h2 text-center">Edit User</span>
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup className="justify-content-center text-center">
                  <img
                    className="img-avatar"
                    style={{ height: "150px" }}
                    // width={150}
                    // height={150}
                    onClick={this.selectPicture}
                    alt="profile Pic"
                    // src={profilePic}
                    src={
                      this.state.pictureUser === "" ||
                      this.state.pictureUser === undefined
                        ? userData.picture
                          ? UsersActions.getPicture(userData.picture)
                          : profilePic
                        : this.state.pictureUser
                    }
                  />
                  <br />
                  <Input
                    hidden
                    type="file"
                    id="uPic"
                    name="uPic"
                    accept="image/*"
                    onChange={(e) => this.loadPicture(e)}
                    innerRef={this.state.myRef}
                  />
                  <Label>Change Profile Picture</Label>
                </FormGroup>
                <div className="mb-3">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="Text"
                      name="name"
                      id="name"
                      placeholder={this.state.name}
                      value={this.state.name}
                      onChange={this.onInputChange}
                      // autoComplete="useruser"
                    />
                  </InputGroup>
                  <div
                    style={{
                      textAlign: "left",
                      marginLeft: "40px",
                      color: "red",
                      fontSize: "10px",
                    }}
                  >
                    {this.state.showMessageName && this.state.MessageName}
                  </div>
                </div>

                <div className="mb-3">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-at"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder={this.state.username}
                      name="username"
                      value={this.state.username}
                      onChange={this.onInputChange}
                      autoComplete="useruser"
                    />
                  </InputGroup>
                  <div
                    style={{
                      textAlign: "left",
                      marginLeft: "40px",
                      color: "red",
                      fontSize: "10px",
                    }}
                  >
                    {this.state.showMessageUsername &&
                      this.state.MessageUsername}
                  </div>
                  <div
                    style={{
                      textAlign: "left",
                      marginLeft: "40px",
                      color: "red",
                      fontSize: "10px",
                    }}
                  >
                    {this.state.showMessageExistUser &&
                      this.state.MessageExistUser}
                  </div>
                </div>

                <div className="mb-3">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-envelope"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder={this.state.email}
                      name="email"
                      value={this.state.email}
                      onChange={this.onInputChange}
                      autoComplete="useruser"
                    />
                  </InputGroup>
                  <div
                    style={{
                      textAlign: "left",
                      marginLeft: "40px",
                      color: "red",
                      fontSize: "10px",
                    }}
                  >
                    {this.state.showMessageEmail && this.state.MessageEmail}
                  </div>
                  <div
                    style={{
                      textAlign: "left",
                      marginLeft: "40px",
                      color: "red",
                      fontSize: "10px",
                    }}
                  >
                    {this.state.showMessageExistEmail && this.state.MessageExistEmail}
                  </div>
                </div>

                <div className="mb-3">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-phone"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder={this.state.contact}
                      name="contact"
                      value={this.state.contact}
                      onChange={this.onInputChange}
                      autoComplete="useruser"
                    />
                  </InputGroup>
                </div>

                <Button color="primary" onClick={this.EditUserClick} block>
                  Submit
                </Button>
              </Form>
            </ModalBody>
          </Modal>
        </td>
      </tr>
    );
  }
}

class Users extends Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onAddUserClick = this.onAddUserClick.bind(this);

    this.state = {
      addUser: false,
      showMessageName: false,
      showMessageUsername: false,
      showMessageExistUser: false,
      showMessageExistEmail: false,
      showMessagePassword: false,
      showMessageEmail: false,
      MessageName: "",
      MessageUsername: "",
      MessageExistUser: "",
      MessageExistEmail: "",
      MessagePassword: "",
      MessageEmail: "",

      name: "",
      username: "",
      password: "",
      email: "",
      contact: "",
      role: "manager",

      picture: "",
      pictureData: {},
      pictureValue: {},
      myRef: React.createRef(),
    };

    // console.log(props)
  }
  selectPicture = (e) => {
    this.state.myRef.current.click();
  };

  loadPicture = (e) => {
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        this.setState({ picture: reader.result });
      },
      false
    );

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      this.setState({ pictureData: e.target.files[0] });
      this.uploadPicture(e.target.files[0]);
    }
  };

  uploadPicture = async (picture) => {
    try {
      // Upload Picture
      const data = new FormData();
      data.append("file", picture);
      this.setState({
        pictureValue: data,
      });

      alertify.success("success upload picture").dismissOthers();
    } catch (error) {
      return alertify.error(error).dismissOthers();
    }
  };

  componentDidMount() {
    // PUSER = Auth.getAuthUser()
    // userActions.getListUser(PUSER.role, this.props.dispatch)
    UsersActions.getListUser(this.props.dispatch);
  }


  toggleAddUser = () => {
    this.setState({
      addUser: !this.state.addUser,
    });
  };

  onAddUserClick(e) {
    // console.log(this.state.name);
    if (this.state.name !== "") {
      this.setState({
        showMessageName: false,
        MessageName: "",
      });
    } else {
      this.setState({
        showMessageName: true,
        MessageName: "* Required data, please fill in the user's fullname.",
      });
    }
    if (this.state.username !== "") {
      this.setState({
        showMessageUsername: false,
        MessageUsername: "",
      });
    } else {
      this.setState({
        showMessageUsername: true,
        MessageUsername: "*Required data, please fill in the user's username.",
      });
    }
    if (this.state.password !== "") {
      this.setState({
        showMessagePassword: false,
        MessagePassword: "",
      });
    } else {
      this.setState({
        showMessagePassword: true,
        MessagePassword: "* Required data, please fill in the password.",
      });
    }
    if (this.state.email !== "") {
      this.setState({
        showMessageEmail: false,
        MessageEmail: "",
      });
    } else {
      this.setState({
        showMessageEmail: true,
        MessageEmail: "* Required data, please fill in the user's email.",
      });
    }

    e.preventDefault();
    UsersActions.registerUser({
      // pictureValue: this.state.pictureValue,
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      contact: this.state.contact,
      userRole: this.state.role,

      createdBy: PUSER.uid,
    }).then(
      (result) => {
        this.setState({ addUser: false });
        alertify.success("Success Register User");
        UsersActions.getListUser(this.props.dispatch);
      },
      (error) => {
        // console.log("=======error==========" + error);

        // this.setState({

        //   showMessage: true,
        //   Message: error,
        // });
        if (error === "User Already register.") {
          this.setState({
            showMessageExistUser: true,
            MessageExistUser: "* The username is already registered.",
          });
        } else {
          this.setState({
            showMessageExistUser: false,
            MessageExistUser: "",
          });
        }
        if (error === "Email Already register.") {
          this.setState({
            showMessageExistEmail: true,
            MessageExistEmail: "* The email is already registered.",
          });
        } else {
          this.setState({
            showMessageExistEmail: false,
            MessageExistEmail: "",
          });
        }
      }
    );
  }

  onInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    // console.log(value)
  }

  onPageButtonToggle = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  };

  onPaginationCountChange = (count) => {
    const { dispatch } = this.props;
    dispatch({ type: CONSTANTS.USER.USERS_COUNT_CHANGE, result: count });
  };

  onPaginationNav = (type) => {
    const { dispatch } = this.props
    const { pagination } = this.props.users


  // nextPage = () => {
  //     this.setState({
  //         currentpage: this.state.currentpage + 1,
  //     });
  // }
  // previousPage = () => {
  //     if (this.state.currentpage > 1) {
  //         this.setState({
  //             currentpage: this.state.currentpage - 1,
  //         });
  //     }
  // }

    if (type === 'first') {
      dispatch({ type: "USERS_PAGE_CHANGE", result: 1 })
    } else if (type === 'prev') {
      dispatch({ type: "USERS_PAGE_CHANGE", result: pagination.currentPage - 5 })
    } else if (type === 'next') {
      dispatch({ type: "USERS_PAGE_CHANGE", result: pagination.currentPage + 5 })
    } else if (type === 'last') {
      dispatch({ type: "USERS_PAGE_CHANGE", result: pagination.totalPage })
    } else {
      dispatch({ type: "USERS_PAGE_CHANGE", result: type })
    }

    console.log(pagination.currentPage)
  }

  render() {
    const { dataList,pagination } = this.props.users;
    console.log(dataList)
    return (
      <>
      <Card className="shadow animated fadeIn p-3 mb-5 bg-white rounded">

              <CardBody >
              <Row>
                <Col
                  // className="mt-md-auto text-left h3"
                  // xs="12"
                  // md="11"
                  // lg="11"
                  sm="6"
                >
                  {/* <i className="icon-people font-xl icons mr-2 text-primary"></i> */}
                  <h1>Manage Admin User</h1>
                </Col>

                <Col sm="6" style={{textAlign: "right"}}>
                    <Button
                      onClick={this.toggleAddUser}
                      style={{
                        width: "150px",
                        color: "white",
                        background: "#47B064",
                      }}
                    >
                      <i className="icon-plus"></i> Add User
                    </Button>


                </Col>
                </Row>
                <Modal
                    isOpen={this.state.addUser}
                    toggle={this.toggleAddUser}
                    className={"modal-dark " + this.props.className}
                  >
                    <ModalHeader className="bg-dark border-bottom-0" toggle={this.toggleAddUser}>
                      <span className="h2">Add New User</span>
                    </ModalHeader>
                    <ModalBody>
                      <Form>
                        <FormGroup className="justify-content-center text-center">
                          <img
                            className="img-avatar"
                            style={{ width: "120px", height: "120px" }}
                            width={120}
                            height={120}
                            onClick={this.selectPicture}
                            alt="Device Pic"
                            src={
                              this.state.pictureData.name === undefined
                                ? profilePic
                                : this.state.picture
                            }
                          />
                          <br />
                          <Input
                            hidden
                            type="file"
                            id="uPic"
                            name="uPic"
                            accept="image/*"
                            onChange={(e) => this.loadPicture(e)}
                            innerRef={this.state.myRef}
                          />
                          <Label>Upload Profile Picture</Label>
                        </FormGroup>

                        <div className="mb-3">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              placeholder="Full name"
                              name="name"
                              autoComplete="useruser"
                              onChange={this.onInputChange}
                              required
                            />
                          </InputGroup>
                          <div
                            style={{
                              textAlign: "left",
                              marginLeft: "40px",
                              color: "red",
                              fontSize: "10px",
                            }}
                          >
                            {this.state.showMessageName &&
                              this.state.MessageName}
                          </div>
                        </div>

                        <div className="mb-3">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-lock"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              placeholder="Username"
                              name="username"
                              autoComplete="userid"
                              onChange={this.onInputChange}
                              required
                            />
                          </InputGroup>
                          <div
                            style={{
                              textAlign: "left",
                              marginLeft: "40px",
                              color: "red",
                              fontSize: "10px",
                            }}
                          >
                            {this.state.showMessageUsername &&
                              this.state.MessageUsername}
                          </div>
                          <div
                            style={{
                              textAlign: "left",
                              marginLeft: "40px",
                              color: "red",
                              fontSize: "10px",
                            }}
                          >
                            {this.state.showMessageExistUser &&
                              this.state.MessageExistUser}
                          </div>
                        </div>
                        <div className="mb-3">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-options"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="password"
                              placeholder="Password"
                              name="password"
                              autoComplete="useruser"
                              onChange={this.onInputChange}
                              required
                            />
                          </InputGroup>
                          <div
                            style={{
                              textAlign: "left",
                              marginLeft: "40px",
                              color: "red",
                              fontSize: "10px",
                            }}
                          >
                            {this.state.showMessagePassword &&
                              this.state.MessagePassword}
                          </div>
                        </div>
                        <div className="mb-3">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-envelope"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              placeholder="Email"
                              name="email"
                              onChange={this.onInputChange}
                              autoComplete="useruser"
                              required
                            />
                          </InputGroup>
                          <div
                            style={{
                              textAlign: "left",
                              marginLeft: "40px",
                              color: "red",
                              fontSize: "10px",
                            }}
                          >
                            {this.state.showMessageEmail &&
                              this.state.MessageEmail}
                          </div>
                          <div
                            style={{
                              textAlign: "left",
                              marginLeft: "40px",
                              color: "red",
                              fontSize: "10px",
                            }}
                          >
                            {this.state.showMessageExistEmail &&
                              this.state.MessageExistEmail}
                          </div>
                        </div>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-phone"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Contact"
                            name="contact"
                            onChange={this.onInputChange}
                            autoComplete="useruser"
                            required
                          />
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-briefcase"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          {/* <Input type="text" placeholder='Company name' name="company" value={this.state.company} onChange={this.onInputChange} autoComplete="new-password" /> */}
                          <Input
                            type="select"
                            name="role"
                            id="role"
                            value={this.state.role}
                            onChange={this.onInputChange}
                            required
                          >
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                          </Input>
                        </InputGroup>

                        {this.state.showMessage && (
                          <div>{this.state.Message}</div>
                        )}
                        <Button
                          color="primary"
                          block
                          onClick={this.onAddUserClick}
                        >
                          Add User
                        </Button>
                      </Form>
                    </ModalBody>
                  </Modal>
              <Card className="mb-0">

                <Table
                  className="table table-hover table-outline mb-0 d-none d-sm-table"
                >
                  <thead className="thead-light">
                    <tr
                    >
                      <th className="text-center table-head">No</th>
                      <th className="text-center table-head"></th>
                      <th className="w-25 text-left table-head">Full Name</th>
                      <th className="text-center table-head">Username</th>
                      <th className="text-center table-head">CreatedDate</th>
                      <th className="text-center table-head">Role</th>
                      <th className="text-center table-head">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {dataList.length === 0 ? (
                      <tr>
                        <td align="center" colSpan="5">
                          No Data
                        </td>
                      </tr>
                    ) : (
                      dataList.map((userData, index) => (
                        <Fragment key={index}>
                          <UserRow numbers={index} userData={userData} />
                        </Fragment>
                      ))
                    )}
                  </tbody>
                </Table>
              <CardFooter>
              <Row>
                <Col xs="12" sm="2" className="text-center text-sm-left mt-2 mt-sm-0 order-2 order-sm-1">
                  <ButtonDropdown isOpen={this.state.isDropdownOpen} toggle={e => { this.onPageButtonToggle() }}>
                    <Button size="sm" color="secondary" className="btn-ghost-*"><span className="lead font-sm font-italic">No. of rows: </span></Button>
                    <DropdownToggle caret size="sm" color="dark">
                      {pagination.itemPerPage}
                    </DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem onClick={() => { this.onPaginationCountChange(1) }}>1</DropdownItem>
                    <DropdownItem onClick={() => { this.onPaginationCountChange(3) }}>3</DropdownItem>
                      <DropdownItem onClick={() => { this.onPaginationCountChange(5) }}>5</DropdownItem>
                      <DropdownItem onClick={() => { this.onPaginationCountChange(10) }}>10</DropdownItem>
                      <DropdownItem onClick={() => { this.onPaginationCountChange(50) }}>50</DropdownItem>
                      <DropdownItem onClick={() => { this.onPaginationCountChange(100) }}>100</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </Col>
                <Col xs="12" sm="10" className="text-center text-sm-right order-1 order-sm-2">
                  <div style={{ display: 'inline-block' }}>
                    <Pagination size="sm" aria-label="Page navigation" className="table-pgn">
                      <PageFirst pagination={pagination} onClick={this.onPaginationNav} />
                      <PagePrev pagination={pagination} onClick={this.onPaginationNav} />
                      <PageItems pagination={pagination} onClick={this.onPaginationNav} />
                      <PageNext pagination={pagination} onClick={this.onPaginationNav} />
                      <PageLast pagination={pagination} onClick={this.onPaginationNav} />
                    </Pagination>
                  </div>
                </Col>
              </Row>
              <div className="text-left mt-2">
              page <strong>{pagination.currentPage}</strong> of <strong>{pagination.totalPage}</strong> page(s)
              </div>
              <div className="text-right">
              </div>
            </CardFooter>
            </Card>
            </CardBody>
            {/* </Card> */}
          {/* </Col>
        </Row> */}
      </Card>

      </>
    );
  }
}

const PageFirst = ({ pagination, onClick }) => {
  if (pagination.currentPage === 1) {
    return (
      <PaginationItem disabled>
        <PaginationLink first={true} />
      </PaginationItem>
    )
  }
  return (
    <PaginationItem>
      <PaginationLink first={true} onClick={() => { onClick("first") }} />
    </PaginationItem>
  )
}

const PagePrev = ({ pagination, onClick }) => {
  let pageCurrentSection = Math.ceil(pagination.currentPage / 5)
  console.log("pagination",pagination.currentPage,"pageCurSec :",pageCurrentSection)
  if (pageCurrentSection === 1) {
    return (
      <PaginationItem disabled>
        <PaginationLink previous  />

      </PaginationItem>
    )
  }
  return (
    <PaginationItem>
      <PaginationLink previous onClick={() => { onClick("prev") }} />
    </PaginationItem>
  )
}
const PageItems = ({ pagination, onClick }) => {
  let pageCurrentSection = Math.ceil(pagination.currentPage / 5)
  let pageCurrentMax = 5
  if (pagination.totalPage < 5) {
    pageCurrentMax = pagination.totalPage
  } else {
    if ((pageCurrentSection * 5) > pagination.totalPage) {
      pageCurrentMax = 5 - ((pageCurrentSection * 5) - pagination.totalPage)
    }
  }

  let pageCount = Array.from(Array(pageCurrentMax), (_, x) => (((pageCurrentSection - 1) * 5) + 1 + x))
  return pageCount.map((page) => {
    let active = true
    if (page !== pagination.currentPage) {
      active = false
    }
    return (
      <PaginationItem key={page} active={active}>
        <PaginationLink onClick={() => { onClick(page) }}>
          {page}
        </PaginationLink>
      </PaginationItem>
    )
  })
}
const PageNext = ({ pagination, onClick }) => {
  let pageMaxSection = Math.ceil(pagination.totalPage / 5)
  let pageCurrentSection = Math.ceil(pagination.currentPage / 5)

  if (pageMaxSection === pageCurrentSection) {
    return (
      <PaginationItem disabled>
        <PaginationLink next />
      </PaginationItem>
    )
  }
  return (
    <PaginationItem>
      <PaginationLink next onClick={() => { onClick("next") }} />
    </PaginationItem>
  )
}
const PageLast = ({ pagination, onClick }) => {
  console.log(pagination.currentPage,pagination.totalPage)
  if (pagination.currentPage === pagination.totalPage) {
    return (
      <PaginationItem disabled>
        <PaginationLink last />
      </PaginationItem>
    )
  }
  return (
    <PaginationItem>
      <PaginationLink last onClick={() => { onClick("last") }} />
    </PaginationItem>
  )
}


  // nextPage = () => {
  //     this.setState({
  //         currentpage: this.state.currentpage + 1,
  //     });
  // }
  // previousPage = () => {
  //     if (this.state.currentpage > 1) {
  //         this.setState({
  //             currentpage: this.state.currentpage - 1,
  //         });
  //     }
  // }

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(Users);
