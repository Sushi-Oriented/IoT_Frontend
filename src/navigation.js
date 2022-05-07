const Dashboard = {
  name: 'Dashboard',
  url: '/dashboard',
  icon: 'icon-pie-chart',
}

const Users = {
  name: 'Users',
  url: '/users',
  icon: 'icon-people',
}

export default {
  System: { items: [Dashboard, Users] },
  Admin: { items: [Dashboard, Users] },
  Manager: { items: [Dashboard] },
  Supervisor: { items: [] },
  Basic: { items: [] },
};
