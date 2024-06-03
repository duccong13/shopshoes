import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE, GET_ALL_MESSAGE_CHAT_ID } from "./ActionType";

const init = {
    messages:null,
    newMessage: null,
    allMessage: null,
}


export const messageReducer = (state = init, action) => {
    switch(action.type){
        case CREATE_NEW_MESSAGE:
            return {...state, newMessage: action.payload}
        case GET_ALL_MESSAGE_CHAT_ID:
            return {...state, messages: action.payload}
        case GET_ALL_MESSAGE:
            return {...state, allMessage: action.payload}
        default:
            return state;
    }
}