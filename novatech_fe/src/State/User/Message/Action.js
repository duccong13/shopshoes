import axios from "axios";
import { API_BASE_URL } from "../../../Config/apiConfig";
import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE, GET_ALL_MESSAGE_CHAT_ID } from "./ActionType";

export const createMessage = (messageData) => async (dispatch) => {
  // console.log("Message", messageData)
  try {
    const res = await fetch(`${API_BASE_URL}/messages/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${messageData.jwt}`,
      },
      body: JSON.stringify(messageData.data),
    });

    const data = await res.json();
    // console.log("Cur Mes: ", data)
    dispatch({ type: CREATE_NEW_MESSAGE, payload: data });
  } catch (error) {
    console.log("Error", error);
  }
};

export const getAllMessages = (reqData) => async (dispatch) => {
  try {
    const res = await fetch(`${API_BASE_URL}/messages/chat/${reqData.chatId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${reqData.jwt}`,
      },
      body: JSON.stringify(reqData.data),
    });

    const data = await res.json();
    // console.log("All Message: ", data)
    dispatch({ type: GET_ALL_MESSAGE_CHAT_ID, payload: data });
  } catch (error) {
    console.log("Error", error);
  }
};

export const getMessages = () => async (dispatch) => {
  try {
    const data = await axios.get(`${API_BASE_URL}/messages/all`)
    // console.log("All Message: ", data)
    dispatch({ type: GET_ALL_MESSAGE, payload: data });
  } catch (error) {
    console.log("Error", error);
  }
};
