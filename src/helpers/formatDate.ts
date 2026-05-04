import { differenceInDays, formatDistanceToNowStrict, format, isThisYear } from "date-fns";

export function formatDate(date: Date) {
    const daysAgo = differenceInDays(new Date(), date);

    if (daysAgo <= 7) {
        return formatDistanceToNowStrict(date, { addSuffix: true });
    }

    if (isThisYear(date)) {
        return format(date, "MMM dd");
    }

    return format(date, "MMM dd, yyyy");
}