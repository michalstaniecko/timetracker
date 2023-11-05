import moment from 'moment';

export const useFormatTime = () => {
  const formatElapsedTime = (elapsedTime: number): string => {
    const duration = moment.duration(elapsedTime);
    const hours = duration.hours();
    const formatted = moment(elapsedTime).format('mm:ss');
    return `${hours}:${formatted}`;
  };

  return { formatElapsedTime };
};
