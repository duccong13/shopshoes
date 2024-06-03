import { api } from "../../../Config/apiConfig"
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, GET_HISTORY_ORDER_FAILURE, GET_HISTORY_ORDER_REQUEST, GET_HISTORY_ORDER_SUCCESS } from "./ActionType"

export const createOrder = (reqData) => async (dispatch) =>{
    dispatch({type: CREATE_ORDER_REQUEST})
    try {
        const {data} = await api.post("/order", reqData)

        dispatch({type: CREATE_ORDER_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: CREATE_ORDER_FAILURE, payload: error.message})
    }
}

export const deleteOrderById = (orderId) => async (dispatch) =>{
    dispatch({type: DELETE_ORDER_REQUEST})
    try {
        const {data} = await api.delete(`/order/${orderId}`)

        dispatch({type: DELETE_ORDER_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: DELETE_ORDER_FAILURE, payload: error.message})
    }
}

export const orderHistory = () => async (dispatch) => {
    dispatch({ type: GET_HISTORY_ORDER_REQUEST });
    try {
        const res = await api.get("/order");

        // Kiểm tra xem phản hồi có thành công hay không
        if (res.status !== 200) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        // Kiểm tra xem nội dung phản hồi có phải là JSON không
        const contentType = res.headers['content-type'];
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error("Response is not JSON");
        }

        // Nếu phản hồi là JSON, lấy dữ liệu
        const data = res.data;
        console.log("cur", data);

        dispatch({ type: GET_HISTORY_ORDER_SUCCESS, payload: data });
    } catch (error) {
        console.error("Error fetching order history:", error);
        dispatch({ type: GET_HISTORY_ORDER_FAILURE, payload: error.message });
    }
};