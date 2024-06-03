import axios from "axios";
import { API_BASE_URL } from "../../../Config/apiConfig";
import {
  CANCELED_ORDERS_FAILURE,
  CANCELED_ORDERS_REQUEST,
  CANCELED_ORDERS_SUCCESS,
  CONFIRMED_ORDERS_FAILURE,
  CONFIRMED_ORDERS_REQUEST,
  CONFIRMED_ORDERS_SUCCESS,
  DELETE_ORDERS_FAILURE,
  DELETE_ORDERS_REQUEST,
  DELETE_ORDERS_SUCCESS,
  DELIVERED_ORDERS_FAILURE,
  DELIVERED_ORDERS_REQUEST,
  DELIVERED_ORDERS_SUCCESS,
  FIND_ORDERS_STATUS_FAILURE,
  FIND_ORDERS_STATUS_REQUEST,
  FIND_ORDERS_STATUS_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  PLACED_ORDERS_FAILURE,
  PLACED_ORDERS_REQUEST,
  PLACED_ORDERS_SUCCESS,
  SHIPPED_ORDERS_FAILURE,
  SHIPPED_ORDERS_REQUEST,
  SHIPPED_ORDERS_SUCCESS,
} from "./ActionType";

export const getAllOrders = () => async (dispatch) => {
  dispatch({ type: GET_ORDERS_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/admin/order`);
    dispatch({ type: GET_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ORDERS_FAILURE, payload: error.message });
  }
};

export const findOrderStatus = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_ORDERS_STATUS_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/admin/order/filter`, reqData);
    dispatch({ type: FIND_ORDERS_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_ORDERS_STATUS_FAILURE, payload: error.message });
  }
};

export const placeOrder = (orderId) => async (dispatch) => {
    dispatch({ type: PLACED_ORDERS_REQUEST });
    try {
      const { data } = await axios.put(`${API_BASE_URL}/admin/order/${orderId}/place`);
      dispatch({ type: PLACED_ORDERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PLACED_ORDERS_FAILURE, payload: error.message });
    }
  };


export const confirmOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CONFIRMED_ORDERS_REQUEST });
  try {
    const { data } = await axios.put(`${API_BASE_URL}/admin/order/${orderId}/confirm`);
    dispatch({ type: CONFIRMED_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CONFIRMED_ORDERS_FAILURE, payload: error.message });
  }
};

export const shipOrder = (orderId) => async (dispatch) => {
  dispatch({ type: SHIPPED_ORDERS_REQUEST });
  try {
    const { data } = await axios.put(`${API_BASE_URL}/admin/order/${orderId}/ship`);
    dispatch({ type: SHIPPED_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SHIPPED_ORDERS_FAILURE, payload: error.message });
  }
};

export const deliveryOrder = (orderId) => async (dispatch) => {
  dispatch({ type: DELIVERED_ORDERS_REQUEST });
  try {
    const { data } = await axios.put(`${API_BASE_URL}/admin/order/${orderId}/delivery`);
    dispatch({ type: DELIVERED_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELIVERED_ORDERS_FAILURE, payload: error.message });
  }
};

export const cancelOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CANCELED_ORDERS_REQUEST });
  try {
    const { data } = await axios.put(`${API_BASE_URL}/admin/order/${orderId}/cancel`);
    dispatch({ type: CANCELED_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CANCELED_ORDERS_FAILURE, payload: error.message });
  }
};

export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch({ type: DELETE_ORDERS_REQUEST });
  try {
    const { data } = await axios.delete(`${API_BASE_URL}/admin/order/${orderId}`);
    dispatch({ type: DELETE_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_ORDERS_FAILURE, payload: error.message });
  }
};
