export const UPDATE_CURRENCY = "currency-reducer/UPDATE-CURRENCY";
export const ADD_FAVORITE = "currency-reducer/ADD-FAVORITE";
export const TOGGLE_FAVORITE = "currency-reducer/TOGGLE_FAVORITE";
export const GET_LOCAL_FAVORITE_CURRENCY =
  "currency-reducer/GET-LOCAL-FAVORITE-CURRENCY";

export interface Currency {
  id: string;
  charCode: string;
  name: string;
  value: number;
  prevValue: number;
  isFavorite: boolean;
}

export interface CurrencyState {
  currency: Array<Currency>;
  favoriteCurrency: Array<string>;
}

export interface GetCurrencyAction {
  type: typeof UPDATE_CURRENCY;
  currency: Array<Currency>;
}

export interface AddFavoriteAction {
  type: typeof ADD_FAVORITE;
  favoriteCurrency: string;
}

export interface ToggleFavoriteAction {
  type: typeof TOGGLE_FAVORITE;
  favoriteId: string;
}

export interface GetLocalFavoriteAction {
  type: typeof GET_LOCAL_FAVORITE_CURRENCY;
}

export type CurrencyActionType =
  | GetCurrencyAction
  | AddFavoriteAction
  | GetLocalFavoriteAction
  | ToggleFavoriteAction;
