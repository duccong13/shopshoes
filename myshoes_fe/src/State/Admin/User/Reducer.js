import { DELETE_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS } from "./ActionType"

const init = {
    users: [],
    loading: false,
    error: null,
}

export const userAdminReducer = (state = init, action) => {
    switch(action.type){
        case DELETE_USER_REQUEST:
            return {...state, loading: true, error: null}
        case DELETE_USER_SUCCESS:
            return {...state, loading: false, deleteUsers: action.payload}
        case DELETE_USER_FAILURE:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}