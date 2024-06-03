import { GET_ORDER_ITEM_FAILURE, GET_ORDER_ITEM_REQUEST, GET_ORDER_ITEM_SUCCESS } from "./ActionType";

export const getOrderItem = (orderId) => async (dispatch) =>{
    dispatch({type: GET_ORDER_ITEM_REQUEST})
    try {
        const {data} = await api.get(`/order/orderitems/${orderId}`);
        dispatch({type: GET_ORDER_ITEM_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: GET_ORDER_ITEM_FAILURE, payload: error.message})
    }
}