var API_ROUTE = '', MQTT_URL = ''
const dev = true;

if (dev) {
    API_ROUTE = 'http://' + window.location.hostname + ':3033/api'
    MQTT_URL = 'ws://' + window.location.hostname + ':3889'
} else {
    API_ROUTE = 'http://' + window.location.hostname + '/api'
    MQTT_URL = 'ws://' + window.location.hostname + '/ws'
}

export const SERVER = {
    API: {
        Login: API_ROUTE + '/AppUsers/login',
        Logout: API_ROUTE + '/AppUsers/logout',
        ChangePassword: API_ROUTE + '/AppUsers/change-password',

        AppUser: {
            MAIN: API_ROUTE + 'AppUsers',

            RegisterAdmin: API_ROUTE + '/AppUsers/register/admin',
            RegisterManager: API_ROUTE + '/AppUsers/register/manager',
            RegisterSupervisor: API_ROUTE + '/AppUsers/register/supervisor',
            RegisterNormalUser: API_ROUTE + '/AppUsers/register/normalUser',

            ListAdmin: API_ROUTE + '/AppUsers/list/admins',
            ListManager: API_ROUTE + '/AppUsers/list/managers',
            ListSupervisor: API_ROUTE + '/AppUsers/list/supervisors',
            ListNormalUser: API_ROUTE + '/AppUsers/list/normalUsers',
            ListUser: API_ROUTE + '/AppUsers/list/AllUsers',

            RemoveUser: (id) => { return API_ROUTE + '/AppUsers/remove/' + id },
            UpdateUser: (id) => { return API_ROUTE + '/AppUsers/update/' + id },
            ChangeRole: (id) => { return API_ROUTE + '/AppUsers/changeRole/' + id },
            ResetPassword: (id) => { return API_ROUTE + '/AppUsers/password/reset/' + id },

            UpdateById: (id) => { return API_ROUTE + '/AppUsers/' + id }
        },

        Device: {
            Device: API_ROUTE + '/Devices',
            Statistic: API_ROUTE + '/Devices/devicestatistic',
            Delete: API_ROUTE + '/Devices/',
            Update: API_ROUTE + '/Devices/update'
        },

        DeviceData: {
            MAIN: API_ROUTE + '/DeviceData',
            LATEST: API_ROUTE + '/DeviceData/latest',
        },

        History: {
            MAIN: API_ROUTE + '/HistoryData'
            // Update: MAIN+'/api/History/update/info'
        },

    },
    MQTT: {
        URL: MQTT_URL,
        User: 'gpscollar_dash',
        Pass: 'asdh@453bia&2sfeeYq3rs'
    }
}
