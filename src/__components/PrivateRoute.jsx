import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Auth } from '../api';

export const PrivateRoute = ({ component: Component, default: defaultRoute, ...rest }) => {
    // console.log(Auth.getAuthUserAccessToken())
    if (Auth.getAuthEnabled()) {
        return (
            <Route {...rest} render={props => (
                Auth.getAuthUserAccessToken() ? <Component {...props} /> : <Redirect to={{ pathname: (defaultRoute) ? defaultRoute : '/login', state: { from: props.location } }} />
            )} />
        )
    }

    console.log("Auth System Is Disabled. Please Enable it at auth.js")
    return (
        <Route {...rest} render={props => (<Component {...props} />)} />
    )
}
