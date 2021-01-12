import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(localizedFormat);

import { DateType } from 'app/consts';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(relativeTime);

export const secondsToFormat = (seconds: number, format: string) => {
  const d = dayjs.duration({ seconds });
  return dayjs.utc(d.asMilliseconds()).format(format);
};

export const formatDate = (date: DateType | string, format = 'DD/MM/YY') => dayjs(date).format(format);

export const getTimeDiff = (startDate: DateType, endDate: DateType) => {
  const startDateDayjs = dayjs(startDate);
  const endDateDayjs = dayjs(endDate);

  const diff = endDateDayjs.diff(startDateDayjs);

  return diff;
};

export const getTimeDuration = (miliseconds: number) => {
  const days = dayjs.duration({ miliseconds }).asDays();

  const daysFull = Math.floor(days);

  const hours = dayjs.duration({ days: days - daysFull }).asHours();

  const hoursFull = Math.floor(hours);

  const minutes = dayjs.duration({ hours: hours - hoursFull }).asMinutes();
  const minutesFull = Math.floor(minutes);

  return { days: daysFull, hours: hoursFull, minutes: minutesFull };
};

export const getUtcDate = (date: DateType | string) => dayjs.utc(date);

export const getTimezoneOffset = () => {
  const offset = -new Date().getTimezoneOffset();
  return `GMT ${offset < 0 ? '-' : '+'}${dayjs.duration({ minutes: offset }).asHours()}`;
};
