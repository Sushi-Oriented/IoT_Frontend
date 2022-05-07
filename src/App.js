import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from './__components';

// import Loadable from 'react-loadable';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Login'));

class App extends Component {
  render() {
    // console.log('==========App: render()=====================')
    return (
      <BrowserRouter>
          <React.Suspense fallback={loading()}>
            <Switch>            
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <PrivateRoute path="/" component={DefaultLayout} default='/login' />
            </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
  }
}
export default App;
