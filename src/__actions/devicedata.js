import { CONSTANTS, IRequest, SERVER } from '../api';

export const DevicedataActions = {
    getLatestData,
};

async function getLatestData(dispatch) {
    try {
        let result = await IRequest.GetQuery(SERVER.API.DeviceData.LATEST)
        dispatch({ type: CONSTANTS.DEVICEDATA.LATEST_READING, data: result })
    } catch (error) {
        console.log(error)
    }
}