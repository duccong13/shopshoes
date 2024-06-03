import { CREATE_CHAT, GET_ALL_CHAT } from "./ActionType"

const init = {
    chats:null,
    createdChat: null,
}


export const chatReducer = (state = init, action) => {
    switch(action.type){
        case CREATE_CHAT:
            return {...state, createChat: action.payload}
        case GET_ALL_CHAT:
            return {...state, chats: action.payload}
        default:
            return state;
    }
}