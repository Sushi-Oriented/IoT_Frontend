import { connect } from 'mqtt';
import {
    CONSTANTS,
    SERVER
} from '../api'

var client = null;
var timeOut = null;
class Mqtt {
    start(dispatch) {
        if (client !== null) {
            return
        }

        client = connect(SERVER.MQTT.URL, {
            username: SERVER.MQTT.User,
            password: SERVER.MQTT.Pass,
            clientId: 'web_system' + Math.random().toString(16).substr(2, 8),
        });

        client.on('connect', function () {
            console.log("Connected to broker");
            client.subscribe('datastream');
            client.subscribe('HR');
            client.subscribe('NOTIFICATION');
        })
        client.on('message', function (topic, message) {
            // message is Buffer 
            let _data = JSON.parse(message.toString())
            // console.log(topic, _data)
            if (topic === 'datastream') {
                
            } else if (topic === 'HR') {
                // console.log('Mqtt HR')
                TimeExpired()
            } else if (topic === 'NOTIFICATION') {
                // console.log('NOTIFICATION')
                console.log(topic, _data)
                if (typeof (_data.id) === 'undefined' || typeof (_data.types) === 'undefined' || typeof (_data.value) === 'undefined' || typeof (_data.resolve) === 'undefined' || typeof (_data.datetime) === 'undefined') {
                    return
                }
                // message = {type: System|Threshold, value: '', datetime: ''}
                dispatch({ type: CONSTANTS.DASHBOARD.ERRORSYSTEM, data: _data })
            }
        });
        client.on('error', function (err) {
            // console.log('MQTT error: '+err);
        });
        client.on('close', function (err) {
            // console.log('MQTT close: '+err);
        });

        function TimeExpired() {
            if (timeOut !== null) {
                clearTimeout(timeOut)
            }
            timeOut = setTimeout(() => {
                console.log('TimeOut Event...')
                TimeExpired()
            }, 60000)
        } TimeExpired()
    }
    close() {
        if (client !== null) {
            client.end()
            client = null

            clearInterval(timeOut)
        }
    }
}
export default Mqtt;