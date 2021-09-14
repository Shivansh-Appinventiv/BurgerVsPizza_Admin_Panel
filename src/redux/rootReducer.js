import { combineReducers } from "redux";
import login from "./loginSlice";
import products from "./productsSlice";
import orders from "./orderSlice";

const rootReducer = combineReducers({
  login,
  products,
  orders
});

export default rootReducer;
