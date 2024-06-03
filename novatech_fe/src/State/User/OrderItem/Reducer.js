import { GET_ORDER_ITEM_FAILURE, GET_ORDER_ITEM_REQUEST, GET_ORDER_ITEM_SUCCESS } from "./ActionType"

const init = {
    orderItems:[],
    orderItem: null,
    loading:false,
    error: null
}


export const orderItemReducer = (state = init, action) => {
    switch(action.type){
        case GET_ORDER_ITEM_REQUEST:
            return {...state, loading: true, error: null}
        case GET_ORDER_ITEM_SUCCESS:
            return {...state, loading: false, orderItems: action.payload}
        case GET_ORDER_ITEM_FAILURE:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}