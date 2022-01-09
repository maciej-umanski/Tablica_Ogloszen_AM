import {
    format
} from "date-fns";

export const getDateString = (date, formatPattern = "dd.MM.yyyy HH:mm") => {
    if (!!!date) return "";
    return format(new Date(date), formatPattern);
}