import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  // AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

// sidebar nav config
import navigation from '../../navigation';

// routes config
import routes from '../../routes';

import { connect } from 'react-redux'
import { Auth, CONSTANTS } from '../../api'
import { Mqtt } from '../../__ifunc'

const DefaultAside = React.lazy(() => import('./DefaultAside'));
// const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  __mqtt = null

  componentDidMount() {
    // console.log('=========DefaultLayout: componentDidMount()================')
    this.__mqtt = new Mqtt()
    this.__mqtt.start(this.props.dispatch)
  }

  async signOut(e) {
    e.preventDefault()
    this.__mqtt.close()
    try {
      await Auth.logout()
    } catch (error) { }
    Auth.removeAuthUser()
    this.props.dispatch({ type: CONSTANTS.CLEAR })
    this.props.history.push('/')
  }

  render() {
    // console.log('============DefaultLayout: render()=================')

    let _navigation = { items: [] }
    let _routes = []

    if (Auth.getAuthEnabled()) {
      const user = Auth.getAuthUser()
      if (typeof (user) !== 'undefined' && user !== null) {
        if (user.role === CONSTANTS.ROLE.SYSTEM.toLowerCase()) {
          _navigation = navigation.System
          _routes = routes.System
        } else if (user.role === CONSTANTS.ROLE.ADMIN.toLowerCase()) {
          _navigation = navigation.Admin
          _routes = routes.Admin
        } else if (user.role === CONSTANTS.ROLE.MANAGER.toLowerCase()) {
          _navigation = navigation.Manager
          _routes = routes.Manager
        }else if (user.role === CONSTANTS.ROLE.SUPERVISOR.toLowerCase()) {
          _navigation = navigation.Supervisor
          _routes = routes.Supervisor
        }else {
          _navigation = navigation.Basic
          _routes = routes.Basic
        }
      }
    } else {
      _navigation = navigation.Basic
      _routes = routes.Basic
    }
    let __local_props = { ...this.props }
    delete __local_props.dispatch

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={_navigation} {...__local_props} router={router} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={_routes} router={router} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {_routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        {/* <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter> */}
      </div>
    );
  }
}

const DefaultLayouts = connect(state => state)(DefaultLayout);
export default DefaultLayouts;
