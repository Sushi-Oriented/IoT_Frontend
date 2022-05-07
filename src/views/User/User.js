import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import {
    Button,
    // ButtonDropdown,
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
    // PaginationItem,
    // PaginationLink,
    Row,
    // Table,
    // Pagination,
    // PaginationItem,
    // PaginationLink,
    // DropdownItem,
    // DropdownMenu,
    // DropdownToggle,

} from 'reactstrap';

// add
import { connect } from 'react-redux';
import { UsersActions } from '../../__actions'
import { Auth, CONSTANTS } from '../../api'
import Dates from '../../__ifunc/dates'

import alertify from 'alertifyjs'

import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import cellEditFactory from 'react-bootstrap-table2-editor';
// import { Type } from 'react-bootstrap-table2-editor';
import paginationFactory from 'react-bootstrap-table2-paginator';

let PUSER = Auth.getAuthUser()

// const USERS_ROLE = {
//     type: Type.SELECT,
//     options: [
//         {
//             value: CONSTANTS.ROLE.ADMIN,
//             label: CONSTANTS.ROLE.ADMIN
//         },
//         {
//             value: CONSTANTS.ROLE.MANAGER,
//             label: CONSTANTS.ROLE.MANAGER
//         }
//     ]
// }
const tblColumns = [
    {
        dataField: 'id',
        text: '#',
        headerClasses: "table-col-head",
        hidden: true,
        editable: false
    },
    {
        dataField: 'seq',
        text: 'No',
        headerClasses: "table-col-head text-center",
        editable: false,
        headerStyle: { width: "10%", textAlign: 'center' },
    },
    {
        dataField: 'username',
        text: 'Username',
        headerClasses: "table-col-head text-center",
        align: 'center',
        sort: false,
        editable: false
    },
    {
        dataField: 'name',
        text: 'Full Name',
        headerClasses: "table-col-head text-center",
        align: 'center',
        sort: false,
        editable: true
    },
    // {
    //     dataField: 'role',
    //     text: 'Role',
    //     headerClasses: "table-col-head text-center",
    //     align: 'center',
    //     sort: false,
    //     editor: USERS_ROLE
    // },
    {
        dataField: 'createdDate',
        text: 'Created',
        headerClasses: "table-col-head text-center",
        align: 'center',
        sort: false,
        editable: false,
        formatter: (e, columns) => {
            return (
                <div className="text-center">
                    {Dates.format(columns.createdDate, Dates.FORMAT.DATE_TIME1)}
                </div>
            )
        }
    },
    {
        dataField: '',
        text: 'Action',
        headerClasses: "table-col-head",
        align: 'center',
        editable: false,
        formatter: (e, columns, columnIndex, row) => {
            return (
                <div className="text-center">
                    <Button style={{ backgroundColor: "#808080", color: "#fff" }} onClick={() => { onTableUpdateValue(columns) }}>update <i className="fa fa-edit"></i></Button>
                </div>
            )
        },
        headerStyle: () => {
            return { width: '20%', textAlign: 'center', whiteSpace: 'nowrap' };
        }
    }
]


class Users extends Component {

    constructor(props) {
        super(props)

        this.state = {
            addUser: false,
            username: '',
            password: '',
            name: '',
        }
    }

    componentDidMount() {
        // PUSER = Auth.getAuthUser()
        // userActions.getListUser(PUSER.role, this.props.dispatch)
        UsersActions.getListUser(this.props.dispatch)
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

    onInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    toggleAddUser = () => {
        this.setState({
            addUser: !this.state.addUser,
        });
    }
    onAddUserClick = async (e) => {
        try {
            e.preventDefault()
            await UsersActions.registerUser(CONSTANTS.ROLE.MANAGER, {
                name: this.state.name,
                username: this.state.username,
                password: this.state.password,
                contact: '1'
            })
            this.setState({ addUser: false })

            alertify.success('Success Register User')
            UsersActions.getListUser(this.props.dispatch)
        } catch (error) {
            console.log(error)
            alertify.error(error)
        }
    }

    render() {
        const { users } = this.props

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12">
                        <CardHeader className="bg-dark border-bottom-0">
                            <Row>
                                <Col className="mt-md-auto text-left h3" xs="12" md="11" lg="11">
                                    <i className="icon-people font-xl icons mr-2 text-primary"></i>
                                    Manage Users
                                </Col>
                                <Col className="mr-1 text-right">
                                    <Row>
                                        <Button onClick={this.toggleAddUser} size="xs" color="primary"><i className="icon-plus"></i></Button>
                                    </Row>

                                    <Modal isOpen={this.state.addUser} toggle={this.toggleAddUser} className={'modal-dark ' + this.props.className}>
                                        <ModalHeader toggle={this.toggleAddUser}><span className="h2">Add New User</span></ModalHeader>
                                        <ModalBody>
                                            <Form>
                                                <InputGroup className="mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText><i className="icon-user"></i></InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input type="text" placeholder="User Full Name" name="name" autoComplete="useruser" onChange={this.onInputChange} />
                                                </InputGroup>
                                                <InputGroup className="mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="icon-options"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input type="text" placeholder="User ID" name="username" autoComplete="userid" onChange={this.onInputChange} />
                                                </InputGroup>
                                                <InputGroup className="mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText><i className="icon-lock"></i></InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input type="password" placeholder="Password" name="password" autoComplete="useruser" onChange={this.onInputChange} />
                                                </InputGroup>

                                                {this.state.showErrorMessage && <div>{this.state.errorMessage}</div>}
                                                <Button color="primary" block onClick={this.onAddUserClick}>Add User</Button>

                                            </Form>
                                        </ModalBody>
                                    </Modal>
                                </Col>
                            </Row>
                        </CardHeader>
                        <Card className="border-w-2">
                            <CardBody className="p-0">
                                <BootstrapTable
                                    classes="table-md table-responsive-sm align-middle text-center"
                                    keyField='id'
                                    data={users.data}
                                    columns={tblColumns}
                                    condensed
                                    bordered={false}
                                    striped={true}
                                    noDataIndication="Record not found"
                                    cellEdit={cellEditFactory({
                                        mode: 'click',
                                        blurToSave: true,
                                        // afterSaveCell: (oldValue, newValue, columns) => {
                                        //     // console.log(columns)
                                        //     this.onTableUpdate()
                                        // }
                                    })}
                                    pagination={paginationFactory()}
                                />
                            </CardBody>
                            <CardFooter>
                                {/* <Row>
                                    <Col xs="12" sm="2" className="text-center text-sm-left mt-2 mt-sm-0 order-2 order-sm-1">
                                        <ButtonDropdown isOpen={this.state.isDropdownOpen} toggle={e => { this.onPageButtonToggle() }}>
                                            <Button size="sm" color="secondary" className="btn-ghost-*"><span className="lead font-sm font-italic">No. of rows: </span></Button>
                                            <DropdownToggle caret size="sm" color="dark">
                                                {pagination.itemPerPage}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => { this.onPaginationCountChange(10) }}>10</DropdownItem>
                                                <DropdownItem onClick={() => { this.onPaginationCountChange(20) }}>20</DropdownItem>
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
                                </Row> */}


                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

const onTableUpdateValue = async (data) => {
    // console.log(data)
    try {
        await UsersActions.updateUser(data.id, { name: data.name})
        alertify.success('Success.')
    } catch (error) {
        alertify.error('Fail to Update: ' + error)
    }
}

function mapStateToProps(state) {
    return state
}
export default connect(mapStateToProps)(Users)
