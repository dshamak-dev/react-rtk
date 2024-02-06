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
  const timeB = new Date(b).getTime();

  return timeA < timeB;
};

export const isDateAfter = (
  a: string | number,
  b: string | number
): boolean => {
  return !isDateBefore(a, b);
};

export const dateDifference = (
  start: string | number,
  end: string | number
) => {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();

  return endTime - startTime;
};

export const timeToDateText = (date: string | number) => {
  const time = new Date(date).getTime();

  let timeLeft = time;
  const days = Math.floor(time / msInDay);
  timeLeft -= days * msInDay;

  const hours = Math.floor(timeLeft / msInHour);
  timeLeft -= hours * msInHour;

  const minutes = Math.floor(timeLeft / msInMinute);
  timeLeft -= minutes * msInMinute;

  if (!days && !hours && !minutes) {
    return null;
  }

  const parts = [];
  if (days) {
    parts.push(`${days}d`);
  }
  if (hours) {
    parts.push(`${hours}h`);
  }
  if (!days && minutes) {
    parts.push(`${minutes}m`);
  }

  return parts.join(" ");
};

export const addTime = (
  start: string | number,
  { days = 0, hours = 0, minutes = 0 }
): string => {
  const startTime = new Date(start).getTime();
  let duration = days * msInDay + hours * msInHour + minutes * msInMinute;

  return new Date(startTime + duration).toISOString();
};
