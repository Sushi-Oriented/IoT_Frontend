import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from './logo2.png'
import sygnet from './logo2.png'
import volcanic from '../../assets/img/brand/VolcanicDashboard.png'
import { Auth } from '../../api'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  render() {
    // console.log('========DefaultHeader: render()==============')

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const user = Auth.getAuthUser()

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: volcanic,  height: 55, alt: 'Logo' }}
          minimized={{ src: volcanic, height: 45, alt: 'Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto bg-light-grey radius-30 mr-2" navbar>
          <NavItem className="d-md-down-none bg-secondary font-weight-bold pl-2 pr-1 radius-l-30" style={{ height:'40px' }}>
            <div className="px-2 pt-2 text-p">{user && user.name}</div>
          </NavItem>
          <NavItem className="d-sm-down-none mr-2 ml-4 ml-lg-2">
            <NavLink to="/profile" className="nav-link"><i className="icon-user mr-2"></i>Profile</NavLink>
          </NavItem>
          <NavItem className="d-sm-down-none mx-2" onClick={e => this.props.onLogout(e)}>
            <NavLink to="#" className="nav-link"><i className="icon-logout mr-2"></i>Logout</NavLink>
          </NavItem>
          <NavItem style={{ minWidth: "40px", width: "45px" }}>
            <NavLink to="#" className="nav-link hover-shadow"><img src={'../../assets/img/avatars/icons8-customer-48_1.png'} className="img-avatar mx-0" style={{ height: "40px" }} alt="admin@bootstrapmaster.com" /></NavLink>
          </NavItem>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
