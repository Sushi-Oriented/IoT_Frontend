import { CONSTANTS } from '../api';
let initState = {
    data: [], graph: null, message: '', notification: [],
    listErrSystem: [],
    errorSystem: { id: 0, show: false, types: '', value: '', resolve: false, datetime: '' }
}

export function dashboard(state = initState, action) {
    //console.log(action)
    let __state = { ...state }
    switch (action.type) {
        case CONSTANTS.DASHBOARD.SUCCESS:
            return {
                data: action.result,
                graph: [...state.graph]
            };
        case CONSTANTS.DASHBOARD.FAILURE:
            return {
                message: action.message,
                data: [...state.data],
                graph: [...state.graph]
            };
        case CONSTANTS.DASHBOARD.GRAPH_SUCCESS:
            return {
                ...state,
                graph: action.result
            };
        case CONSTANTS.DASHBOARD.GRAPH_FAILURE:
            return {
                message: action.message,
                graph: [...state.graph]
            };
        case CONSTANTS.DASHBOARD.NOTIFICATION:
            return { ...state, notification: action.data };
        case CONSTANTS.DASHBOARD.ERRORSYSTEM:
            // console.log(action.data)
            __state.listErrSystem.push(action.data)
            __state.errorSystem = {
                id: __state.listErrSystem[0].id,
                show: true,
                types: __state.listErrSystem[0].types,
                value: __state.listErrSystem[0].value,
                datetime: __state.listErrSystem[0].datetime,
                resolve: __state.listErrSystem[0].resolve
            }

            return __state
        case CONSTANTS.DASHBOARD.ERRORSYSTEM_RESET:
            __state.listErrSystem.shift()
            if (__state.listErrSystem.length === 0) {
                __state.errorSystem = initState.errorSystem
            } else {
                __state.errorSystem = {
                    id: __state.listErrSystem[0].id,
                    show: true,
                    types: __state.listErrSystem[0].types,
                    value: __state.listErrSystem[0].value,
                    datetime: __state.listErrSystem[0].datetime,
                    resolve: __state.listErrSystem[0].resolve
                }
            }
            return __state
        case CONSTANTS.CLEAR:
            return initState
        default:
            return state
    }
}
