import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

dayjs.extend(duration);
dayjs.extend(utc);

export const secondsToFormat = (seconds: number, format: string) => {
  const d = dayjs.duration({ seconds });
  return dayjs.utc(d.asMilliseconds()).format(format);
};
