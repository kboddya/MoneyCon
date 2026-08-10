export const generateStringDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-GB').format(date).split("/").reverse().join("-");
}

export const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export const getDifferenceInHours = (date1: Date, date2: Date): number => {
    const diffInMs = Math.abs(date2.getTime() - date1.getTime());
    return diffInMs / (1000 * 60 * 60);
}

export const parseTimestampToDate = (timestamp?: string | number): Date | undefined => {
    if (!timestamp) return undefined;
    if (typeof timestamp === "string") timestamp = Number.parseInt(timestamp);
    if (isNaN(timestamp)) return undefined;
    const date = new Date(timestamp);
    return date;
}