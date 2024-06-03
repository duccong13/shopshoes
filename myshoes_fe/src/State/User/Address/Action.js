import { data } from "autoprefixer"
import { api } from "../../../Config/apiConfig"
import { CREATE_ADDRESS_FAILURE, CREATE_ADDRESS_REQUEST, CREATE_ADDRESS_SUCCESS, DELETE_ADDRESS_FAILURE, DELETE_ADDRESS_REQUEST, DELETE_ADDRESS_SUCCESS, GET_ADDRESS_FAILURE, GET_ADDRESS_REQUEST, GET_ADDRESS_SUCCESS, UPDATE_ADDRESS_FAILURE, UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_SUCCESS } from "./ActionType"


export const createAddress = (reqData) => async (dispatch) =>{
    dispatch({type: CREATE_ADDRESS_REQUEST})
    try{
        const {data} = await api.post(`/address/create`, reqData)
        const addressId = data.result.addressId
        dispatch({type: CREATE_ADDRESS_SUCCESS, payload:data})
        return addressId;
    }
    catch(error){
        dispatch({type: CREATE_ADDRESS_FAILURE, payload:error.message})
    }
}

export const updateAddress = (reqData, addressId) => async (dispatch) =>{
    dispatch({type: UPDATE_ADDRESS_REQUEST})
    try{
        const {data} = await api.put(`/address/update/${addressId}`, reqData)

        dispatch({type: UPDATE_ADDRESS_SUCCESS, payload:data})
    }
    catch(error){
        dispatch({type: UPDATE_ADDRESS_FAILURE, payload:error.message})
    }
}
export const deleteAddress = (reqData, addressId) => async (dispatch) =>{
    dispatch({type: DELETE_ADDRESS_REQUEST})
    try{
        const {data} = await api.delete(`/address/delete/${addressId}`, reqData)

        dispatch({type: DELETE_ADDRESS_SUCCESS, payload:data})
    }
    catch(error){
        dispatch({type: DELETE_ADDRESS_FAILURE, payload:error.message})
    }
}

export const getAddress = () => async (dispatch) => {
    dispatch({type: GET_ADDRESS_REQUEST})
    try {
        const {data} = await api.get(`/address`);
        dispatch({type: GET_ADDRESS_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type: GET_ADDRESS_FAILURE, payload:error.message})
    }
}