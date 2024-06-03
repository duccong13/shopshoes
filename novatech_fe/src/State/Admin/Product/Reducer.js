import { CREATE_PRODUCTS_FAILURE, CREATE_PRODUCTS_REQUEST, CREATE_PRODUCTS_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, GET_ALL_PRODUCTS_FAILURE, GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS, UPDATE_PRODUCTS_FAILURE, UPDATE_PRODUCTS_REQUEST, UPDATE_PRODUCTS_SUCCESS } from "./ActionType"

const init = {
    products: [],
    product: null,
    loading: false,
    error: null
}

export const adminProductReducer = (state = init, action) => {
    switch(action.type){
        case CREATE_PRODUCTS_REQUEST:
        case UPDATE_PRODUCTS_REQUEST:
        case DELETE_PRODUCT_REQUEST:
        case GET_ALL_PRODUCTS_REQUEST:
            return {...state, loading: true, error: null}
        case GET_ALL_PRODUCTS_SUCCESS:
            return {...state, loading: false, products: action.payload}
        case CREATE_PRODUCTS_SUCCESS:
            return {...state, loading: false, products:[...state.products, action.payload], error: null}
        case UPDATE_PRODUCTS_SUCCESS:
            return {...state, loading: false, updateProducts: action.payload, error: null};
        case DELETE_PRODUCT_SUCCESS:
            return {...state, loading: false, deleteProducts: action.payload}
        case GET_ALL_PRODUCTS_FAILURE:
        case CREATE_PRODUCTS_FAILURE:
        case DELETE_PRODUCT_FAILURE:
        case UPDATE_PRODUCTS_FAILURE:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}