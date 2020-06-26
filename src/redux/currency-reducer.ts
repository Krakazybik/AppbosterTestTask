import { Dispatch } from "redux";
import {
  Currency,
  CurrencyActionType,
  CurrencyState,
  ToggleFavoriteAction,
  GET_LOCAL_FAVORITE_CURRENCY,
  ADD_FAVORITE,
  UPDATE_CURRENCY,
  TOGGLE_FAVORITE,
} from "./currency-reducer.types";
import { getCurrencyDaily } from "../API/currency";

export const initialState: CurrencyState = {
  currency: [],
  favoriteCurrency: [],
};

const updateFavoriteCurrencyLocalStorage = (
  newFavoriteCurrency: Array<string>
) => {
  localStorage.setItem("favoriteCurrency", JSON.stringify(newFavoriteCurrency));
};

const currencyReducer = (
  state = initialState,
  action: CurrencyActionType
): CurrencyState => {
  switch (action.type) {
    case GET_LOCAL_FAVORITE_CURRENCY: {
      const storageFavoriteCurrency = localStorage.getItem("favoriteCurrency");
      if (storageFavoriteCurrency) {
        const favoriteCurrency = JSON.parse(storageFavoriteCurrency);

        return {
          ...state,
          currency: state.currency?.map((el) => {
            if (favoriteCurrency.some((element: string) => element === el.id))
              el.isFavorite = true;
            return el;
          }),
          favoriteCurrency: [...favoriteCurrency],
        };
      }
      return state;
    }
    case UPDATE_CURRENCY: {
      return {
        ...state,
        currency: action.currency,
      };
    }
    case ADD_FAVORITE: {
      const newFavoriteCurrency = [
        ...state.favoriteCurrency,
        action.favoriteCurrency,
      ];

      updateFavoriteCurrencyLocalStorage(newFavoriteCurrency);

      return {
        ...state,
        currency: state.currency?.map((cur) => {
          if (cur.id === action.favoriteCurrency) cur.isFavorite = true;
          return cur;
        }),
        favoriteCurrency: newFavoriteCurrency,
      };
    }
    case TOGGLE_FAVORITE:
      return {
        ...state,
        currency: state.currency?.map((el) => {
          if (el.id === action.favoriteId) el.isFavorite = !el.isFavorite;
          return el;
        }),
        favoriteCurrency: state.favoriteCurrency.filter(
          (el) => el !== action.favoriteId
        ),
      };
    default:
      return state;
  }
};

const updateCurrencyActionCreator = (
  currencyData: Array<Currency>
): CurrencyActionType => {
  return {
    type: UPDATE_CURRENCY,
    currency: currencyData,
  };
};

export const getLocalFavorite = () => {
  return {
    type: GET_LOCAL_FAVORITE_CURRENCY,
  };
};

export const addFavorite = (favoriteCurrency: string): CurrencyActionType => {
  return {
    type: ADD_FAVORITE,
    favoriteCurrency,
  };
};

export const toggleFavorite = (favoriteId: string): ToggleFavoriteAction => {
  return {
    type: TOGGLE_FAVORITE,
    favoriteId,
  };
};

export const updateCurrency = () => (
  dispatch: Dispatch<CurrencyActionType>
) => {
  return getCurrencyDaily().then((response) => {
    dispatch(updateCurrencyActionCreator(response));
  });
};

export const initApp = () => async (dispatch: any) => {
  const promiseUpdateCurrency = await dispatch(updateCurrency());
  const promiseGetFavorite = await dispatch(getLocalFavorite());
};

export default currencyReducer;
