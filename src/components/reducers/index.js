import {combineReducers} from "redux"
import { reducerLogin } from "./reducerLogin";
import { reducerCart } from "./reducerCart";
import { reducerOrder } from "./reducerOrder";
export const allReducer = combineReducers({
    reducerLogin,
    reducerCart,
    reducerOrder
});