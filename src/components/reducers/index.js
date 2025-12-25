import {combineReducers} from "redux"
import { reducerLogin } from "./reducerLogin";
import { reducerCart } from "./reducerCart";
export const allReducer = combineReducers({
    reducerLogin,
    reducerCart
});