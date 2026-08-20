import { getDifferenceInHours } from "@/utils/dateUtils";

export const computeUpdateAtMessage = (updatedAt?: Date) => {
    if (!updatedAt) return "never";
    else {
        const dif = getDifferenceInHours(updatedAt, new Date()).toFixed(0);
        return `${dif} hours ago`;
    }
}