import { CONSTANTS } from '../api';
let initState = {
    data: []
}

export function users(state = initState, action) {
    //console.log(action)
    // let __state = { ...state }
    switch (action.type) {
        case CONSTANTS.USER.LIST_SUCCESS:
            let count = 1
            let __data = action.data.map((items) => {
                return { ...items, seq: count++}
            })
            return {
                ...state,
                data: __data
            };
        case CONSTANTS.CLEAR:
            return initState
        default:
            return state
    }
}
