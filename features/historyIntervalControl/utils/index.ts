import { historyIntervals } from "../constants";

export const getIndexByHistoryInterval = (historyInterval: number) =>
    historyIntervals.indexOf(historyInterval);


export const getHistoryIntervalByIndex = (index: number) =>
    index > 0 ? historyIntervals.at(index) ?? -1 : -1