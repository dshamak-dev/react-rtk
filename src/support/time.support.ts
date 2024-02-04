export const msInSec = 1000;
export const msInMinute = 60 * msInSec;
export const msInHour = 60 * msInMinute;
export const msInDay = 24 * msInHour;

export const parseDaysToMS = (days: number): number => {
  return (days || 0) * msInDay;
};
export const parseHoursToMS = (hours: number): number => {
  return (hours || 0) * msInHour;
};
export const parseMinutesToMS = (minutes: number): number => {
  return (minutes || 0) * msInMinute;
};

export const dateToMS = ({ hours = 0, minutes = 0, days = 0 }): number => {
  return (
    parseDaysToMS(days) + parseHoursToMS(hours) + parseMinutesToMS(minutes)
  );
};

export const isDateBefore = (
  a: string | number,
  b: string | number
): boolean => {
  if (!a) {
    return false;
  }
  if (!b) {
    return true;
  }

  const timeA = new Date(a).getTime();
  const timeB = new Date(a).getTime();

  return timeA < timeB;
};

export const isDateAfter = (
  a: string | number,
  b: string | number
): boolean => {
  return !isDateBefore(a, b);
};
