import { API_BASE_URL } from "../../../Config/apiConfig"
import { CREATE_CHAT, GET_ALL_CHAT } from "./ActionType";

export const createChat = (chatData) => async (dispatch) => {

    try {
        const res = await fetch(`${API_BASE_URL}/chats/single`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${chatData.jwt}`
            },
            body:JSON.stringify(chatData.data)
        })

        const data = await res.json();
        // console.log("Cr Chat", data)
        dispatch({type:CREATE_CHAT, payload:data})
    } catch (error) {
        console.log("Error", error)
    }
}

export const getUsersChat = (chatData) => async (dispatch) => {

    try {
        const res = await fetch(`${API_BASE_URL}/chats/user`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${chatData.jwt}`
            },
            body:JSON.stringify(chatData.data)
        })

        const data = await res.json();
        // console.log("user chat:", data)
        dispatch({type:GET_ALL_CHAT, payload:data})
    } catch (error) {
        console.log("Error", error)
    }
}