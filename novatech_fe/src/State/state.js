import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import {thunk} from "redux-thunk"
import { authReducer } from "./Auth/Reducer"
import { userProductReducer } from "./User/Product/Reducer"
import { adminProductReducer } from "./Admin/Product/Reducer"
import { userAdminReducer } from "./Admin/User/Reducer"
import { adminOrderReducer } from "./Admin/Order/Reducer"
import { cartReducer } from "./User/Cart/Reducer"
import { reviewReducer } from "./User/Review/Reducer"
import { addressReducer } from "./User/Address/Reducer"
import { orderReducer } from "./User/Order/Reducer"
import { paymentReducer } from "./User/Payment/Reducer"
import { chatReducer } from "./User/Chat/Reducer"
import { messageReducer } from "./User/Message/Reducer"

const rootReducers = combineReducers({
    auth:authReducer,
    uproduct:userProductReducer,
    aproduct:adminProductReducer,
    auser:userAdminReducer,
    aorder:adminOrderReducer,
    cart:cartReducer,
    review:reviewReducer,
    address:addressReducer,
    uorder:orderReducer,
    payment:paymentReducer,
    chat:chatReducer,
    message:messageReducer,
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))