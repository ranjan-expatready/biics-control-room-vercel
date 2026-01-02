/**
 * Date utility functions for cadence calculations
 * All functions are deterministic and work with ISO date strings
 */

export function parseDate(dateString: string): Date {
  return new Date(dateString);
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
}

export function addBusinessDays(date: Date, businessDays: number): Date {
  let result = new Date(date);
  let daysToAdd = businessDays;

  while (daysToAdd > 0) {
    result = addDays(result, 1);
    if (!isWeekend(result)) {
      daysToAdd--;
    }
  }

  while (daysToAdd < 0) {
    result = addDays(result, -1);
    if (!isWeekend(result)) {
      daysToAdd++;
    }
  }

  return result;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function daysBetween(date1: Date, date2: Date): number {
  const diffTime = date2.getTime() - date1.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

