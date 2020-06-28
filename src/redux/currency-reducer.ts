import { Dispatch } from "redux";
import {
  Currency,
  CurrencyActionType,
  CurrencyState,
  ToggleFavoriteAction,
  UpdateLocalFavoriteAction,
  GetLocalFavoriteAction,
  GET_LOCAL_FAVORITE_CURRENCY,
  ADD_FAVORITE,
  UPDATE_CURRENCY,
  TOGGLE_FAVORITE,
  UPDATE_LOCAL_FAVORITE_CURRENCY,
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
            if (favoriteCurrency.some((element: string) => element === el.id)) {
              return { ...el, isFavorite: true };
            }
            return el;
          }),
          favoriteCurrency: [...favoriteCurrency],
        };
      }
      return state;
    }
    case UPDATE_LOCAL_FAVORITE_CURRENCY: {
      updateFavoriteCurrencyLocalStorage(state.favoriteCurrency);
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

      return {
        ...state,
        currency: state.currency?.map((el) => {
          if (el.id === action.favoriteCurrency) {
            return { ...el, isFavorite: true };
          }
          return el;
        }),
        favoriteCurrency: newFavoriteCurrency,
      };
    }
    case TOGGLE_FAVORITE: {
      let tempFavoriteCurrency = [...state.favoriteCurrency];

      return {
        ...state,
        currency: state.currency?.map((el) => {
          if (el.id === action.favoriteId) {
            if (el.isFavorite) {
              tempFavoriteCurrency = state.favoriteCurrency.filter(
                (tempCurrency) => tempCurrency !== action.favoriteId
              );
            } else {
              tempFavoriteCurrency.push(action.favoriteId);
            }
            return { ...el, isFavorite: !el.isFavorite };
          }
          return el;
        }),
        favoriteCurrency: tempFavoriteCurrency,
      };
    }
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

export const getLocalFavorite = (): GetLocalFavoriteAction => {
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

export const updateLocalFavorite = (): UpdateLocalFavoriteAction => {
  return {
    type: UPDATE_LOCAL_FAVORITE_CURRENCY,
  };
};

export const initApp = () => async (dispatch: any) => {
  await dispatch(updateCurrency());
  await dispatch(getLocalFavorite());
};

export default currencyReducer;
