import axios from "axios";
import { API_BASE_URL } from "../../../Config/apiConfig";
import {
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCTS_BY_NAME_FAILURE,
  GET_PRODUCTS_BY_NAME_REQUEST,
  GET_PRODUCTS_BY_NAME_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
} from "./ActionType";

export const findProduts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });
  const {
    categoryName,
    color,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    pageNumber,
    pageSize,
  } = reqData;
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/products/filter?categoryName=${categoryName}&color=${color}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const findProductsById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  try {
    const data = await axios.get(`${API_BASE_URL}/products/${reqData}`);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

export const getProducts = (reqData) => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_REQUEST });
  console.log(reqData)
  const { pageNumber, pageSize } = reqData;
  try {
    const {data} = await axios.get(
      `${API_BASE_URL}/products?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_FAILURE, payload: error });
  }
};

export const findProductByName = (reqData) => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_BY_NAME_REQUEST });
  const {request} = reqData;
  try {
    const {data} = await axios.get(`${API_BASE_URL}/products/search?request=${request}`);
    dispatch({ type: GET_PRODUCTS_BY_NAME_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_BY_NAME_FAILURE, payload: error });
  }
};
