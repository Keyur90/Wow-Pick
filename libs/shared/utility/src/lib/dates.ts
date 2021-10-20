import { formatDuration, intervalToDuration } from 'date-fns';

export const textDuration = (time: number) => {
  return formatDuration(intervalToDuration({ start: 0, end: time * 1000 }), { format: ['hours', 'minutes'] });
};
