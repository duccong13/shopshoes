import { api } from "../../../Config/apiConfig"
import { CREATE_REVIEW_FAILURE, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, DELETE_REVIEW_FAILURE, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, GET_REVIEW_FAILURE, GET_REVIEW_REQUEST, GET_REVIEW_SUCCESS, UPDATE_REVIEW_FAILURE, UPDATE_REVIEW_REQUEST, UPDATE_REVIEW_SUCCESS } from "./ActionType"

export const getReviewByProduct = (reqData) => async (dispatch) => {
    console.log("GET", reqData)
    dispatch({type: GET_REVIEW_REQUEST})
    try{
        const data = await api.get(`/reviews/${reqData.productId}`)
        console.log("Cur Review", data)
        dispatch({type: GET_REVIEW_SUCCESS, payload:data})
    }
    catch(error){
        dispatch({type: GET_REVIEW_FAILURE, payload:error.message})
        // console.log(error)
    }
}

export const createReviewByProduct = (reqData) => async (dispatch) => {
    console.log("Create", reqData)
    dispatch({type: CREATE_REVIEW_REQUEST})
    try{
        const {data} = await api.post(`/reviews`, reqData)
        dispatch({type: CREATE_REVIEW_SUCCESS, payload:data})
    }
    catch(error){
        dispatch({type: CREATE_REVIEW_FAILURE, payload:error.message})
    }
}

export const updateReviewByProduct = (reqData) => async (dispatch) => {
    dispatch({type: UPDATE_REVIEW_REQUEST})
    console.log(reqData)
    try{
        const {data} = await api.put(`/reviews/${reqData.reviewId}`, reqData.content)
        dispatch({type: UPDATE_REVIEW_SUCCESS, payload:data})
    }
    catch(error){
        dispatch({type: UPDATE_REVIEW_FAILURE, payload:error.message})
    }
}

export const deleteReviewByProduct = (reviewId) => async (dispatch) => {
    console.log("DELETE", reviewId)
    dispatch({type: DELETE_REVIEW_REQUEST})
    try{
        const {data} = await api.delete(`/reviews/${reviewId}`)
        dispatch({type: DELETE_REVIEW_SUCCESS, payload:data})
    }
    catch(error){
        dispatch({type: DELETE_REVIEW_FAILURE, payload:error.message})
    }
}