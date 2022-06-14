import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Profile = React.lazy(() => import('./views/Profile/Profile'))
const Users = React.lazy(() => import('./views/User/User'))
const Blank = React.lazy(() => import('./views/blank'))
const Message = React.lazy(() => import('./views/Message'))
const Satellite = React.lazy(() => import('./views/Satellite'))

const routesAdmin = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/profile', exact: true, name: 'Profile', component: Profile },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/satellite', exact: true, name: 'Satellite', component: Satellite },
  { path: '/message', exact: true, name: 'Message', component: Message },
  { path: '/blank', exact: true, name: 'Blank', component: Blank },

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
