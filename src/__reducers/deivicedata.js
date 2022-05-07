import { CONSTANTS } from '../api';
let initState = {
    data: [],
    latest: {}
}

export function devicedata(state = initState, action) {
    //console.log(action)
    let __state = { ...state }
    switch (action.type) {
        case CONSTANTS.DEVICEDATA.SUCCESS:
            return {
                data: action.result
            };
        case CONSTANTS.DEVICEDATA.LATEST_READING:
            return { ...state, latest: action.data };
        case CONSTANTS.CLEAR:
            return initState
        default:
            return state
    }
}
