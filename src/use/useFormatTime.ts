import moment from 'moment';

export const useFormatTime = () => {
  const formatElapsedTime = (elapsedTime: number): string => {
    const duration = moment.duration(elapsedTime);
    const hours = duration.hours();
    const formatted = moment(elapsedTime).format('mm:ss');
    return `${hours}:${formatted}`;
  };

  const formatDate = (timestamp: number): string => {
    return moment(timestamp).format('YYYY-MM-DD');
  };

  return { formatElapsedTime, formatDate };
};
