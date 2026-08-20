import { createApiError, API_ERROR_CODES, ApiError } from "./apiErrors";
import { addDays, generateStringDate } from "@/utils/dateUtils";

const mainSource = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@";
const endOfReserveSource = ".currency-api.pages.dev/v1/";

type ExchangeRatesResponse = {
  eur: {
    [key: string]: number;
  };
  date: string;
};

type CurrencyListResponse = {
  [key: string]: string;
};

const ongoingRequest: Map<string, Promise<any>> = new Map<
  string,
  Promise<any>
>();
const apiClient = <T>(date: string, endpoint: string): Promise<T> => {
  const key = `${date}|${endpoint}`;
  if (ongoingRequest.has(key)) {
    return ongoingRequest.get(key)!;
  }

  const urls = [
    mainSource + date + "/v1/" + endpoint + ".min.json",
    "https://" + date + endOfReserveSource + endpoint + ".min.json",
    mainSource + date + "/v1/" + endpoint + ".json",
    "https://" + date + endOfReserveSource + endpoint + ".json",
  ];

  const request = (async () => {
    try {
      let response: Response = {} as Response;
      for (const url of urls) {
        response = await fetch(url);
        if (response.ok) {
          return await response.json();
        }
      }
      throw createApiError(API_ERROR_CODES.NOT_FOUND);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      else throw createApiError(API_ERROR_CODES.NETWORK_ERROR);
    }
  })().finally(() => ongoingRequest.delete(key));

  ongoingRequest.set(key, request);
  return request as Promise<T>;
};

const getExchangeRatesFromApi = (diapason: number = 0): Promise<ExchangeRatesResponse> => {
  const stringDate = !!diapason ? "latest" : generateStringDate(addDays(new Date(), -diapason));
  return apiClient<ExchangeRatesResponse>(stringDate, "currencies/eur");
}

const getCurrencyList = (): Promise<CurrencyListResponse> => {
  return apiClient<CurrencyListResponse>("latest", "currencies");
};

export {
  getExchangeRatesFromApi,
  getCurrencyList,
};
export type { ExchangeRatesResponse, CurrencyListResponse };
