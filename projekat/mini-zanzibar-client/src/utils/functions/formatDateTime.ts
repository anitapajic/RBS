import { format, parseISO } from "date-fns";

export const formatDate = (dateArray: number[] | undefined): string => {
  if (!Array.isArray(dateArray) || dateArray.length !== 3) {
    throw new TypeError('Expected an array of [year, month, day]');
  }
  const [year, month, day] = dateArray;
  const date = new Date(year, month - 1, day); // Meseci su indeksirani od 0
  return format(date, 'dd.MM.yyyy.');
};

export function formatDateTime(dateTimeString: string) {
    const dateTime = parseISO(dateTimeString);
    return format(dateTime, " dd.MM.yyyy. HH:mm");
  }

export function formatTime(dateTimeString: string | undefined) {
  if (!dateTimeString) {
    return "N/A"; 
  }
  const dateTime = parseISO(dateTimeString);
  return format(dateTime, " HH:mm");
}