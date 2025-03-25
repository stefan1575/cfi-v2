import { Decimal } from "@prisma/client/runtime/library";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Workaround for "Warning: Only plain objects can be passed to Client Components from Server Components"
 *
 * Pass this to Decimal data types
 */
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function formatDate(date: Date | null) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  }).format(date);
}

export function numberWithCommas(n: number | Decimal) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Checks if the given year, month, and day form a valid date.
 *
 * @param year - The year (full 4-digit year)
 * @param month - The month (1-12)
 * @param day - The day of the month
 * @returns true if the date is valid, false otherwise
 */
function isValidDate(year: number, month: number, day: number): boolean {
  // Check if the month is valid (1-12)
  if (month < 1 || month > 12) return false;

  // Get the last day of the given month
  const lastDayOfMonth = new Date(year, month, 0).getDate();

  // Check if the day is valid for the given month and year
  if (day < 1 || day > lastDayOfMonth) return false;

  return true;
}

/**
 * Checks whether the given string matches the M/D/YYYY format.
 * Meant to be used in the `gt` property of a date.
 *
 * @returns the given str converted to a date or undefined
 */
export const filterStartDate = (str: string) => {
  // Regular expression to match both "MM/DD/YYYY" and "M/D/YYYY" formats
  const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const match = str.match(dateRegex);
  if (!match) return undefined;

  const [, month, day, year] = match.map((v) => Number(v));
  if (!isValidDate(year, month, day)) return undefined;

  const date = new Date(year, month - 1, day - 1);
  return date;
};

/**
 * Checks whether the given string matches the M/D/YYYY format.
 * Meant to be used in the `lt` property of a date.
 *
 * @returns the given str converted to a date or undefined
 */
export const filterEndDate = (str: string) => {
  // Regular expression to match both "MM/DD/YYYY" and "M/D/YYYY" formats
  const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const match = str.match(dateRegex);
  if (!match) return undefined;

  const [, month, day, year] = match.map((v) => Number(v));
  if (!isValidDate(year, month, day)) return undefined;

  const date = new Date(year, month - 1, day - 1);
  return date;
};
