import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Profile = React.lazy(() => import('./views/Profile/Profile'))
const Users = React.lazy(() => import('./views/User/User'))

const routesAdmin = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/profile', exact: true, name: 'Profile', component: Profile },
  { path: '/users', exact: true, name: 'Users', component: Users },
];

const routesManager = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/profile', exact: true, name: 'Profile', component: Profile },
];

const routesSupervisor = [];
const routesBasic = [];

export default {
  System: routesAdmin,
  Admin: routesAdmin,
  Manager: routesManager,
  Supervisor: routesSupervisor,
  Basic: routesBasic,
};
