import { DateTime } from "luxon";

export default function getFormattedDateTime(isoDateTime: string): string {
  return DateTime.fromISO(isoDateTime)
    .setLocale("en-US")
    .toLocaleString(DateTime.DATE_MED);
}
