import axios from "axios";
import { Currency } from "../redux/currency-reducer.types";

const API_URL = "https://www.cbr-xml-daily.ru/";

const axiosInstance = axios.create({ baseURL: API_URL });

interface APICurrencyDaily {
  ID: string;
  CharCode: string;
  Name: string;
  Value: string;
  Previous: string;
}

export const getCurrencyDaily = async () => {
  const response = await axiosInstance.get("daily_json.js");
  const currency: Array<Currency> = new Array<Currency>();

  if (response) {
    Object.entries(response.data.Valute as APICurrencyDaily).map((value) => {
      currency.push({
        id: value[1].ID,
        charCode: value[1].CharCode,
        name: value[1].Name,
        value: value[1].Value,
        prevValue: value[1].Previous,
        isFavorite: false,
      });
      return null;
    });
    currency.sort((a: Currency, b: Currency) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  }

  return currency;
};
