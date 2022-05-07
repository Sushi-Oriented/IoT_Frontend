
import { SERVER } from '../api/constants'
// import { DashboardActions } from '../__actions'

const io = require('socket.io-client')

class WebSocketIOClient {
    constructor(props) {
        this.props = props;

        this.socket = io(SERVER.SOCKET_IO);
        this.socket.on('connect', () => {
            console.log("Connected..")
            // either with send()
            // this.socket.send('Hello! from browser.');
            // or with emit() and custom event names
            // socket.emit('salutations', 'Hello!', { 'mr': 'john' }, Uint8Array.from([1, 2, 3, 4]));
        });

        // handle the event sent with socket.send()
        this.socket.on('message', data => {
            // console.log(data);
            // console.log(this.props)
            // if (data.topic === "HISTORY/NEW") {
            //     DashboardActions.getCurrent(this.props.dispatch)
            //     DashboardActions.getTodayData(this.props.dispatch)
            //     DashboardActions.getTotalLoad(this.props.dispatch)
            // }
        });
        this.socket.on('notification', function (message) {
            // console.log('notification', message);
        });
    }

    send(data) {
        try {
            this.socket.send(data);
        } catch (e) {
            console.log(e)
        }
    }
    close() {
        this.socket.disconnect()
    }
}
export default WebSocketIOClient;
