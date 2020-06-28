import currencyReducer, {
  addFavorite,
  toggleFavorite,
} from "./currency-reducer";
import { CurrencyState } from "./currency-reducer.types";

test("addFavorite(id) should be in favoriteCurrency", () => {
  const FAVORITE_CURRENCY_ID = "ID0007";
  const action = addFavorite(FAVORITE_CURRENCY_ID);

  const initialState: CurrencyState = {
    currency: [],
    favoriteCurrency: [],
  };
  const state = currencyReducer(initialState, action);
  expect<boolean>(
    state.favoriteCurrency.some((el) => el === FAVORITE_CURRENCY_ID)
  ).toBe(true);
});

test("toggleFavorite should change isFavorite to !isFavorite", () => {
  const FAVORITE_CURRENCY_ID = "ID0007";
  const action = toggleFavorite(FAVORITE_CURRENCY_ID);

  const initialState: CurrencyState = {
    currency: [
      {
        id: FAVORITE_CURRENCY_ID,
        charCode: "RUB",
        name: "Rubles",
        value: 98.5,
        prevValue: 99.5,
        isFavorite: true,
      },
    ],
    favoriteCurrency: [],
  };

  const state = currencyReducer(initialState, action);
  expect(state.currency[0].isFavorite).toBe(false);
});

test("toggleFavorite should be removed from favoriteCurrency if isFavorite == true", () => {
  const FAVORITE_CURRENCY_ID = "ID0007";
  const action = toggleFavorite(FAVORITE_CURRENCY_ID);

  const initialState: CurrencyState = {
    currency: [
      {
        id: FAVORITE_CURRENCY_ID,
        charCode: "RUB",
        name: "Rubles",
        value: 98.5,
        prevValue: 99.5,
        isFavorite: true,
      },
    ],
    favoriteCurrency: [FAVORITE_CURRENCY_ID],
  };

  const state = currencyReducer(initialState, action);
  expect(state.favoriteCurrency.length).toBe(0);
});

test("toggleFavorite should be added to favoriteCurrency if isFavorite == false", () => {
  const FAVORITE_CURRENCY_ID = "ID0007";
  const action = toggleFavorite(FAVORITE_CURRENCY_ID);

  const initialState: CurrencyState = {
    currency: [
      {
        id: FAVORITE_CURRENCY_ID,
        charCode: "RUB",
        name: "Rubles",
        value: 98.5,
        prevValue: 99.5,
        isFavorite: false,
      },
    ],
    favoriteCurrency: [],
  };

  const state = currencyReducer(initialState, action);
  expect(state.favoriteCurrency[0]).toBe(FAVORITE_CURRENCY_ID);
});
