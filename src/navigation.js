const Dashboard = {
  name: 'Dashboard',
  url: '/blank',
  icon: 'icon-pie-chart',
}

const Satellite = {
  name: 'Satellite',
  url: '/satellite',
  icon: 'icon-feed',
}

const Heat = {
  name: 'Heat Sensor',
  url: '/dashboard',
  icon: 'icon-fire',
}

const Ground = {
  name: 'Ground Sensor',
  url: '/blank',
  icon: 'icon-globe',
}

const Ash = {
  name: 'Ash Sensor',
  url: '/blank',
  icon: 'icon-cloud-upload',
}

const Message = {
  name: 'Messaging',
  url: '/message',
  icon: 'icon-pie-chart',
}

const Users = {
  name: 'Users',
  url: '/users',
  icon: 'icon-people',
}

export default {
  System: { items: [Dashboard,Satellite, Users] },
  Admin: { items: [Dashboard,Satellite,Heat,Ground,Ash,Message, Users] },
  Manager: { items: [Dashboard] },
  Supervisor: { items: [] },
  Basic: { items: [] },
};
