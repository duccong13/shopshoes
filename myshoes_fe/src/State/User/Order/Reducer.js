import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, GET_HISTORY_ORDER_FAILURE, GET_HISTORY_ORDER_REQUEST, GET_HISTORY_ORDER_SUCCESS } from "./ActionType"

const init = {
    orders:[],
    order: null,
    loading:false,
    error: null
}


export const orderReducer = (state = init, action) => {
    switch(action.type){
        case CREATE_ORDER_REQUEST:
        case GET_HISTORY_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
            return {...state, loading: true, error: null}
        case CREATE_ORDER_SUCCESS:
            return {...state, loading: false, order: action.payload}
        case GET_HISTORY_ORDER_SUCCESS:
            return {...state, loading: false, orders: action.payload}
        case DELETE_ORDER_SUCCESS:
            return {...state, loading: false, deleteOrder: action.payload}
        case CREATE_ORDER_FAILURE:
        case GET_HISTORY_ORDER_FAILURE:
        case DELETE_ORDER_FAILURE:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}