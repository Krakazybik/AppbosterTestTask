import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import currencyReducer from "./currency-reducer";
import { CurrencyState } from "./currency-reducer.types";

export interface RootState {
  currencyState: CurrencyState;
}

const reducers = combineReducers({ currencyState: currencyReducer });

export const store = createStore(reducers, applyMiddleware(thunk));
