import { CREATE_PAYMENT_FAILURE, CREATE_PAYMENT_REQUEST, CREATE_PAYMENT_SUCCESS } from "./ActionType"

const init = {
    payments:[],
    payment: null,
    loading:false,
    error: null
}


export const paymentReducer = (state = init, action) => {
    switch(action.type){
        case CREATE_PAYMENT_REQUEST:
            return {...state, loading: true, error: null}
        case CREATE_PAYMENT_SUCCESS:
            return {...state, loading: false, payment: action.payload}
        case CREATE_PAYMENT_FAILURE:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}